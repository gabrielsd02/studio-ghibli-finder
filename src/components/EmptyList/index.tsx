import { 
    VStack, 
    Image, 
    Text 
} from "@chakra-ui/react";
import ImageListVoid from '../../assets/images/character-spirited-away.png';

export default function EmptyList() {

    return <VStack 
        flex={1}
        align={"center"}
        justify={"center"}
        pos={"relative"}
    >
        <Image
            alt={"Image character from Spirited Away"}
            borderRadius={"5px"}
            boxSize={'400px'}
            src={ImageListVoid}
        />
        <Text
            fontWeight={'bold'}
            bottom={"130px"}
            pos={"absolute"}
            textDecoration={"underline"}
            fontSize={"xl"}
        >
            Not found records :(
        </Text>
    </VStack>

}