import { Text } from "@chakra-ui/react";

import {
    Container,
    TextError,
    TextNotFound,
    ContainerTexts
} from './styles';

export default function ErrorPage() {

    return (
        <Container>
            <ContainerTexts>
                <TextError>
                    ERROR <Text color='red'>404!</Text>
                </TextError>
                <TextNotFound>
                    OOPS! PAGE NOT FOUND 😕
                </TextNotFound>
            </ContainerTexts>
        </Container>

    )

}