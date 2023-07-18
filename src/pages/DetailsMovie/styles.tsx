import { 
    forwardRef,
    chakra, 
    Text, 
    Card,
    HStack,
    Image,
    CardBody,
    CardBodyProps,
    CardProps, 
    Flex, 
    Heading,
    Badge,
    FlexProps,
    CenterProps,
    Center,
    StackProps,
    VStack,
    Stack,
    UnorderedList
} from '@chakra-ui/react';

export const TitleMovie = chakra(Text, {
    baseStyle: { 
        fontSize: ["3xl", "5xl", "6xl"],
        fontWeight: 'bold',
        color: 'white',
        fontFamily: "Fira Sans Condensed, sans-serif",
        mb: 2,
        width: 'auto',
        textShadow: "5px 2px black",
        textDecoration: 'underline'
    }
});

export const ImageBannerMovie = chakra(Image, {
    baseStyle: {
        alt: 'Image Movie Banner',
        boxSize: '100%',
        h: 'auto',
        borderRadius: 5,
        _hover: {
            opacity: 0.3
        } 
    }
});

export const TextScore = chakra(Text, {
    baseStyle: {
        fontSize: ['16px', '20px', '24px'],
        border: '1px solid white',
        borderRadius: 5,
        px: 3,
        py: 1.5
    }
});

export const TextDescription = chakra(Text, {
    baseStyle: {
        textAlign: 'left',
        fontSize: '16px'
    }
});

export const ContainerBadges = chakra(HStack, {
    baseStyle: {
        fontSize: ['sm', 'md'],
        alignItems: 'flex-start',
        height: '100%'
    }
});

export const BadgeMovie = chakra(Badge, {
    baseStyle: {
        variant: 'solid',  
        cursor: 'default',
        fontSize: '100%'
    }
});

export const HeadingMovieInfo = chakra(Heading, {
    baseStyle: {
        size: 'lg',
        w: '100%',
        fontFamily: "Fira Sans Condensed, sans-serif",
        textAlign: 'left',
        textDecoration: 'underline'
    }
});

export const ListCharacters = chakra(UnorderedList, {
    baseStyle: {
        w: '90%',
        textAlign: 'left'
    }
}); 

export const BackButton = forwardRef<FlexProps & { isMobile: boolean }, 'div'>(
    (props, ref) => {
        return <Flex 
            position={'absolute'}
            left={props.isMobile ? 2 : 75}
            top= {props.isMobile ? 2 : '48px'}
            padding={2}
            borderRadius={50}
            backgroundColor='rgba(0, 0, 0, 0.7)'
            cursor='pointer'
            {...props}
        >
            {props.children}
        </Flex>
    }
);

export const ContainerDetailsMovie = forwardRef<CenterProps & { isMobile: boolean }, 'div'>(
    (props, ref) => {
        return <Center
            backgroundSize={"cover"}
            h={"100vh"}
            w={"100vw"}
            pos={"relative"}
            pt={props.isMobile ? 14 : 0}
            overflowY={'auto'}
            overflowX={'hidden'}
            css={{
                '&::-webkit-scrollbar': {
                    width: props.isMobile ? '8px' : '12px',
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
            {...props}
        >
            {props.children}
        </Center>
    }
);

export const ContainerBackground = forwardRef<FlexProps & { isMobile: boolean }, 'div'>(
    (props, ref) => {
        return <Flex
            w={"100%"}
            h={props.isMobile ? "100%" : "95%"}
            flex={1}
            align={"center"}
            justify={"center"}
            backdropFilter={"blur(5px)"}                                
        >
            {props.children}
        </Flex>
    }
);

export const ContainerTitleCard = forwardRef<StackProps & { isMobile: boolean }, 'div'>(
    (props, ref) => (
        <VStack
            h={'100%'}
            w={'100%'}
            spacing={props.isMobile ? 0 : 5}           
            {...props}
        >
            {props.children}
        </VStack>
    )
);

export const ContainerCardMovie = forwardRef<CenterProps & { isMobile: boolean }, 'div'>(
    (props, ref) => {
        return <Center
            w={!props.isMobile ? "55vw" : "100vw"}
            flexGrow={1}
            borderRadius={5}
            {...props}
        >
            {props.children}
        </Center>
    }
);

export const CardMovieDetails = forwardRef<CardProps & { isMobile: boolean }, 'div'>(
    (props, ref) => (
        <Card 
            maxW={['3xl','4xl']} 
            minH={'500px'}
            flexGrow={1}
            backgroundColor={"rgba(0, 0, 0, 0.7)"}
            color={"white"}                             
            marginBottom={props.isMobile ? 0 : 10}
            {...props}
        >
            {props.children}
        </Card>
    )
);

export const CardBodyMovieDetails = forwardRef<CardBodyProps & { isMobile: boolean }, 'div'>(
    (props, ref) => (
        <CardBody                                    
            borderRadius={5}
            overflowX={"hidden"}
            overflowY={"auto"}
            p={!props.isMobile ? 5 : 3}   
            {...props}                                 
        >
            {props.children}
        </CardBody>
    )
);

export const ContainerInformationsMovie = forwardRef<StackProps & { isMobile: boolean }, 'div'>(
    (props, ref) => (
        <Stack 
            w={'100%'} 
            h={'80px'}
            direction={props.isMobile ? 'column' : 'row'}
            align={props.isMobile ? 'start' : 'center'} 
            justify={'start'}
            my={2}
            {...props}
        >
            {props.children}
        </Stack>
    )
);
