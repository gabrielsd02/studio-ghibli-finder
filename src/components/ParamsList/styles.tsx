import { 
    forwardRef,
    Text, 
    Stack, 
    Button, 
    ButtonProps,
    StackProps
} from '@chakra-ui/react';

export const ContainerParams = forwardRef<StackProps & { isMobile: boolean }, 'div'>(
    (props, ref) => (
        <Stack
            alignItems={props.isMobile ? 'center' : 'flex-start'}
            justify={props.isMobile ? 'end' : 'start'}
            w={props.isMobile ? '100%' : 'auto'}
            h={props.isMobile ? 'auto' : '85%'}
            minH={'50px'}
            direction={props.isMobile ? 'row' : 'column'}
            ml={props.isMobile ? 0 : '0.7rem !important'}
            spacing={5}
            my={2}
            {...props}
        >
            {props.children}
        </Stack>
    )
)

export const ButtonFilter = forwardRef<ButtonProps & { isMobile: boolean }, 'button'>(
    (props, ref) => (
        <Button
            h={'auto'}
            background={'rgba(0, 0, 0, 0.6)'}
            borderRadius={50}
            ml={props.isMobile ? 0 : '0.5rem !important'}
            p={props.isMobile ? 2 : 3}
            border={"1px solid black"}
            boxShadow={'0px 0px 5px black'}
            cursor={'pointer'}
            _hover={{
                opacity: 0.7
            }} 
            {...props}
        >
            {props.children}
        </Button>
    )
)