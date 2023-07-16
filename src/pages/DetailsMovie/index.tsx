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
    TextScore,
    TitleMovie,
    BadgeMovie,
    BackButton,
    ListCharacters,
    TextDescription,
    ContainerBadges,
    HeadingMovieInfo,
    ImageBannerMovie,
    CardMovieDetails,
    ContainerCardMovie,
    ContainerTitleCard,
    ContainerBackground,
    CardBodyMovieDetails,
    ContainerDetailsMovie,
    ContainerInformationsMovie
} from './styles';
import { MovieDetailsResponse } from './interface';
import ImageBackground from '../../assets/images/image-background.jpg';
import Loading from '../../components/Loading';

export function DetailsMovie() {

    const navigate = useNavigate();
    const props = useParams();
    const isMounted = useIsMounted();

    const [isMobile] = useMediaQuery('(max-width: 900px)');    
    const [loading, setLoading] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [error, setError] = useState('');    
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

            const { data }: AxiosResponse<MovieDetailsResponse> = await axios.get(`/films/${id}`);
            
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

            if (axios.isAxiosError(e) && e.response && e.response.data) {

                const error = e.response.data;
                setError(error)

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
        <ContainerDetailsMovie
            bgImage={ImageBackground}
            isMobile={isMobile}
        >
            <ContainerBackground isMobile={isMobile}>
                {(loading) ?
                    <Loading />
                    : <ContainerTitleCard isMobile={isMobile}>
                        <Box margin={'auto'}>
                            <TitleMovie>
                                {movieData.title || ''}
                            </TitleMovie>
                        </Box>
                        <ContainerCardMovie isMobile={isMobile}>
                            <CardMovieDetails isMobile={isMobile}>
                                <CardBodyMovieDetails isMobile={isMobile}>
                                    {(movieData && Object.keys(movieData).length > 0) ? <>
                                        <ImageBannerMovie                                           
                                            src={movieData.movieBanner}
                                            onLoad={() => setImageLoaded(true)}
                                            onClick={() => window.open(movieData.movieBanner)}
                                        />
                                        {!imageLoaded && <Loading message={'Loading image...'} />}
                                        <ContainerInformationsMovie isMobile={isMobile}>
                                            <HStack
                                                flex={1}
                                                spacing={3}
                                            >               
                                                <TextScore 
                                                    background={verifyColorScore(movieData.rtScore)}
                                                >
                                                    {movieData.rtScore || ''}                                            
                                                </TextScore> 
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
                                            <ContainerBadges>
                                                <BadgeMovie 
                                                    colorScheme={'twitter'}
                                                >
                                                    {movieData.releaseDate || ''}
                                                </BadgeMovie>
                                                <BadgeMovie 
                                                    colorScheme={'teal'}
                                                >
                                                    {movieData.runningTime || ''} min
                                                </BadgeMovie>                                            
                                            </ContainerBadges>                                                                                
                                        </ContainerInformationsMovie>
                                        <VStack spacing={3}>
                                            <HeadingMovieInfo>
                                                Description
                                            </HeadingMovieInfo>
                                            <TextDescription>
                                                {movieData.description || ''}
                                            </TextDescription>
                                        </VStack>
                                        {(characters.length > 0) && <VStack mt={4} spacing={3}>
                                            <HeadingMovieInfo>
                                                Characters
                                            </HeadingMovieInfo>
                                            <ListCharacters>
                                                {characters.map((character, index) => (
                                                    <ListItem key={index} ml={5} mt={2}>
                                                        {character.name}
                                                    </ListItem>
                                                ))}
                                            </ListCharacters>
                                        </VStack>}
                                    </> : <Text fontSize={'5xl'}>
                                        {error}
                                    </Text>}
                                </CardBodyMovieDetails>
                            </CardMovieDetails>
                        </ContainerCardMovie>
                    </ContainerTitleCard>}
            </ContainerBackground>
        </ContainerDetailsMovie>
        <BackButton
            isMobile={isMobile}
            onClick={() => navigate('/')}
            _hover={{
                opacity: 0.7
            }}
        >
            <Tooltip
                label={"Back to home"}
                fontSize={"md"}
                hasArrow
                placement='top'
            >
                <ArrowBackIcon
                    fontSize={['3xl', '4xl', '5xl']}
                    color={'white'}
                />
            </Tooltip>
        </BackButton>            
    </>)

}

export default memo(DetailsMovie);
