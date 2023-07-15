import { 
    VStack, 
    Image, 
    Fade
} from "@chakra-ui/react";

import ImageListVoid from '../../assets/images/character-spirited-away.png';
import './style.scss';

interface EmptyListProps {
    isMobile?: boolean;
}

export default function EmptyList({
    isMobile = false
}: EmptyListProps) {
    
    return <Fade 
        in={true} 
        transition={{
            enter: { 
                opacity: 1,
                duration: 0.3
            },
            exit: { 
                opacity: 0,
                duration: 0.5 
            }
        }}
    >
        <VStack 
            flex={1}
            align={"center"}
            justify={"center"}
            pos={"relative"}
        >
            <Image
                alt={"Image character from Spirited Away"}
                borderRadius={"5px"}
                boxSize={isMobile ? '225px' : '420px'}              
                src={ImageListVoid}
            />
            <h1 className={isMobile ? "mobile" : "web"}>
                <span className={"left"}>Not found </span>
                <span className={"right"}> records:(</span>
            </h1>            
        </VStack>
    </Fade>

}