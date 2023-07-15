import { 
    chakra, 
    Text, 
    Center, 
    forwardRef, 
    StackProps,
    VStack,
    TextProps
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

export const ContainerTextCount = forwardRef<TextProps & { isMobile: boolean }, 'span'>(
    (props) => (
        <Text
            fontSize={['3xl', '4xl']}
            fontWeight={'bold'}
            color={'white'}
            fontFamily={"cursive"}
            textShadow={"2px 1px black"}
            marginTop={'0px !important'}
            marginBottom={'0px !important'}
            {...props}
        >
            {props.children}
        </Text>
    )
)

export const ContainerStack = forwardRef<StackProps & { isMobile: boolean }, 'div'>(
    (props) => (
        <VStack
            width={"100%"}
            height={"100%"}
            flex={1}
            alignItems={"center"}
            justifyContent={"center"}
            backdropFilter={"blur(5px)"}
            py={props.isMobile ? 5 : 0}
            pb={0}
            px={1}
            {...props}
        >
            {props.children}
        </VStack>
    )
)

export const ContainerList = chakra(VStack, {
    baseStyle: {
        display: "flex",                                                       
        alignItems: "center",
        justifyContent: "flex-start" ,
        maxHeight: "100%",
        spacing: "4",
        w: '100%', 
        pr: 1, 
        mr: 1
    }
}); 

export const Title = chakra(Text, {
    baseStyle: {
        fontSize: ['3xl','5xl','6xl'],
        fontWeight: 'bold',
        color: 'white',
        fontFamily: "cursive",
        flexDirection: 'row',
        display: "flex",
        width: 'auto',
        textShadow: "5px 2px black"
    }
});