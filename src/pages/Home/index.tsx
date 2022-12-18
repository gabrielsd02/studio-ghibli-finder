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
import { Search2Icon } from '@chakra-ui/icons';
import axios from 'axios';

import ImageListVoid from '../../assets/images/character-spirited-away.png';
import ImageBackground from '../../assets/images/image-background.jpg';
import { List } from '../../components/List';
import { MoviesProps, PeopleProps } from '../../interfaces';

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
    const [name, setName] = useState('');

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
                                value={name}                                
                                onChange={(e) => setName(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        consultPerson();
                                    }
                                }}
                                _placeholder={{
                                    color: 'rgba(0, 0, 0, 0.3)'
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
                            </InputRightElement>
                        </InputGroup>
                    </FormControl>
                    <Center
                        flexGrow={1}
                        w={"100%"}
                        borderRadius={5}
                        overflowX={"hidden"}
                        overflowY={loading ? "hidden" : "auto"}
                        maxH={"100%"}
                    >
                        <Container
                            centerContent
                            maxW={'container.xl'}
                            h={'100%'}
                            justifyContent={"center"}
                            flexDirection={"column"}
                            bg={"transparent"}
                            p={0}
                            mt={5}                            
                        >
                            <VStack
                                flex={1}
                                w={"100%"}                                
                                alignItems={"center"}
                                justifyContent={"flex-start"}
                            >
                                {
                                    (data.total === 0 && !loading) ? <VStack flex={1}>
                                        <Image
                                            alt={"Gif Spirited Away"}
                                            borderRadius={"5px"}
                                            boxSize={'400px'}
                                            src={ImageListVoid}
                                        />
                                        <Text
                                            fontWeight={'bold'}
                                            bottom={"240px"}
                                            pos={"absolute"}
                                            textDecoration={"underline"}
                                            fontSize={"xl"}
                                        >
                                            Not found records :(
                                        </Text>
                                    </VStack>
                                    : (loading) ? <VStack 
                                        w={"100%"} 
                                        h={"100%"} 
                                        align={"center"} 
                                        justify={"center"}
                                    >
                                        <Spinner 
                                            speed='0.65s'
                                            emptyColor='gray.200'
                                            color='black'
                                            maxW={'auto'}
                                            w={"100px"}
                                            h={"100px"}
                                        />
                                        <Text 
                                            fontSize={30}            
                                        >
                                            Searching...
                                        </Text>
                                    </VStack>
                                    : data.total > 0 ? <List 
                                        recordsList={data.records}
                                        type={typeSearch}
                                    /> : <></>
                                }
                            </VStack>
                        </Container>
                    </Center>
                </VStack>
            </VStack>
        </Center>

    );

} 