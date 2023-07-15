import { 
    forwardRef,
    chakra, 
    Flex, 
    Image,
    Button,
    ImageProps,
    FlexProps,
    HStack,
    Box
} from '@chakra-ui/react';

export const ContainerList = forwardRef<FlexProps & { isMobile: boolean }, 'div'>(
    (props, ref) => (
        <Flex
            w={"100%"}
            h={props.isMobile ? 180 : 200}
            backgroundColor={"rgba(0, 0, 0, 0.7)"}
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

export const ContainerItemList = chakra(HStack, {
    baseStyle: {
        align: "flex-start", 
        justify: "center",
        w: "100%",
        h: "100%",
        pos: "relative"
    }
});

export const ContainerImage = chakra(Box, {
    baseStyle: {
        h: 'full',
        alignItems: "center", 
        justifyContent: "center",
        borderRightWidth: 1,
        borderColor: "gray", 
        overflow: "hidden"
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