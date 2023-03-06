import {
    useState,
    useEffect
} from 'react';
import {
    useNavigate
} from 'react-router-dom';
import {
    HStack,
    Input,
    Center,
    VStack,
    Tooltip,
    FormLabel,
    InputGroup,
    FormControl,
    InputRightElement,
    Flex,
    Container,
    RadioGroup,
    Radio
} from "@chakra-ui/react";
import { 
    Search2Icon, 
    CloseIcon 
} from '@chakra-ui/icons';
import { 
    useQuery, 
    useQueryClient 
} from 'react-query';
import CountUp from 'react-countup';
import axios from 'axios';

import { 
    MoviesProps, 
    PeopleProps 
} from '../../interfaces';
import {
    Title,
    ContainerList,
    ContainerHome,
    ContainerStack,
    ContainerTextCount
} from './styles';
import { List } from '../../components/List';
import EmptyList from '../../components/EmptyList';
import Loading from '../../components/Loading';
import ParamsList from '../../components/ParamsList';
import ModalParamsMovie from '../../components/ModalParamsMovie';

interface RecordsProps {
    records: PeopleProps[] | MoviesProps[];
    total: number;
}

interface CacheData extends RecordsProps {
    alreadyExecuted?: boolean;
    consultParams?: ConsultParamsProps;
    typeSearch?: string;
    name?: string | null;
}

export interface ConsultParamsProps {
    order: string;
    firstToLast: boolean;
    masculineCheck: boolean;
    femaleCheck: boolean;
    yearMovieRelease: string | null;
    fromYearMovieRelease: boolean;
    durationMovie: string | null;
    fromDurationMovie: boolean;
    scoreMovie: string | null;
    fromScoreMovie: boolean;
}

