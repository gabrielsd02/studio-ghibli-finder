import { chakra, Text, VStack } from '@chakra-ui/react';

export const TextContainer = chakra(VStack, {
    baseStyle: {
        textOverflow: 'ellipsis',        
        whiteSpace: 'nowrap', 
        overflow: 'hidden',
        display: 'inline-flex',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        minW: '70px',
        w: '100%',
        h: '100%'        
    }
})

export const TextResults = chakra(Text, {
    baseStyle: {
        ml: 2,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        borderTopWidth: '1px',
        borderColor: 'white',
        w: '100%',
        fontWeight: '100',
        fontFamily: 'emoji',
        display: 'inline-block',
        textShadow: '0px 0px 5px black'     
    }
});

