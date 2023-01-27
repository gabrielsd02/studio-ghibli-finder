import {
    useState,
    useEffect    
} from 'react';
import { 
    Text,
    Center, 
    VStack
} from "@chakra-ui/react";
import { 
    useParams,
    useNavigate
} from 'react-router-dom';
import axios from 'axios';

import { 
    MoviesProps, 
    PeopleProps 
} from '../../interfaces';
import ImageBackground from '../../assets/images/image-background.jpg';
import Loading from '../../components/Loading';

export default function DetailsMovie() {

    const navigate = useNavigate();
    const props = useParams();    

    const [loading, setLoading] = useState(false);    
    const [movieData, setMovieData] = useState({} as MoviesProps);
    const [characters, setCharacters] = useState<PeopleProps[]>([]);

    async function consultMovie() {

        if(!props.id) return navigate(-1);

        setLoading(true);

        const id: string = props.id;

        try {

            const { data }: any = await axios.get(`/films/${id}`);

            if(data.film) setMovieData(data.film);
            if(data.characters && data.characters.length > 0) setCharacters(data.characters);

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
        consultMovie();
    }, []);
    
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
                {loading ? 
                    <Loading />
                : <>
                    <Text
                        fontSize='6xl'
                        as='b'
                        color={'white'}
                        fontFamily={"cursive"}
                        w='auto'
                        textShadow={"5px 2px black"}
                    >
                        {movieData.title || ''}
                    </Text>                   
                </>}
                {/* div row */}
                    {/* img */}
                    {/* descricao */}
                {/* div row */}
            </VStack>
        </Center>
    )

}