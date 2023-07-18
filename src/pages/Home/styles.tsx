import { 
    chakra, 
    Text, 
    Center, 
    forwardRef, 
    StackProps,
    VStack,
    TextProps,
    Stack
} from '@chakra-ui/react';
import ImageBackground from '../../assets/images/image-background.jpg';

export const ContainerHome = chakra(Center, {
    baseStyle: {
        bgImage: ImageBackground,
        backgroundSize: "cover",
        minH:'600px',
        h: "100vh",
        overflow: 'auto',
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
            fontFamily={"Fira Sans Condensed, sans-serif"}
            textShadow={"2px 1px black"}
            marginTop={'0px !important'}
            marginBottom={'0px !important'}
            {...props}
        >
            {props.children}
        </Text>
    )
);

export const ContainerListAndParams = forwardRef<StackProps & { isMobile: boolean }, 'div'>(
    (props) => (
        <Stack
            flexGrow={props.isMobile ? 1 : 0}
            h={props.isMobile ? 'auto' : '700px'}
            w={props.isMobile ? '100%' : '60%'}
            p={props.isMobile ? 1 : 2}
            direction={props.isMobile ? 'column' : 'row-reverse'}
            align={'center'}
            justify={'center'}
            mt={props.isMobile ? '0px !important' : '0.5rem'}
            overflow={'hidden'}
            {...props}
        >
            {props.children}
        </Stack>
    )
);

export const ContainerStack = forwardRef<StackProps & { isMobile: boolean }, 'div'>(
    (props) => (
        <VStack
            w={"full"}
            h={'full'}            
            alignItems={"center"}
            position={'relative'}
            justifyContent={"center"}
            backdropFilter={"blur(5px)"}
            pt={5}
            pb={props.isMobile ? 1 : 5}
            px={1}
            {...props}
        >
            {props.children}
        </VStack>
    )
);

export const ContainerSearchButtons = forwardRef<StackProps & { isMobile: boolean }, 'div'>(
    (props) => (
        <VStack
            flex={1}
            w={props.isMobile ? 'full' : 'auto'}
            h={'100%'}
            background={'#1ca0d15e'}
            borderRadius={props.isMobile ? 5 : "50px"}
            boxShadow={'0px 0px 10px black'}
            p={props.isMobile ? 0 : 10}
            pb={'20px'}                        
            pos={"relative"}
            overflow={'hidden'}
            {...props}
        >
            {props.children}
        </VStack>
    )
);

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
        fontSize: ['4xl','5xl','6xl'],
        fontWeight: 'bold',
        color: 'white',
        letterSpacing: '1px',
        fontStyle: 'italic',
        fontFamily: "Fira Sans Condensed, sans-serif",
        textAlign: 'center',
        flexDirection: 'row',
        display: "flex",
        textShadow: "5px 2px black"
    }
});