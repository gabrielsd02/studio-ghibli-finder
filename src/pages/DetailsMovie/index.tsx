import {
    useState,
    useEffect,
    memo
} from 'react';
import {
    Center,
    VStack,
    Container,
    Image,
    UnorderedList,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    ListItem,
    Tooltip
} from "@chakra-ui/react";
import {
    StarIcon,
    ArrowBackIcon
} from '@chakra-ui/icons';
import {
    useParams,
    useNavigate
} from 'react-router-dom';
import axios from 'axios';
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

export function DetailsMovie() {

    const navigate = useNavigate();
    const props = useParams();
    const isMounted = useIsMounted();

    const [loading, setLoading] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [movieData, setMovieData] = useState({} as MoviesProps);
    const [characters, setCharacters] = useState<PeopleProps[]>([]);

    async function consultMovie() {

        if (!props.id) return navigate(-1);

        if (loading) return;

        setLoading(true);

        const id: string = props.id;

        try {

            const { data }: any = await axios.get(`/films/${id}`);

            if (data.film) setMovieData(data.film);
            if (data.characters && data.characters.length > 0) setCharacters(data.characters);

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
        >
            <VStack
                w={"100%"}
                h={"90%"}
                flex={1}
                align={"center"}
                justify={"center"}
                backdropFilter={"blur(5px)"}
            >
                {(loading) ?
                    <Loading />
                    : <>
                        <TitleMovie>
                            {movieData.title || ''}
                        </TitleMovie>
                        <Center
                            flexGrow={1}
                            w={"60%"}
                            borderRadius={5}
                            maxH={"90%"}
                        >
                            <Container
                                centerContent
                                maxWidth={'100%'}
                                w={'100%'}
                                h={'100%'}
                                justifyContent={"flex-start"}
                                flexDirection={"column"}
                                bg={"transparent"}
                                p={1}
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
                                    h={'auto'}
                                    backgroundColor={"rgba(0, 0, 0, 0.7)"}
                                    color={"white"}
                                    alignItems={"center"}
                                    justifyContent={"flex-start"}
                                    borderRadius={5}
                                    spacing={5}
                                    pos={'relative'}
                                    p={'10px'}
                                >
                                    <ContainerImage>
                                        <Image
                                            alt={'Image Movie Banner'}
                                            boxSize={'100%'}
                                            objectFit={'fill'}
                                            src={movieData.movieBanner}
                                            borderRadius={5}
                                            onLoad={() => setImageLoaded(true)}
                                        />
                                        {!imageLoaded && <Loading message={'Loading image...'} />}
                                    </ContainerImage>
                                    <ContainerTexts>
                                        <LabelContainer>
                                            <LabelInformation>
                                                Original Title:
                                            </LabelInformation>
                                            {movieData.originalTitleRomanised || ''}
                                        </LabelContainer>
                                        <LabelContainer>
                                            <LabelInformation>
                                                Director:
                                            </LabelInformation>
                                            {movieData.director || ''}
                                        </LabelContainer>
                                    </ContainerTexts>
                                    <ContainerTexts>
                                        <LabelContainer>
                                            <LabelInformation>
                                                Running Time:
                                            </LabelInformation>
                                            {movieData.runningTime || '0'}min
                                        </LabelContainer>
                                        <LabelContainer>
                                            <LabelInformation>
                                                Release Date:
                                            </LabelInformation>
                                            {movieData.releaseDate || ''}
                                        </LabelContainer>
                                    </ContainerTexts>
                                    <ContainerTexts>
                                        <LabelContainer>
                                            <LabelInformation>
                                                Producer(s):
                                            </LabelInformation>
                                            {movieData.producer || ''}
                                        </LabelContainer>
                                        <LabelContainer>
                                            <LabelInformation>
                                                Rating:
                                            </LabelInformation>
                                            {movieData.rtScore || ''}
                                            <StarIcon
                                                color={'yellow'}
                                                fontSize={'2xl'}
                                                ml={1}
                                            />
                                        </LabelContainer>
                                    </ContainerTexts>
                                    <LabelDescriptionContainer>
                                        <LabelInformation>
                                            Description:
                                        </LabelInformation>
                                        {movieData.description || ''}
                                    </LabelDescriptionContainer>
                                    {(characters.length > 0) && <LabelContainer w={'100%'} flexDirection={'column'}>
                                        <LabelInformation>
                                            Characters:
                                        </LabelInformation>
                                        <UnorderedList spacing={3}>
                                            {characters.map((character, index) => (
                                                <ListItem key={index} ml={5} mt={2}>
                                                    {character.name}
                                                </ListItem>
                                            ))}
                                        </UnorderedList>
                                    </LabelContainer>}
                                </VStack>
                            </Container>
                        </Center>
                    </>}
            </VStack>
        </Center>
        <Tooltip
            label={"Back to home"}
            fontSize={"md"}
            hasArrow
            placement='top'
        >
            <BackButton
                onClick={() => navigate('/')}
                _hover={{
                    opacity: 0.7
                }}
            >
                <ArrowBackIcon
                    fontSize={'5xl'}
                    color={'white'}
                />
            </BackButton>
        </Tooltip>
    </>)

}

export default memo(DetailsMovie);
