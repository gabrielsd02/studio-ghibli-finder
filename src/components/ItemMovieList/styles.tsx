import { 
    forwardRef,
    chakra, 
    Text, 
    Stack,
    Flex, 
    VStack,
    StackProps,
    TextProps,
    Divider,
    FlexProps,
    HStack
} from '@chakra-ui/react';

export const ContainerTitleInformations = chakra(VStack, {
    baseStyle: {
        w: '100%',
        h: '100%',
        align: 'center',
        justify: 'center',
        fontFamily: "Fira Sans Condensed, sans-serif",
        whiteSpace: "nowrap",
        overflow: "hidden",
    }
});

export const ContainerCharacters = chakra(HStack, {
    baseStyle: {
        align: "center",
        justify: "flex-start",
        wrap: "nowrap",                            
        maxH: "20%",
        w: "100%",
        h: '30px',
        maxW: "100%",                          
        flex: 1,
        fontFamily: "emoji",     
        whiteSpace: "nowrap"
    }
});

export const CharacterName = chakra(Text, {
    baseStyle: {
        overflow: "hidden", 
        textOverflow: "ellipsis", 
        ml: 2,
        mr: 2
    }
})

export const ContainerLabelValue = chakra(Flex, {
    baseStyle: {
        overflow: 'hidden',
        w: 'inherit',
        justifyContent: 'center'
    }
});

export const Label = chakra(Text, {
    baseStyle: {
        fontFamily: "Fira Sans Condensed, sans-serif",
        lineHeight: '1rem',
        fontSize: ['xs','sm','sm','md'],
        fontWeight: "bold"    
    }
});

export const TextValue = chakra(Text, {
    baseStyle: {
        overflow: "hidden",
        textOverflow: "ellipsis",
        fontFamily: "Fira Sans Condensed, sans-serif",
        lineHeight: '1rem',
        fontSize: ['xs','sm','sm','md'],
        fontWeight: '100',
        ml: 2,
    }
});

export const TextDescription = chakra(Text, {
    baseStyle: {
        textAlign: 'left',
        textOverflow: 'ellipsis',
        fontFamily: 'system-ui',
        fontSize: ['sm','md','lg'],
        textShadow: '3px 2px black'
    }
});

export const ContainerInformations = forwardRef<StackProps & { isMobile: boolean }, 'div'>(
    (props, ref) => (
        <VStack
            flex={1}
            w={"60%"}
            h={"100%"} 
            fontFamily={"Fira Sans Condensed, sans-serif"}
            p={1}
            pos={'relative'}
            align={"center"}
            justify={"flex-start"}
            marginInlineEnd={0}
            divider={<Divider 
                orientation="horizontal" 
                borderWidth={1.5} 
                borderColor={'white'} 
            />}
            _active={props.isMobile ? { opacity: 0.3 } : {}}
            _before={{
                content: `""`, 
                position: "absolute", 
                top: 0,
                right: props.isMobile ? 0 : '-8px',
                bottom: 0,
                left: '-8px',
                borderEndRadius: props.isMobile ? 10 : 0,
                backgroundColor: "rgb(0, 0, 0)", 
                zIndex: -1
            }}
            {...props}
        >
            {props.children}
        </VStack>
    )
);

export const BoxTitleInformations  = forwardRef<FlexProps & { isMobile: boolean }, 'div'>(
    (props, ref) => (
        <Flex
            width={"100%"} 
            height={props.isMobile ? '50%' : 'auto'}
            flexGrow={1}
            alignItems={"flex-start"} 
            justifyContent={"flex-start"}
            overflow={'hidden'}
            {...props}
        >
            {props.children}
        </Flex>
    )
);

export const Title = forwardRef<TextProps & { isMobile: boolean }, 'p'>(
    (props, ref) => (
        <Text
            fontSize={['xl','2xl','2xl','3xl']}
            textOverflow={'ellipsis'}
            fontWeight={'bold'}
            lineHeight={props.isMobile ? '2rem' : 'auto'}
            textShadow={'0px 0px 5px black'}
            isTruncated
            w={'100%'}
            textDecoration={props.isMobile ? 'underline' : 'none'}
            {...props}
        >
            {props.children}
        </Text>
    )
);

export const ContainerInformationsMovie = forwardRef<StackProps & { isMobile: boolean }, 'div'>(
    (props, ref) => (
        <Stack
            w={props.isMobile ? 'start' : 'full'}
            h={'20px'}
            flexGrow={1}
            mt={'0px !important'}
            align={props.isMobile ? 'start' : 'center'}
            justify={'center'}
            direction={props.isMobile ? 'column' : 'row'}
            fontSize={['2xs','xs','sm','md']}
            spacing={props.isMobile ? 0 : '0.5rem'}                        
            divider={props.isMobile ? undefined : <Divider orientation="vertical" borderWidth={1} />}
            {...props}
        >
            {props.children}
        </Stack>
    )
); 

export const ContainerDescription  = forwardRef<FlexProps & { isMobile: boolean }, 'div'>(
    (props, ref) => (
        <Flex
            align={props.isMobile ? 'start' : 'center'}
            justifyContent={'flex-start'}
            w={'100%'}  
            flexGrow={1}    
            overflow={'hidden'}
            {...props}
        >
            {props.children}
        </Flex>
    )
);