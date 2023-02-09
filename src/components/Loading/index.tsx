import { 
    VStack, 
    Spinner, 
    Text 
} from '@chakra-ui/react';

interface LoadingProps {
    message?: string;
}

export default function Loading({
    message
}: LoadingProps) {

    return <VStack 
        w={"100%"} 
        h={"100%"} 
        align={"center"} 
        justify={"center"}
    >
        <Spinner 
            speed='0.65s'
            emptyColor='gray.200'
            color='black'
            maxW={'auto'}
            w={"100px"}
            h={"100px"}
        />
        <Text 
            fontSize={30}            
        >
            {message || 'Searching...'}
        </Text>
    </VStack>

}