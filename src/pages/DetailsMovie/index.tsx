import {    
    useState,
    useEffect,
    memo
} from 'react';
import {
    Center,
    VStack,
    Image,
    UnorderedList,
    Card,
    CardBody,
    ListItem,
    Tooltip,
    Heading,
    Text,
    HStack,
    Badge,
    Flex,
    Box,
    useMediaQuery,
    Stack
} from "@chakra-ui/react";
import {
    StarIcon,
    ArrowBackIcon
} from '@chakra-ui/icons';
import {
    useParams,
    useNavigate
} from 'react-router-dom';
import { motion } from 'framer-motion';
import axios, { AxiosResponse } from 'axios';
import useIsMounted from 'ismounted';

import {
    MoviesProps,
    PeopleProps
} from '../../interfaces';
import {
    TitleMovie,
    BackButton,
    ContainerImage,
    ContainerTexts,
    LabelContainer,
    LabelInformation,
    LabelDescriptionContainer
} from './styles';
import ImageBackground from '../../assets/images/image-background.jpg';
import Loading from '../../components/Loading';

interface MovieDetailResponse {
    film: MoviesProps | null;
    characters: PeopleProps[] | null;
}

export function DetailsMovie() {

    const navigate = useNavigate();
    const props = useParams();
    const isMounted = useIsMounted();

    const [isMobile] = useMediaQuery('(max-width: 900px)');    
    const [loading, setLoading] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);    
    const [numberStars, setNumberStars] = useState<number[]>([]);
    const [movieData, setMovieData] = useState({} as MoviesProps);
    const [characters, setCharacters] = useState<PeopleProps[]>([]);

    function verifyColorScore(score: string) {
        
        const scoreInt = parseInt(score);
        let color = '';

        if(scoreInt < 40) {
            color = 'red';
        } else if(scoreInt >= 40 && scoreInt < 70) {
            color = 'yellow';
        } else if(scoreInt >= 70 && scoreInt < 80) {
            color = 'orange';
        } else {
            color = 'green.600';
        }

        return color;

    }

    async function consultMovie() {

        if (!props.id) return navigate(-1);

        if (loading) return;

        setLoading(true);

        const id: string = props.id;

        try {

            const { data }: AxiosResponse<MovieDetailResponse> = await axios.get(`/films/${id}`);

            if (data.characters && data.characters.length > 0) setCharacters(data.characters);
            if (data.film) {

                setMovieData(data.film);

                let score = parseInt(data.film.rtScore);
                let index = 1;
                score = Math.floor(score / 20);                           
                setLoading(false);
                for (index; index <= score; index++) {                    
                    await new Promise(resolve => setTimeout(resolve, 600));    
                    setNumberStars(Array.from({ length: index }, (_, index) => index + 1));
                }

            }                        

        } catch (e: any) {
            console.error(e);

            if (axios.isAxiosError(e) && e.response && e.response.data) {

                const error = e.response.data;



            }

        } finally {
            setLoading(false);
        }

    }

    useEffect(() => {
        consultMovie();
    }, []);    
    
    if (!isMounted.current) return <Loading />
    
    return (<>
        <Center
            bgImage={ImageBackground}
            backgroundSize={"cover"}
            h={"100vh"}
            w={"100vw"}
            pos={"relative"}
            pt={isMobile ? 14 : 0}
            overflowY={'auto'}
            overflowX={'hidden'}
            css={{
                '&::-webkit-scrollbar': {
                    width: isMobile ? '8px' : '12px',
                    height: '10px',
                    backgroundColor: "rgba(0, 0, 0, 0.2)",
                    borderRadius: "5px"
                },
                '&::-webkit-scrollbar-thumb': {
                    height: '70px',
                    background: "gray",
                    borderRadius: '10px',
                }
            }}
        >
            <Flex
                w={"100%"}
                h={isMobile ? "100%" : "95%"}
                flex={1}
                align={"center"}
                justify={"center"}
                backdropFilter={"blur(5px)"}                                
            >
                {(loading) ?
                    <Loading />
                    : <VStack
                        h={'100%'}
                        w={'100%'}
                        spacing={isMobile ? 0 : 5}                  
                    >
                        <Box margin={'auto'}>
                            <TitleMovie>
                                {movieData.title || ''}
                            </TitleMovie>
                        </Box>
                        <Center
                            w={!isMobile ? "55vw" : "100vw"}
                            borderRadius={5}
                        >
                            <Card 
                                maxW={['3xl','4xl']} 
                                backgroundColor={"rgba(0, 0, 0, 0.7)"}
                                color={"white"}
                                overflow={'auto'}                                
                                marginBottom={isMobile ? 0 : 10}
                            >
                                <CardBody                                    
                                    borderRadius={5}
                                    overflowX={"hidden"}
                                    overflowY={"auto"}
                                    p={!isMobile ? 5 : 3}                                    
                                >
                                    <Image
                                        alt={'Image Movie Banner'}
                                        boxSize={'100%'}
                                        h={'auto'}
                                        src={movieData.movieBanner}
                                        borderRadius={5}
                                        onLoad={() => setImageLoaded(true)}
                                    />
                                    {!imageLoaded && <Loading message={'Loading image...'} />}
                                    <Stack 
                                        w={'100%'} 
                                        h={'80px'}
                                        direction={isMobile ? 'column' : 'row'}
                                        align={isMobile ? 'start' : 'center'} 
                                        justify={'start'}
                                        my={2}
                                    >
                                        <HStack
                                            flex={1}
                                            spacing={3}
                                        >               
                                            <Text 
                                                fontSize={['16px', '20px', '24px']}
                                                border={'1px solid white'}
                                                borderRadius={5}
                                                background={verifyColorScore(movieData.rtScore)}
                                                px={3}
                                                py={1.5}
                                            >
                                                {movieData.rtScore || ''}                                            
                                            </Text> 
                                            <>
                                            {numberStars.map((number) => (                                                                
                                                <motion.div
                                                    key={number}
                                                    initial={{ 
                                                        scale: 3, 
                                                        marginLeft: -100, 
                                                        marginTop: -130 
                                                    }}                                                
                                                    animate={{ 
                                                        scale: 1, 
                                                        rotate: 360, 
                                                        marginLeft: 10, 
                                                        marginTop: 0 
                                                    }}
                                                    transition={{ 
                                                        duration: 0.8, 
                                                        ease: 'easeInOut' 
                                                    }} 
                                                >
                                                    <StarIcon
                                                        color={'yellow'}
                                                        fontSize={['3xl', '4xl']}
                                                        mb={1}                                                
                                                    />                                                             
                                                </motion.div>                                                
                                            ))}
                                            </>
                                        </HStack>
                                        <HStack 
                                            fontSize={['sm', 'md']}
                                            align={'flex-start'}
                                            h={'100%'}
                                        >
                                            <Badge 
                                                variant={'solid'} 
                                                cursor={'default'}
                                                colorScheme={'twitter'}
                                                fontSize={'100%'}
                                            >
                                                {movieData.releaseDate || ''}
                                            </Badge>
                                            <Badge 
                                                variant={'solid'}
                                                colorScheme={'teal'}
                                                fontSize={'100%'}
                                            >
                                                {movieData.runningTime || ''} min
                                            </Badge>                                            
                                        </HStack>                                                                                
                                    </Stack>
                                    <VStack spacing={3}>
                                        <Heading 
                                            size={'lg'} 
                                            w={'100%'} 
                                            fontFamily={'cursive'}
                                            textAlign={'left'}
                                            textDecoration={'underline'}
                                        >
                                            Description
                                        </Heading>
                                        <Text 
                                            textAlign={'left'}
                                            fontSize={'16px'}
                                        >
                                            {movieData.description || ''}
                                        </Text>
                                    </VStack>
                                    {(characters.length > 0) && <VStack mt={4} spacing={3}>
                                        <Heading 
                                            size={'lg'} 
                                            w={'100%'} 
                                            fontFamily={'cursive'}
                                            textAlign={'left'}
                                            textDecoration={'underline'}
                                        >
                                            Characters
                                        </Heading>
                                        <UnorderedList 
                                            spacing={3}
                                            w={'90%'}
                                            textAlign={'left'}
                                        >
                                            {characters.map((character, index) => (
                                                <ListItem key={index} ml={5} mt={2}>
                                                    {character.name}
                                                </ListItem>
                                            ))}
                                        </UnorderedList>
                                    </VStack>}
                                </CardBody>
                            </Card>
                        </Center>
                    </VStack>}
            </Flex>
        </Center>
        <Tooltip
            label={"Back to home"}
            fontSize={"md"}
            hasArrow
            placement='top'
        >
            <BackButton
                isMobile={isMobile}
                onClick={() => navigate('/')}
                _hover={{
                    opacity: 0.7
                }}
            >
                <ArrowBackIcon
                    fontSize={['3xl', '4xl', '5xl']}
                    color={'white'}
                />
            </BackButton>
        </Tooltip>
    </>)

}

export default memo(DetailsMovie);