export default function Home() {

    const navigate = useNavigate();

    const paramsStandard = {
        order: 'alphabetically',
        firstToLast: true,
        masculineCheck: true,
        femaleCheck: true,
        durationMovie: null,
        scoreMovie: null,
        yearMovieRelease: null,
        fromDurationMovie: false,
        fromScoreMovie: false,
        fromYearMovieRelease: false
    };

    const queryClient = useQueryClient();
    const cacheDataGet: CacheData | undefined = queryClient.getQueryData('consult');
    
    const [consultParams, setConsultParams] = useState(
        (cacheDataGet && cacheDataGet.consultParams) ? 
        cacheDataGet.consultParams : 
        paramsStandard as ConsultParamsProps
    );
    const [typeSearch, setTypeSearch] = useState(
        (cacheDataGet && cacheDataGet.typeSearch) ?
        cacheDataGet.typeSearch : 
        'people'
    );
    const [name, setName] = useState<string | null>(
        (cacheDataGet && cacheDataGet.name) ?
        cacheDataGet.name : 
        null
    );
    const [openModal, setOpenModal] = useState(false);
    const [shouldFetchData, setShouldFetchData] = useState(false);

    // make verifications to send a gender param
    const mountGenderParam = () => {

        if(consultParams.masculineCheck && consultParams.femaleCheck) return '';
        if(!consultParams.masculineCheck && consultParams.femaleCheck) return 'F';
        if(consultParams.masculineCheck && !consultParams.femaleCheck) return 'M';
        return '?';

    };

    async function consult() {
        
        const { data } = await axios.get(`/${typeSearch}`, {
            params: { 
                name,
                gender: mountGenderParam(),
                ...consultParams
            }
        });

        return {
            ...data,
            consultParams,
            typeSearch,
            name
        };

    }

    const handleConsult = () => {

        const cacheData: CacheData | undefined = queryClient.getQueryData('consult');
        
        if(cacheData) {

            if(typeof cacheData.alreadyExecuted !== 'undefined' && cacheData.alreadyExecuted === false) {
                return setShouldFetchData(true);
            } 
            
            return refetch();

        } else {

            setShouldFetchData(true);

        }        
    }

    const { 
        isLoading, 
        error, 
        data,
        refetch
    } = useQuery<CacheData>('consult', consult, {
        enabled: shouldFetchData,
        initialData: {
            records: [],
            total: 0,
            alreadyExecuted: false
        }
    });
    
    useEffect(() => {
        if(!name) queryClient.setQueryData('consult', () => {
            return {
                records: [],
                total: 0
            }
        });
    }, [name]);
    
    useEffect(() => {
        if(data && data.total > 0) handleConsult();
    }, [consultParams]);        
 
    function verifyComponentToRender() {        
        if(data && data.total === 0 && !isLoading) {
            return <EmptyList />
        } else if(isLoading) {
            return <Loading />
        } else if(data && data.total > 0) {            
            return <List 
                recordsList={data.records}
                type={typeSearch}
                navigate={navigate}
            />
        }

        return <></>

    }      

    if(error) {

        console.error(error);

        if(axios.isAxiosError(error) && error.response && error.response.data) {

            const dataError = error.response.data;

            

        }

        return <></>;

    }
    
    return (<>
    
        <ContainerHome>            
            <ContainerStack>        
                <Title>
                    Studio Ghibli Finder
                </Title>   
                <HStack
                    h={'700px'}
                    w={'65%'}
                    align={'center'}
                    justify={'center'}
                >
                    <VStack
                        h={'100%'}
                        flex={1}
                        background={'#1ca0d15e'}
                        borderRadius={"50px"}
                        boxShadow={'0px 0px 10px black'}
                        p={10}
                        pos={"relative"}
                        overflow={'hidden'}
                    >
                        <FormControl 
                            fontFamily={"sans-serif"} 
                            w={'100%'}
                            justifyContent={'center'}
                            alignItems={'center'}
                        >
                            <Flex
                                align={"center"}
                                justify={"center"}
                                w={"100%"}
                                whiteSpace={'nowrap'}
                            >
                                <HStack
                                    w={'100%'}
                                    align={'center'}
                                    pos={'relative'}
                                    m={'auto'}
                                    justifyContent={'space-between'}
                                    p={'0px 5px'}          
                                    mb={2}                      
                                >                            
                                    <FormLabel 
                                        fontWeight={'bold'} 
                                        flex={1} 
                                        mb={0}
                                        textDecoration={'underline'}
                                        textShadow={'1px 0px black'}
                                        fontSize={'lg'}
                                    >
                                        {`Search any ${typeSearch === 'people' ? 'character' : 'movie'} from Studio Ghibli`}
                                    </FormLabel>
                                    <RadioGroup 
                                        onChange={(nextValue) => {
                                            queryClient.setQueryData('consult', () => {
                                                return {
                                                    records: [],
                                                    total: 0
                                                }
                                            });
                                            setName(null);
                                            setTypeSearch(nextValue);
                                        }} 
                                        value={typeSearch}
                                        name={'radio-group'}
                                    >
                                        <HStack fontWeight={600}>
                                            <Radio 
                                                colorScheme='white' 
                                                value='people'
                                                boxShadow={typeSearch === 'people' ? '0px 0px 22px 1px' : '0px'}
                                            >
                                                Characters
                                            </Radio>
                                            <Radio 
                                                colorScheme='white' 
                                                value='films'
                                                boxShadow={typeSearch === 'films' ? '0px 0px 22px 1px' : '0px'}
                                            >
                                                Movies
                                            </Radio>
                                        </HStack>
                                    </RadioGroup>
                                </HStack>
                            </Flex>
                            <InputGroup>
                                <Input
                                    variant='flushed'
                                    textOverflow={'ellipsis'}         
                                    overflow={'hidden'}                       
                                    htmlSize={5}
                                    color={"black"}
                                    pl={2}
                                    borderColor={"black"}
                                    focusBorderColor={"black"}
                                    placeholder={"Press Enter to search ;)"}                                
                                    value={name || ''}                         
                                    autoComplete={"off"}       
                                    onChange={(e) => {
                                        
                                        let nameUpdate: null | string = e.target.value;

                                        if(nameUpdate === "") {
                                            nameUpdate = null;
                                        }

                                        setName(nameUpdate);

                                    }}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            handleConsult();
                                        }
                                    }}
                                    _placeholder={{
                                        color: 'rgba(0, 0, 0, 0.6)'
                                    }}
                                />
                                <InputRightElement>
                                    <Tooltip
                                        label={"Click to search"}
                                        fontSize={"md"}
                                        hasArrow
                                        placement='top'
                                        maxW={"700px"}
                                    >
                                        <Search2Icon
                                            color={"black"}
                                            cursor={"pointer"}
                                            mr={2}
                                            ml={5}
                                            _hover={{
                                                opacity: 0.3
                                            }}
                                            onClick={() => handleConsult()}
                                        />
                                    </Tooltip>
                                    {(name && name.length > 0) && <Tooltip
                                        label={"Click to erase the search"}
                                        fontSize={"md"}
                                        hasArrow
                                        placement='top'
                                        maxW={"700px"}
                                    >
                                        <CloseIcon
                                            color={"black"}
                                            cursor={"pointer"}
                                            ml={2}
                                            mr={2}
                                            _hover={{
                                                opacity: 0.5
                                            }}
                                            onClick={() => setName(null)}
                                        />
                                    </Tooltip>}
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>
                        <Center
                            flexGrow={1}
                            w={"100%"}
                            borderRadius={5}       
                            maxH={"90%"}      
                            m={'auto'}                                   
                        >                        
                            <Container
                                centerContent
                                maxWidth={'100%'}
                                w={'100%'}                            
                                h={'100%'}
                                justifyContent={data?.total! > 0 ? "flex-start" : "center"}
                                flexDirection={"column"}
                                bg={"transparent"}
                                p={0}
                                mt={5}                                        
                                overflowX={"hidden"}
                                overflowY={"auto"}                                  
                                css={{
                                    '&::-webkit-scrollbar': {
                                        width: '10px',
                                        height: '10px',
                                        backgroundColor: "rgba(0, 0, 0, 0.2)",
                                        borderRadius: "5px"
                                    },
                                    '&::-webkit-scrollbar-thumb': {
                                        height: '70px',
                                        background: "black",
                                        borderRadius: '10px',
                                    }
                                }}           
                            >
                                <ContainerList w={'100%'} pr={2} mr={2}>
                                    {verifyComponentToRender()}
                                </ContainerList>
                            </Container>
                        </Center>
                    </VStack>
                    <ParamsList
                        typeList={typeSearch}
                        consultParams={consultParams}
                        setOpenModal={setOpenModal}
                        setConsultParams={setConsultParams}
                    />
                </HStack>
                <ContainerTextCount>
                    <CountUp 
                        end={data?.total || 0}
                        duration={0.5}
                    />
                </ContainerTextCount>
            </ContainerStack>
        </ContainerHome>

        {openModal && <ModalParamsMovie 
            setOpenModal={setOpenModal}
            consultParams={consultParams}
            setConsultParams={setConsultParams}
            consultMovies={handleConsult}
        />}

    </>);

} 