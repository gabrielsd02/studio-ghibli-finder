import { 
    chakra, 
    Text, 
    Box, 
    Flex 
} from '@chakra-ui/react';

export const ContainerTexts = chakra(Flex, {
    baseStyle: {
        width: '100%',
        marginBottom: '5px !important',
        alignItems: 'center',
        justifyContent: 'space-between',
        overflow: 'hidden',
        borderBottomWidth: '2px',
        borderStyle: 'solid',
        borderColor: 'white',
        height: '30px'
    }
});

export const ContainerImage = chakra(Box, {
    baseStyle: {
        flex: 1,
        width: '100%',
        maxHeight: '500px',
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden"
    }
});

export const TitleMovie = chakra(Text, {
    baseStyle: {
        fontSize: '6xl',
        fontWeight: 'bold',
        color: 'white',
        fontFamily: "cursive",
        width: 'auto',
        textShadow: "5px 2px black",
        textDecoration: 'underline'
    }
});

export const LabelContainer = chakra(Text, {
    baseStyle: {
        textShadow: '3px 2px black',
        textAlign: 'left',
        fontSize: 'lg',
        display: 'flex'
    }
});

export const LabelInformation = chakra(Text, {
    baseStyle: {
        fontWeight: 'bold',
        marginRight: 2
    }
}); 

export const LabelDescriptionContainer = chakra(Text, {
    baseStyle: {
        textShadow: '3px 2px black',
        textAlign: 'left',
        fontSize: 'lg',  
        width: '100%',
        borderBottomWidth: '2px',
        borderColor: 'white',
        borderStyle: 'solid',
        paddingBottom: '5px'  
    }
});

export const BackButton = chakra(Flex, {
    baseStyle: {
        position: 'absolute',
        left: 40,
        top: '70px',
        padding: 2,
        borderRadius: 50,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        cursor: 'pointer'
    }
});