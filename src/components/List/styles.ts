import { chakra, Text } from '@chakra-ui/react';

export const TextContainer = chakra(Text, {
    baseStyle: {
        textOverflow: 'ellipsis', 
        overflow: 'hidden',
        display: 'flex'        
    }
})

export const TextResults = chakra(Text, {
    baseStyle: {
        ml: 2,
        overflow: 'hidden',
        textOverflow: 'ellipsis'
    }
});

