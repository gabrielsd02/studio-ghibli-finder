import { 
    chakra, 
    Text, 
    Center, 
    Flex, 
    VStack
} from '@chakra-ui/react';
import ImageBackground from '../../assets/images/image-background.jpg';

export const ContainerHome = chakra(Center, {
    baseStyle: {
        bgImage: ImageBackground,
        backgroundSize: "cover",
        h: "100vh",
        w: "100vw",
        pos: "relative"
    }
});

export const ContainerTextCount = chakra(Text, {
    baseStyle: {
        fontSize: '4xl',
        fontWeight: 'bold',
        color: 'white',
        fontFamily: "cursive",
        width: 'auto',
        textShadow: "2px 1px black"
    }
}); 

export const ContainerStack = chakra(VStack, {
    baseStyle: {
        width: "100%",
        height: "100%",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backdropFilter: "blur(5px)"     
    }
});

export const ContainerList = chakra(VStack, {
    display: "flex",                                                       
    alignItems: "center",
    justifyContent: "flex-start" ,
    maxHeight: "100%",
    spacing: 4
}); 

export const Title = chakra(Text, {
    baseStyle: {
        fontSize: '6xl',
        fontWeight: 'bold',
        color: 'white',
        fontFamily: "cursive",
        width: 'auto',
        textShadow: "5px 2px black"
    }
});