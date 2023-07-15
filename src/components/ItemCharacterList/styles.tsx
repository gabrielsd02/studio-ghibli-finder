import { 
    forwardRef,
    chakra, 
    Text, 
    Stack,
    Flex, 
    VStack,
    StackProps,
    TextProps,
    Divider
} from '@chakra-ui/react';

export const TitleName = chakra(Text, {
    baseStyle: {
        w: 'full',
        fontSize: ['xl','2xl','3xl'],
        fontWeight: 'bold',
        textShadow: '0px 0px 5px black'
    }
});

export const ContainerCharacter = chakra(VStack, {
    baseStyle: {
        flex: 1,
        p: '0px 10px',
        w: "60%",
        h: "100%",
        fontFamily: "cursive",
        alignItems: "center",
        justifyContent: "flex-start",
        marginInlineEnd: '0.5rem !important'
    }
});

export const ContainerTitleInfo = chakra(VStack, {
    baseStyle: {
        h: "100%", 
        w: "100%", 
        alignItems: "flex-start", 
        justify: "flex-start",
        overflow: 'hidden'
    }
});

export const ContainerMovies = chakra(Flex, {
    baseStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        lineHeight: '1rem',
        w: 'full',
        fontSize: ['xs','md','lg']
    }
});

export const LabelInformation = forwardRef<TextProps & { isMobile: boolean }, 'span'>(
    (props, ref) => (
        <Text
            w={'full'}
            textAlign={props.isMobile ? 'left' : 'center'}
            isTruncated
            fontWeight={'bold'} 
        >
            {props.children}
        </Text>
    )
);

export const TextResults = forwardRef<TextProps & { isMobile: boolean }, 'span'>(
    
    (props, ref) => (
        <Text
            ml={2}
            isTruncated
            borderTopWidth={props.isMobile ? 0 : '1px'}
            textAlign={props.isMobile ? 'right' : 'center'}
            borderColor={'white'}
            w={'100%'}
            fontWeight={'100'}
            fontFamily={'emoji'}
            display={'inline-block'}
            textShadow={'0px 0px 5px black'}
            {...props}
        >
            {props.children}
        </Text>
    )

);

export const ContainerTitle = forwardRef<StackProps & { isMobile: boolean }, 'div'>(
    (props, ref) => (
        <VStack
            w={'100%'}
            h={props.isMobile ? 'auto' : '60%'}
            align={'center'}
            justify={'center'}
            borderBottomWidth={props.isMobile ? 0 : 1}
            borderColor={"white"}
            fontFamily={"cursive"}     
            whiteSpace={"nowrap"}
            overflow={"hidden"}
            spacing={0}
            mt={0}
        >
            {props.children}
        </VStack>
    )
);

export const MovieTextName = forwardRef<TextProps & { isMobile: boolean }, 'span'>(
    (props, ref) => (
        <Text
            ml={props.isMobile ? '1px' : 2}
            isTruncated
            lineHeight={'1rem'}                          
            textDecoration={'underline'}
            fontFamily={"emoji"}
            cursor={'pointer'}
            {...props}
        >
            {props.children}
        </Text>
    )
);

export const TextContainer = forwardRef<StackProps & { isMobile: boolean }, 'div'>(
    (props, ref) => (
        <Stack
            direction={props.isMobile ? 'row' : 'column'}
            textOverflow={'ellipsis'}
            whiteSpace={'nowrap'}
            overflow={'hidden'}
            display={'inline-flex'}
            textAlign={'center'}
            alignItems={'center'}
            justifyContent={'center'}
            minW={'70px'}
            w={'100%'}
            h={'100%'}
            {...props}
        >
            {props.children}
        </Stack>
    )
)

export const ContainerInformations = forwardRef<StackProps & { isMobile: boolean }, 'div'>(
    (props, ref) => (
        <Stack
            w={'full'}
            flexGrow={props.isMobile ? 1 : 0}
            h={props.isMobile ? 'auto' : '40%'}
            direction={props.isMobile ? 'column' : 'row'}
            justifyContent={'space-between'}
            alignItems={'center'}
            fontSize={['xs','sm','lg','xl']}
            spacing={props.isMobile ? 0 : '0.5rem'}
            divider={<Divider 
                orientation={props.isMobile ? 'horizontal' : 'vertical'} 
                borderWidth={'1px'} 
            />}
        >
            {props.children}
        </Stack>
    )
)