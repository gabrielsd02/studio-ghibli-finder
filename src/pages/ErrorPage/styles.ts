import { 
    chakra, 
    Text, 
    Box, 
    Flex 
} from '@chakra-ui/react';
import ImagePostGhibli from '../../assets/images/studio-ghibli-post.jpg';

export const Container = chakra(Box, {
    baseStyle: {
        w: '100%',
        h: '100%',  
        flexDirection: 'column',
        bgImage: ImagePostGhibli,
        backgroundSize: 'cover',
        backgroundPosition: 'center',      
        backgroundRepeat: 'no-repeat',
        position: 'relative'
    }
});

export const ContainerTexts = chakra(Flex, {
    baseStyle: {
        width: '100%',
        height: '100%',
        zIndex: 2,
        top: '5%',
        left: '1%',
        flexDirection: 'column',
        pos: 'absolute',
        alignItems: 'flex-start'
    }
});

export const TextError = chakra(Text, {
    baseStyle: {
        display: 'flex',
        fontSize: '8xl',
        fontWeight: 'bold',
        flexDirection: 'row',
        textDecoration: 'underline'
    }
});

export const TextNotFound = chakra(Text, {
    baseStyle: {
        fontSize: '5xl',
        fontWeight: 'bold'
    }
});