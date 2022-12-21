import {
    useState,
    useEffect,
    ReactNode,
    useRef
} from 'react';
import {
    HStack,
    Box,
    Text,
    Input,
    Center,
    VStack,
    Tooltip,
    FormLabel,
    Icon,
    InputGroup,
    FormControl,
    InputRightElement,
    Flex,
    Container,
    Image,
    Spinner,
    RadioGroup,
    Radio
} from "@chakra-ui/react";
import { Search2Icon, CloseIcon } from '@chakra-ui/icons';
import CountUp from 'react-countup';
import axios from 'axios';


import { 
    MoviesProps, 
    PeopleProps 
} from '../../interfaces';
import { List } from '../../components/List';
import ImageBackground from '../../assets/images/image-background.jpg';
import EmptyList from '../../components/EmptyList';
import Loading from '../../components/Loading';

interface RecordsProps {
    records: PeopleProps[] | MoviesProps[];
    total: number;
}

export default function Home() {

    const [data, setData] = useState<RecordsProps>({
        records: [],
        total: 0
    });
    const [loading, setLoading] = useState(false);
    const [typeSearch, setTypeSearch] = useState('people');
    const [name, setName] = useState<string | null>(null);

    async function consultPerson() {

        // if loading stop execution
        if(loading) return;

        // set state of loading
        setLoading(true);

        try {

            const { data } = await axios.get(`/${typeSearch}`, {
                params: { name }
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

    useEffect(() => {
        if(!name) setData({ records: [], total: 0 });
    }, [name]);

    return (

        <Center
            bgImage={ImageBackground}
            backgroundSize={"cover"}
            h={"100vh"}
            w={"100vw"}
            pos={"relative"}
        >            
            <VStack
                w={"100%"}
                h={"100%"}
                flex={1}
                align={"center"}
                justify={"center"}
                backdropFilter={"blur(5px)"}                
            >        
                <Text
                    fontSize='6xl'
                    as='b'
                    color={'white'}
                    fontFamily={"cursive"}
                    w='auto'
                    textShadow={"5px 2px black"}
                >
                    Studio Ghibli Finder
                </Text>   
                <VStack
                    h={'700px'}
                    w={'55%'}
                    border={"1px solid black"}
                    borderRadius={"50px"}
                    p={10}
                    pos={"relative"}
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
                                <FormLabel fontWeight={'bold'} flex={1} mb={0}>
                                    Search any character or movie from Studio Ghibli
                                </FormLabel>
                                <RadioGroup 
                                    onChange={setTypeSearch} 
                                    value={typeSearch}
                                    name={'radio-group'}
                                >
                                    <HStack>
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
                                htmlSize={5}
                                color={"black"}
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
                                        consultPerson();
                                    }
                                }}
                                _placeholder={{
                                    color: 'rgba(0, 0, 0, 0.5)'
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
                                        _hover={{
                                            opacity: 0.5
                                        }}
                                        onClick={consultPerson}
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
                    >
                        <Container
                            centerContent
                            maxW={'container.xl'}                            
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
                            <VStack
                                w={"100%"}
                                display={"flex"}                                                        
                                alignItems={"center"}
                                justifyContent={"flex-start"}  
                                maxH={"100%"}    
                                spacing={4}
                                paddingRight={2}                      
                            >
                                {
                                    (data.total === 0 && !loading) ? <EmptyList />
                                    : (loading) ? <Loading />
                                    : (data.total > 0) ? <List 
                                        recordsList={data.records}
                                        type={typeSearch}
                                    /> : <></>
                                }
                            </VStack>
                        </Container>
                    </Center>
                </VStack>
                <Text 
                    fontSize={'4xl'}
                    as='b'
                    color={'white'}
                    fontFamily={"cursive"}
                    w='auto'
                    textShadow={"2px 1px black"}
                >
                    <CountUp 
                        end={data.total}
                        duration={0.5}
                    />
                </Text>
            </VStack>
        </Center>

    );

} 