import { 
    VStack, 
    Spinner, 
    Text 
} from '@chakra-ui/react';

export default function Loading() {

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
            Searching...
        </Text>
    </VStack>

}