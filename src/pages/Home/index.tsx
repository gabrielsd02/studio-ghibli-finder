import {
    useState,
    useEffect
} from 'react';
import {
    useNavigate
} from 'react-router-dom';
import {
    FaMale,
    FaFemale,
    FaSortAlphaDown,
    FaSortAlphaUpAlt
} from 'react-icons/fa'
import {
    HStack,
    Input,
    Center,
    Checkbox,
    VStack,
    Tooltip,
    FormLabel,
    InputGroup,
    FormControl,
    InputRightElement,
    Flex,
    Container,
    RadioGroup,
    Radio,
    Icon
} from "@chakra-ui/react";
import { 
    Search2Icon, 
    CloseIcon 
} from '@chakra-ui/icons';
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

interface RecordsProps {
    records: PeopleProps[] | MoviesProps[];
    total: number;
}

export default function Home() {

    const navigate = useNavigate();

    const [data, setData] = useState<RecordsProps>({
        records: [],
        total: 0
    });
    const [consultParams, setConsultParams] = useState({
        order: 'alphabetically',
        firstToLast: true,
        masculineCheck: true,
        femaleCheck: true
    } as any);
    const [loading, setLoading] = useState(false);
    const [typeSearch, setTypeSearch] = useState('people');
    const [name, setName] = useState<string | null>(null);

    async function consult() {

        // if loading => stop execution
        if(loading) return;

        // set state of loading
        setLoading(true);

        // make verifications to send a gender param
        const mountGenderParam = () => {

            if(consultParams.masculineCheck && consultParams.femaleCheck) return '';
            if(!consultParams.masculineCheck && consultParams.femaleCheck) return 'F';
            if(consultParams.masculineCheck && !consultParams.femaleCheck) return 'M';
            return '?';

        };

        try {            

            // make a requisition
            const { data } = await axios.get(`/${typeSearch}`, {
                params: { 
                    name,
                    gender: mountGenderParam(),
                    ...consultParams
                }
            });

            setData(data);            

        } catch(e: any) {
            console.error(e);

            if(axios.isAxiosError(e) && e.response && e.response.data) {

                const error = e.response.data;

                

            }

        } finally {
            setLoading(false);
        }

    }
 
    function verifyComponentToRender() {
        
        if(data.total === 0 && !loading) {
            return <EmptyList />
        } else if(loading) {
            return <Loading />
        } else if(data.total > 0) {            
            return <List 
                recordsList={data.records}
                type={typeSearch}
                navigate={navigate}
            />
        }

        return <></>

    }

    useEffect(() => {
        if(data.total > 0) consult();
    }, [consultParams]);

    useEffect(() => {
        if(!name) setData({ records: [], total: 0 });
    }, [name]);

    return (

        <ContainerHome>            
            <ContainerStack>        
                <Title>
                    Studio Ghibli Finder
                </Title>   
                <HStack
                    h={'700px'}
                    w={'60%'}
                    align={'center'}
                    justify={'center'}
                    spacing={'-5px'}
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
                                            setData({
                                                records: [],
                                                total: 0
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

                                        setName(e.target.value);

                                    }}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            consult();
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
                                                opacity: 0.5
                                            }}
                                            onClick={consult}
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
                                justifyContent={data.total > 0 ? "flex-start" : "center"}
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
                    {(data.total > 0) && <VStack
                        alignItems={'center'}
                        justify={'flex-start'}
                        height={'85%'}
                        width={'100px'}
                        spacing={5}
                        p={2}
                    >
                        <Flex
                            background={'rgba(0, 0, 0, 0.5)'}
                            borderRadius={50}
                            ml={2}
                            p={3}
                            cursor={'pointer'}
                            _hover={{
                                opacity: 0.7
                            }}
                            onClick={() => setConsultParams({ ...consultParams, firstToLast: !consultParams.firstToLast })}
                        >                        
                            <Icon
                                as={consultParams.firstToLast ? FaSortAlphaDown : FaSortAlphaUpAlt}
                                fontSize={'30px'}
                                color={'gray.200'}
                            />
                        </Flex>
                        <VStack                      
                            align={'center'}
                            justify={'center'}
                            spacing={5}
                            ml={'0.7rem !important'}
                        >
                            <VStack
                                align={'center'}
                                justify={'center'}
                            >
                                <Icon
                                    as={FaMale}
                                    fontSize={'35px'}
                                    color={'black'}
                                />
                                <Checkbox 
                                    borderColor={'rgba(0, 0, 0, 0.7)'}
                                    background={'rgba(0, 0, 0, 0.7)'}
                                    colorScheme={'rgba(0, 0, 0, 0.7)'}
                                    iconColor={'white'}
                                    size={'lg'}
                                    isChecked={consultParams.masculineCheck}
                                    onChange={() => setConsultParams({
                                        ...consultParams, 
                                        masculineCheck: !consultParams.masculineCheck
                                    })}
                                    _hover={{
                                        boxShadow: '0px 0px 5px white'
                                    }}
                                    _active={{
                                        opacity: 0.7
                                    }}
                                />
                            </VStack>
                            <VStack
                                align={'center'}
                                justify={'center'}
                            >
                                <Icon
                                    as={FaFemale}
                                    fontSize={'35px'}
                                    color={'black'}
                                />
                                <Checkbox                                     
                                    borderColor={'rgba(0, 0, 0, 0.7)'}
                                    background={'rgba(0, 0, 0, 0.7)'}
                                    colorScheme={'rgba(0, 0, 0, 0.7)'}
                                    iconColor={'white'}
                                    size={'lg'}
                                    isChecked={consultParams.femaleCheck}
                                    onChange={() => setConsultParams({
                                        ...consultParams, 
                                        femaleCheck: !consultParams.femaleCheck
                                    })}
                                    _hover={{
                                        boxShadow: '0px 0px 5px white'
                                    }}
                                    _active={{
                                        opacity: 0.7
                                    }}
                                />
                            </VStack>
                        </VStack>
                    </VStack>}
                </HStack>
                <ContainerTextCount>
                    <CountUp 
                        end={data.total}
                        duration={0.5}
                    />
                </ContainerTextCount>
            </ContainerStack>
        </ContainerHome>

    );

} 