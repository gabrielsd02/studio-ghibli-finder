import { 
    forwardRef,
    Stack, 
    Checkbox,
    CheckboxProps,
    StackProps
} from '@chakra-ui/react';

export const ContainerFiltersPeople = forwardRef<StackProps & { isMobile: boolean }, 'div'>(
    (props, ref) => (
        <Stack           
            w={props.isMobile ? 'auto' : '56px'}           
            align={'center'}
            justify={'center'}
            spacing={props.isMobile ? 3 : 5}
            direction={props.isMobile ? 'row' : 'column'}
            marginInlineStart={props.isMobile ? '5px !important' : 'auto'}
            ml={props.isMobile ? 0 : '0.55rem !important'}
            px={5}
            {...props}
        >
            {props.children}
        </Stack>
    )
)

export const ContainerIconCheckbox = forwardRef<StackProps & { isMobile: boolean }, 'div'>(
    (props, ref) => (
        <Stack           
            w={'100%'}
            direction={props.isMobile ? 'row' : 'column'}
            align={'center'}
            justify={'center'}
            {...props}
        >
            {props.children}
        </Stack>
    )
)

export const CheckboxGender = forwardRef<CheckboxProps & { isMobile: boolean }, 'div'>(
    (props, ref) => (
        <Checkbox 
            borderColor={'rgba(0, 0, 0, 0.7)'}
            background={'rgba(0, 0, 0, 0.7)'}
            colorScheme={'rgba(0, 0, 0, 0.7)'}
            iconColor={'white'}
            size={'lg'}
            marginInlineStart={props.isMobile ? '1px !important' : 'auto'}
            _hover={{
                boxShadow: '0px 0px 5px white'
            }}
            _active={{
                opacity: 0.7
            }}
            {...props}
        />
    )
)