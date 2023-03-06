import React from 'react';
import { 
    VStack,
    Text,
    Flex,
    HStack,
    Divider,
    Tooltip
} from '@chakra-ui/react';
import { NavigateFunction } from 'react-router-dom';

import { 
    TextContainer, 
    TextResults 
} from '../List/styles';
import { 
    MoviesProps, 
    SpeciesProps 
} from '../../interfaces';

interface ItemCharacterListProps {
    name: string;
    age: string | null;
    gender: string;
    species: SpeciesProps[];
    eyeColor: string;
    hairColor: string;
    movies: MoviesProps[];
    navigate?: NavigateFunction
}

export function ItemCharacterList({
    name,
    age,
    gender,
    species,
    eyeColor,
    hairColor,
    movies,
    navigate
}: ItemCharacterListProps) {

    const verifyColor = (strColor: string) => {

        let strColorDownCase = strColor.toLowerCase();

        const matches = strColorDownCase.match(/[\w\d\’\'-]+/gi);

        switch(strColorDownCase) {
            case 'emerald':
                strColorDownCase = '#50C878';    
                break;
            case 'hazel':
                strColorDownCase = '#594c26';
                break;
            case 'peach':
                strColorDownCase = '#FFE5B4';
                break;
            case 'blonde':
                strColorDownCase = '#FBF6D9';
                break;
            case 'blue':
                strColorDownCase = '#4299e1';
                break;
        }

        if(matches && matches?.length > 1) {

            strColorDownCase = matches[0] + '-' + matches[matches.length - 1];

            switch(strColorDownCase) {
                case 'dark-brown':
                    strColorDownCase = '#654321';
                    break;
                case 'light-brown':
                    strColorDownCase = '#C4A484';
                    break;
                case 'reddish-brown':
                    strColorDownCase = '#FF5733';
                    break;
                case 'light-gray':
                    strColorDownCase = '#D3D3D3';
                    break;
                case 'light-orange':
                    strColorDownCase = '#FED8B1';
                    break;
                case 'dirty-blond':
                    strColorDownCase = '#dfc393';
                    break;
            }

        }        
        
        const s = new Option().style;        
        s.color = strColorDownCase;        
        return s.color !== '' ? strColorDownCase : 'white';

    }    
    
    return <VStack 
        flex={1}
        p={'0px 10px'}
        w={"60%"}
        h={"100%"} 
        fontFamily={"cursive"}
        align={"center"}
        justify={"flex-start"}
        marginInlineEnd={'0.5rem !important'}
    >
        <VStack 
            h={"100%"} 
            w={"100%"} 
            align={"flex-start"} 
            justify={"flex-start"}
            overflow={'hidden'}
        >
            <VStack
                w={'100%'}
                h={'60%'}
                align={'center'}
                justify={'center'}
                borderBottomWidth={1}
                borderColor={"white"}
                fontFamily={"cursive"}     
                whiteSpace={"nowrap"}
                overflow={"hidden"}
                spacing={'0px'}
            >
                <Text
                    fontSize={'3xl'}
                    textOverflow={'ellipsis'}
                    fontWeight={'bold'}
                    textShadow={'0px 0px 5px black'}
                >
                    {name}
                </Text>
                <Flex
                    align={'center'}
                    justify={'center'}
                    fontSize={'lg'}
                >
                    <Text 
                        overflow={"hidden"} 
                        textOverflow={"ellipsis"} 
                        fontWeight={"bold"}
                    >
                        Movie(s):
                    </Text>             
                    {movies.map((item, key: number) => {     
                        
                        const title = (movies.length - 1) === key ? item.title : `${item.title} |`;

                        return <Text
                            key={key} 
                            overflow={"hidden"} 
                            textOverflow={"ellipsis"} 
                            ml={2}
                            pt={'3px'}                            
                            textDecoration={'underline'}
                            fontFamily={"emoji"}
                            cursor={'pointer'}
                            onClick={() => {
                                if(navigate) navigate(`movie-details/${item.id}`)
                            }}
                        >
                            {title}
                        </Text>

                    })}
                </Flex>
            </VStack>
            <HStack
                w={'100%'}
                h={'40%'}
                justify={'space-between'}
                align={'center'}
                fontSize={'xl'}
                divider={<Divider orientation='vertical' borderWidth={'1px'} />}
            >
                <TextContainer
                    w={'auto'}
                    minW={'100px'}
                >
                    <Text 
                        fontWeight={'bold'} 
                        textOverflow={'ellipsis'}
                    >                                        
                        Age
                    </Text> 
                    <Tooltip
                        label={
                            (!age || age === "" || age === 'NA') ? 
                            "?" : 
                            age
                        }
                        fontSize={"md"}
                        hasArrow
                        placement='top'
                    >
                        <TextResults>
                            {                   
                                (
                                    !age || 
                                    age === "" || 
                                    age === 'NA' ||
                                    age === 'Unknown'
                                ) ? 
                                "?" : 
                                age                    
                            }
                        </TextResults>
                    </Tooltip>
                </TextContainer>
                <TextContainer>
                    <Text 
                        fontWeight={'bold'} 
                        textOverflow={'ellipsis'}
                    >
                        Gender
                    </Text>
                    <TextResults 
                        color={
                            gender === 'Male' 
                            ? 'blue.400' 
                            : (
                                gender === 'Female' ? 
                                'pink.400' : 
                                'white'
                            )
                        }
                        fontWeight={'bold'}
                    >                        
                        {gender === "NA" ? '?' : gender}
                    </TextResults>                           
                </TextContainer>
                <TextContainer>
                    <Text 
                        fontWeight={'bold'} 
                        textOverflow={'ellipsis'}
                    >
                        Specie
                    </Text> 
                    <TextResults>
                        {
                            species && species.length > 0 ? 
                            species[0].name : 
                            '?'
                        }
                    </TextResults>
                </TextContainer>
                <TextContainer>
                    <Text 
                        fontWeight={'bold'} 
                        textOverflow={'ellipsis'}
                    >
                        Eye Color 
                    </Text>
                    <TextResults 
                        color={verifyColor(eyeColor)}
                        fontWeight={'bold'}
                        textShadow={eyeColor === 'Black' ? '0px 0px 1px black' : '0px 0px 5px black'}
                    >
                        {eyeColor ?? ''}
                    </TextResults>                           
                </TextContainer>
                <TextContainer>
                    <Text 
                        fontWeight={'bold !important'} 
                        textOverflow={'ellipsis'} 
                        textDecoration={'none'}
                    >
                        Hair Color
                    </Text>
                    <TextResults 
                        color={verifyColor(hairColor)}
                        fontWeight={'bold'}
                        textShadow={hairColor === 'Black' ? '0px 0px 1px black' : '0px 0px 5px black'}
                    >
                        {hairColor ?? ''}
                    </TextResults>
                </TextContainer>
            </HStack>
        </VStack>
    </VStack>   

}

export default React.memo(ItemCharacterList);