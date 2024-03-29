import { 
    forwardRef,
    chakra, 
    Flex, 
    Image,
    Button,
    ImageProps,
    FlexProps,
    HStack,
    Box,
    BoxProps
} from '@chakra-ui/react';

export const ContainerList = forwardRef<FlexProps & { isMobile: boolean }, 'div'>(
    (props, ref) => (
        <Flex
            w={"100%"}
            h={props.isMobile ? 180 : 200}            
            color={"white"}
            alignItems={"center"}
            justifyContent={"center"}
            borderRadius={10}
            {...props}
        >
            {props.children}
        </Flex>
    )
); 

export const ImageItem = forwardRef<ImageProps & { isPeople: boolean }, 'div'>(
    (props, ref) => (
        <Image
            alt={'Image'}
            margin={'auto'}
            boxSize={'100%'}      
            objectFit={'contain'}                            
            borderTopLeftRadius={10}
            borderBottomLeftRadius={10}
            cursor={!props.isPeople ? 'pointer' : 'normal'}
            _hover={{
                opacity: !props.isPeople ? 0.3 : 1
            }}    
            {...props}
        />
    )
); 

export const ContainerImage = forwardRef<BoxProps & { isMobile: boolean }, 'div'>(
    (props, ref) => (
        <Box
            h={'full'}
            minW={props.isMobile ? '120px' : '133px'}
            maxW={props.isMobile ? '120px' : '133px'}
            alignItems={"center"}
            justifyContent={"center"}
            borderRightWidth={1}
            borderColor={"gray"}
            overflow={"hidden"}
            {...props}
        >
            {props.children}
        </Box>
    )
); 

export const ContainerItemList = chakra(HStack, {
    baseStyle: {
        justifyContent: "flex-start",
        w: "100%",
        h: "100%",
        pos: "relative"
    }
});

export const ButtonInfoMovie = chakra(Button, {
    baseStyle: {
        h: "100%", 
        w: "10%",
        background: "#1869bdde",
        alignItems: "center", 
        justifyContent: "center",
        overflow: 'hidden',
        borderLeftWidth: 1,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        borderLeftRadius: 0,
        borderColor: "gray",
        p: 5,               
        cursor: "pointer",
        _hover: { opacity: 0.7, background: "#1869bdde" }, 
        _active: { opacity: 0.5 , background: "#1869bdde" }  
    }
});