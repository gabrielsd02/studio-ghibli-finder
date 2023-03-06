import React from "react";
import {
    VStack,
    Text,
    Flex,
    HStack,
    Tooltip,
    Divider
} from '@chakra-ui/react';
import {
    StarIcon
} from '@chakra-ui/icons';

import { PeopleProps } from "../../interfaces";

interface ItemMovieListProps {
    title: string;
    runningTime: string;
    rtScore: string;
    description: string;
    releaseDate: string;
    characters: PeopleProps[] | null;
}

export function ItemMovieList({
    title,
    characters,
    runningTime,
    description,
    releaseDate,
    rtScore
}: ItemMovieListProps) {

    return <VStack 
        flex={1}
        w={"60%"}
        h={"100%"} 
        fontFamily={"cursive"}
        p={1}
        align={"center"}
        justify={"flex-start"}
        marginInlineEnd={0}
        divider={<Divider 
            orientation="horizontal" 
            borderWidth={1.5} 
            borderColor={'white'} 
        />}
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
                align={'center'}
                justify={'center'}
                padding={'30px 0px'}
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
                    {title}
                </Text>
                <HStack
                    align={'center'}
                    justify={'center'}
                    fontSize={'sm'}                        
                    divider={<Divider orientation="vertical" borderWidth={1} />}
                >
                    <Flex
                        align={'center'}
                        justify={'center'}
                    >
                        <Text 
                            overflow={"hidden"} 
                            textOverflow={"ellipsis"} 
                            fontWeight={"bold"}
                        >
                            Duration:
                        </Text> 
                        <Text
                            overflow={"hidden"} 
                            textOverflow={"ellipsis"} 
                            fontFamily={"cursive"}
                            fontWeight={'100'}
                            ml={2}                      
                        >
                            {runningTime}min                                
                        </Text>
                    </Flex>
                    <Flex
                        align={'center'}
                        justify={'center'}
                    >
                        <Text 
                            overflow={"hidden"} 
                            textOverflow={"ellipsis"} 
                            fontWeight={"bold"}
                        >
                            Release Date:
                        </Text> 
                        <Text
                            overflow={"hidden"} 
                            textOverflow={"ellipsis"} 
                            fontFamily={"cursive"}
                            fontWeight={'100'}
                            ml={2}                      
                        >
                            {releaseDate}
                        </Text>
                    </Flex>
                    <Flex
                        align={'center'}
                        justify={'center'}
                    >
                        <Tooltip 
                            label={'Rotten Tomatoes score'}
                            fontSize={'16px'}
                            textColor={'yellow.200'}
                            bgColor={'blue.500'}
                            hasArrow
                            placement={'top'}
                        >
                            <Text 
                                overflow={"hidden"} 
                                textOverflow={"ellipsis"} 
                                fontWeight={"bold"}
                                textDecoration={'underline'}
                            >
                                RT Score:
                            </Text>                             
                        </Tooltip>  
                        <Flex
                            align={'center'}
                            justify={'center'}
                        >                                
                            <Text 
                                overflow={"hidden"} 
                                textOverflow={"ellipsis"} 
                                ml={2}
                                fontFamily={"cursive"}
                                fontWeight={'100'}
                            >
                                {rtScore}                                        
                            </Text>    
                            <StarIcon
                                color={'yellow'}
                                fontSize={'md'}
                                ml={1}
                                mb={0.3}
                            />
                        </Flex>                   
                    </Flex>                            
                </HStack>
            </VStack>                   
        </VStack>
        <Flex
            align={'center'}
            justifyContent={'flex-start'}
            w={'100%'}
            h={'150px'}            
            overflow={'hidden'}
        >
            <Text
                textAlign={'left'}
                textOverflow={'ellipsis'}
                noOfLines={(characters && characters?.length > 0) ? 2 : 3}
                fontFamily={'system-ui'}
                fontSize={'lg'}
                textShadow={'3px 2px black'}
            >
                {description}
            </Text>
        </Flex>
        {(characters && characters.length > 0) && <HStack
            align={"center"}
            justify={"flex-start"}
            wrap={"nowrap"}                            
            maxH={"20%"}
            w={"100%"}
            h={'30px'}
            maxW={"100%"}                          
            flex={1}
            fontFamily={"emoji"}     
            whiteSpace={"nowrap"}
        >           
            <Text 
                overflow={"hidden"} 
                fontFamily={'cursive'}
                textOverflow={"ellipsis"} 
                fontWeight={"bold"}
            >
                Characters: 
            </Text>   
            {characters.map((item, key: number) => {

                const assistant = 'name';
                let name = (characters.length - 1 === key) ? item[assistant] : `${item[assistant]} |`;

                // catch the first word
                name = (characters.length - 1 === key) ? name?.split(' ')[0] : `${name?.split(' ')[0]} |`;                    

                return <Text
                    key={key} 
                    overflow={"hidden"} 
                    textOverflow={"ellipsis"} 
                    ml={2} 
                    mr={2}
                >
                    {name}
                </Text>

            })}
        </HStack>}
    </VStack>     
    
}

export default React.memo(ItemMovieList);