import React from "react"
import { 
    Center, 
    VStack, 
    FormControl, 
    FormLabel, 
    Input 
} from "@chakra-ui/react"

export default function Home() {

    return (

        <Center bg={'transparent'} h={"100%"} w={"100%"}>
            <VStack h={'600px'} w={'60%'} border={"1px solid black"} borderRadius={"50px"} p={10}>
                <FormControl fontFamily={"sans-serif"}>
                    <FormLabel fontWeight={'bold'}>
                        {'Pesquise algum personagem do Studio Ghibli :)'} 
                    </FormLabel>
                    <Input variant='flushed' placeholder='Flushed' htmlSize={5}/>
                </FormControl>
            </VStack>
        </Center>

    );

} 