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
    useToast,
    Tooltip,
    FormLabel,
    InputGroup,
    FormControl,
    InputRightElement,
    useMediaQuery,
    Flex,
    Container,
    RadioGroup,
    Radio,
    Stack
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
    CacheData,
    ConsultParamsProps,
    RecordsProps
} from './interface';
import {
    Title,
    ContainerList,
    ContainerHome,
    ContainerStack,
    ContainerTextCount,
    ContainerListAndParams,
    ContainerSearchButtons
} from './styles';
import { List } from '../../components/List';
import EmptyList from '../../components/EmptyList';
import Loading from '../../components/Loading';
import ParamsList from '../../components/ParamsList';
import ModalParamsMovie from '../../components/ModalParamsMovie';

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

    const toast = useToast();
    const queryClient = useQueryClient();
    const cacheDataGet: CacheData | undefined = queryClient.getQueryData('consult');
    const [isMobile] = useMediaQuery('(max-width: 1000px)');
    
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
            return <EmptyList   
                isMobile={isMobile} 
            />
        } else if(isLoading) {
            return <Loading />
        } else if(data && data.total > 0) {            
            return <List 
                isMobile={isMobile}
                recordsList={data.records}
                type={typeSearch}
                navigate={navigate}
            />
        }

        return <></>

    }      

    if(error) {

        console.error(error);
        const { response } = error as { response: { data: string } };
        
        if(response && response.data) {

            const dataError = response.data;
            toast({
                title: 'Error',
                description: dataError,
                status: 'error',
                duration: 9000,
                isClosable: true,
                position: 'top-right'
            })
            

        }

        return <></>;

    }
    
    return (<>
        <ContainerHome>            
            <ContainerStack isMobile={isMobile}>       
                <Title 
                    ml={isMobile ? '0px' : '-60px'} 
                    noOfLines={2}
                    overflow={'unset !important'}
                    minH={isMobile ? '40px' : '60px'}
                >
                    Studio Ghibli Finder
                </Title>   
                <ContainerListAndParams isMobile={isMobile}>
                    <ParamsList
                        isMobile={isMobile}
                        typeList={typeSearch}
                        consultParams={consultParams}
                        setOpenModal={setOpenModal}
                        setConsultParams={setConsultParams}
                    />
                    <ContainerSearchButtons isMobile={isMobile}>
                        <FormControl 
                            fontFamily={"sans-serif"} 
                            w={'100%'}
                            p={isMobile ? 5 : 0}
                            pb={0}
                            justifyContent={'center'}
                            alignItems={'center'}
                        >
                            <Flex
                                align={"center"}
                                justify={"center"}
                                w={"100%"}
                                whiteSpace={isMobile ? 'break-spaces' : 'nowrap'}
                            >
                                <Stack
                                    w={'100%'}
                                    align={'center'}
                                    pos={'relative'}
                                    direction={isMobile ? 'column' : 'row'}
                                    m={'auto'}
                                    justifyContent={'space-between'}
                                    p={'0px 5px'}          
                                    mb={2}                      
                                >                            
                                    <FormLabel 
                                        fontWeight={'bold'} 
                                        flex={1} 
                                        display={'inline'}
                                        mb={0}
                                        noOfLines={2}
                                        textDecoration={'underline'}
                                        textShadow={'1px 0px black'}
                                        fontSize={['md','lg']}
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
                                </Stack>
                            </Flex>
                            <InputGroup>
                                <Input
                                    variant='flushed'
                                    textOverflow={'ellipsis'}         
                                    overflow={'hidden'}                       
                                    htmlSize={5}
                                    color={"black"}
                                    px={2}
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
                                                opacity: isMobile ? 1 : 0.5
                                            }}
                                            _active={{
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
                            minH={'240px'}
                            m={'auto'}   
                            mt={0}    
                            pb={1}
                            overflow={'hidden'}
                        >                        
                            <Container
                                centerContent
                                maxWidth={'100%'}
                                w={'100%'}                            
                                h={'100%'}
                                justifyContent={data?.total! > 0 ? "flex-start" : "center"}
                                flexDirection={"column"}
                                bg={"transparent"}
                                pl={isMobile ? 5 : 0}
                                pr={2}
                                mr={isMobile ? 2 : 0}
                                mt={2}                                        
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
                                <ContainerList isMobile={isMobile}>
                                    {verifyComponentToRender()}
                                </ContainerList>
                            </Container>
                        </Center>
                    </ContainerSearchButtons>                    
                </ContainerListAndParams>
                <ContainerTextCount isMobile={isMobile}>
                    <CountUp 
                        end={data?.total || 0}
                        duration={0.5}
                        style={{
                            marginLeft: isMobile ? '0px' : '-90px'
                        }}
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