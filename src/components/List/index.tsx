import { 
    memo
} from 'react';
import {
    NavigateFunction
} from 'react-router-dom';
import { 
    Flex, 
    HStack, 
    Text,
    VStack,
    Image,
    Box,
    Tooltip
} from '@chakra-ui/react';
import {
    InfoIcon
} from '@chakra-ui/icons';

import { 
    MoviesProps, 
    PeopleProps 
} from '../../interfaces'
import { 
    TextResults,
    TextContainer
} from './styles';

interface ListProps {
    recordsList: PeopleProps[] | MoviesProps[];
    navigate?: NavigateFunction;
    type: string;
}

export function List({
    recordsList, 
    navigate,
    type
}: ListProps) {

    const records = recordsList;    
    const typeContrary = type === "people" ? 'films' : "characters";
    const isPeople = type === "people";
    
    return <>

        {records.map((record: any, index: number) => {        

            return <Flex 
                key={index}
                w={"100%"}
                minH={'180px'}
                h={200}
                backgroundColor={"rgba(0, 0, 0, 0.7)"}
                color={"white"}
                alignItems={"center"}
                justifyContent={"center"}
                borderRadius={10}
            >            
                <HStack 
                    align={"flex-start"} 
                    justify={"center"}
                    w={"100%"}
                    h={"100%"}
                    pos={"relative"}
                >
                    <Box 
                        flex={1}
                        minW={'200px'}
                        maxW={'20%'}
                        h={"100%"} 
                        alignItems={"center"} 
                        justifyContent={"center"}
                        borderRightWidth={1}
                        borderColor={"gray"} 
                        overflow={"hidden"}
                        p={'1px 0px'}
                    >
                        <Image 
                            alt={'Image'}
                            boxSize={'100%'}          
                            objectFit={'fill'}                            
                            borderTopLeftRadius={10}
                            borderBottomLeftRadius={10}
                            src={isPeople ? record[typeContrary][0].image : record.image}
                        />
                    </Box>
                    <VStack 
                        flex={1}
                        w={"60%"}
                        h={"100%"} 
                        fontFamily={"cursive"}
                        p={1}
                        align={"center"}
                        justify={"flex-start"}
                        marginInlineEnd={isPeople ? '0.5rem !important' : 0}
                    >
                        <VStack 
                            h={"80%"} 
                            w={"100%"} 
                            spacing={'-5'} 
                            align={"flex-start"} 
                            justify={"flex-start"}
                            overflow={'hidden'}
                        >
                            <HStack 
                                alignItems={"center"}
                                justifyContent={"space-between"}                    
                                w={"100%"}
                                h={"100%"}        
                                overflow={'hidden'}
                                whiteSpace={"nowrap"}
                            >
                                <TextContainer>
                                    <Text fontWeight={'bold' } textOverflow={'ellipsis'}>
                                        {isPeople ? "Name:" : "Title:"} 
                                    </Text>
                                    <TextResults>
                                        {isPeople ? record.name : record.title}
                                    </TextResults>                           
                                </TextContainer>
                                <TextContainer>
                                    <Text fontWeight={'bold'} textOverflow={'ellipsis'}>                                        
                                        {isPeople ? "Age:" : "Release Date:"}
                                    </Text> 
                                    <TextResults>
                                        {
                                            isPeople ? (
                                                (
                                                    !record.age || record.age === ""
                                                ) ? "?" : record.age
                                            ) : record.releaseDate
                                        }
                                    </TextResults>
                                </TextContainer>
                            </HStack>
                            <HStack 
                                alignItems={"center"}
                                justifyContent={"space-between"}                    
                                w={"100%"}
                                h={"100%"}      
                                overflow={'hidden'}   
                                whiteSpace={"nowrap"}                   
                            >
                                <TextContainer>
                                    <Text fontWeight={'bold' } textOverflow={'ellipsis'}>
                                        {isPeople ? "Gender:" : "Original Title:"} 
                                    </Text>
                                    <TextResults>
                                        {isPeople ? 
                                            (
                                                record.gender === "NA" ? '?' : record.gender
                                            ) : record.originalTitleRomanised
                                        }
                                    </TextResults>                           
                                </TextContainer>
                                <TextContainer>
                                    <Text fontWeight={'bold' } textOverflow={'ellipsis'}>
                                        {isPeople ? "Specie:" : "Duration:"}
                                    </Text> 
                                    <TextResults>
                                        {
                                            isPeople ? ((
                                                record.species && record.species.length > 0
                                            ) ? record.species[0].name : '?')
                                            : `${record.runningTime}min`
                                        }
                                    </TextResults>
                                </TextContainer>
                            </HStack>
                            <HStack 
                                alignItems={"center"}
                                justifyContent={"space-between"}                    
                                w={"100%"}
                                h={"100%"}   
                                overflow={'hidden'}  
                                whiteSpace={"nowrap"}                      
                            >
                                <TextContainer>
                                    <Text fontWeight={'bold' } textOverflow={'ellipsis'}>
                                        {isPeople ? "Eye Color:" : "Producer:"} 
                                    </Text>
                                    <TextResults>
                                        {isPeople ? record.eyeColor : record.producer}
                                    </TextResults>                           
                                </TextContainer>
                                <TextContainer>
                                    <Tooltip 
                                        label={'Rotten Tomatoes score'}
                                        fontSize={'16px'}
                                        textColor={'yellow.200'}
                                        bgColor={'blue.500'}
                                        hasArrow
                                        isDisabled={isPeople}
                                        placement={'top'}
                                    >
                                        <Text 
                                            fontWeight={'bold'} 
                                            textOverflow={'ellipsis'} 
                                            textDecoration={isPeople ? 'none' : 'underline'}
                                        >
                                            {isPeople ? "Hair Color:" : "RT Score:"}
                                        </Text> 
                                    </Tooltip>
                                    <TextResults>
                                        {isPeople ? record.hairColor : record.rtScore}
                                    </TextResults>
                                </TextContainer>
                            </HStack>
                        </VStack>
                        {(record[typeContrary] && record[typeContrary].length) > 0 && <HStack
                            align={"center"}
                            justify={"flex-start"}
                            wrap={"nowrap"}                            
                            maxH={"20%"}
                            w={"100%"}
                            maxW={"100%"}                          
                            flex={1}
                            borderTopWidth={1}
                            borderColor={"white"}
                            fontFamily={"cursive"}     
                            whiteSpace={"nowrap"}
                            overflow={"hidden"}
                        >           
                            <Text 
                                overflow={"hidden"} 
                                textOverflow={"ellipsis"} 
                                fontWeight={"bold"}
                            >
                                {isPeople ? "Movies:" : "Characters:"} 
                            </Text>             
                            {record[typeContrary].map((item: { title?: string; name?: string; id: string}, key: number) => {                                

                                const assistant: 'title' | 'name' = item.title ? 'title' : 'name';
                                let name = (record[typeContrary].length - 1) === key ? item[assistant] : `${item[assistant]} |`                                

                                // if is in the movie option
                                if(!isPeople) {

                                    // catch the first word
                                    name = (record[typeContrary].length - 1) === key ? name?.split(' ')[0] : `${name?.split(' ')[0]} |`;

                                }

                                return <Text
                                    key={key} 
                                    overflow={"hidden"} 
                                    textOverflow={"ellipsis"} 
                                    ml={2} 
                                    mr={2}
                                    textDecoration={isPeople ? 'underline' : 'unset'}
                                    cursor={isPeople ? 'pointer' : 'none'}
                                    onClick={() => {
                                        if(navigate && isPeople) navigate(`movie-details/${item.id}`)
                                    }}
                                >
                                    {name}
                                </Text>

                            })}
                        </HStack>}
                    </VStack>                    
                   {(!isPeople && navigate) && <Flex 
                        h={"100%"} 
                        w={"10%"}
                        alignItems={"center"} 
                        justifyContent={"center"}
                        overflow={'hidden'}
                        borderLeftWidth={1}
                        borderColor={"gray"}
                        p={5}                                               
                    >
                        <InfoIcon 
                            color={"#6060fd"} 
                            boxSize={12}
                            cursor={"pointer"}
                            onClick={() => navigate(`movie-details/${record.id}`)}
                            _hover={{ opacity: 0.5 }} 
                            _active={{ opacity: 0.3 }}
                        />
                    </Flex>}
                </HStack>
            </Flex>

        })}     

    </>

}

export default memo(List);