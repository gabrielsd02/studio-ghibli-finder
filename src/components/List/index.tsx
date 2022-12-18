import { 
    Box, 
    Flex, 
    HStack, 
    Text,
    VStack
} from '@chakra-ui/react';
import {
    InfoIcon
} from '@chakra-ui/icons';
import { 
    memo,
    useState 
} from 'react';

import { 
    MoviesProps, 
    PeopleProps 
} from '../../interfaces'

interface ListProps {
    recordsList: PeopleProps[] | MoviesProps[];
    type: string;
}

export function List({
    recordsList, 
    type
}: ListProps) {

    const records = recordsList;    
    
    return <>

        {records.map((record: any, index: number) => (
            
            <Flex 
                w={"100%"} 
                h={150}
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
                    <Flex 
                        width={"25%"} 
                        h={"100%"} 
                        alignItems={"center"} 
                        justifyContent={"center"}
                        borderRightWidth={1}
                        borderColor={"gray"}                        
                    >
                        {record.id}
                    </Flex>
                    <VStack 
                        flex={1}
                        maxW={"60%"}
                        h={"100%"} 
                        fontFamily={"cursive"}
                        p={1}
                        align={"center"}
                        justify={"flex-start"}
                    >
                        <VStack h={"80%"} w={"100%"} spacing={'-5'} align={"flex-start"} justify={"flex-start"}>
                            <HStack 
                                alignItems={"center"}
                                justifyContent={"space-between"}                    
                                w={"100%"}
                                h={"100%"}                            
                            >
                                <Text display={"flex"}>
                                    <Text fontWeight={'bold' }>
                                        Name: 
                                    </Text>
                                    <Text ml={2}>
                                        {record.name}
                                    </Text>                           
                                </Text>
                                <Text display={"flex"}>
                                <Text fontWeight={'bold' }>
                                        Age:
                                    </Text> 
                                    <Text ml={2}>
                                        {!record.age || record.age === "" ? "?" : record.age}
                                    </Text>
                                </Text>
                            </HStack>
                            <HStack 
                                alignItems={"center"}
                                justifyContent={"space-between"}                    
                                w={"100%"}
                                h={"100%"}                            
                            >
                                <Text display={"flex"}>
                                    <Text fontWeight={'bold' }>
                                        Gender: 
                                    </Text>
                                    <Text ml={2}>
                                        {record.gender === "NA" ? '?' : record.gender}
                                    </Text>                           
                                </Text>
                                <Text display={"flex"}>
                                <Text fontWeight={'bold' }>
                                        Hair Color:
                                    </Text> 
                                    <Text ml={2}>
                                        {record.hairColor}
                                    </Text>
                                </Text>
                            </HStack>
                            <HStack 
                                alignItems={"center"}
                                justifyContent={"space-between"}                    
                                w={"100%"}
                                h={"100%"}                            
                            >
                                <Text display={"flex"}>
                                    <Text fontWeight={'bold' }>
                                        Eye Color: 
                                    </Text>
                                    <Text ml={2}>
                                        {record.eyeColor}
                                    </Text>                           
                                </Text>
                                <Text display={"flex"}>
                                <Text fontWeight={'bold' }>
                                        Hair Color:
                                    </Text> 
                                    <Text ml={2}>
                                        {record.hairColor}
                                    </Text>
                                </Text>
                            </HStack>
                        </VStack>
                        {record.films.length > 0 && <HStack
                            align={"center"}
                            justify={"flex-start"}
                            wrap={"nowrap"}                            
                            maxH={"20%"}
                            w={"100%"}
                            maxW={"100%"}                          
                            flex={1}          
                            p={2}
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
                                Films: 
                            </Text>             
                            {record.films.map((record: MoviesProps) => {

                                return <Text 
                                    overflow={"hidden"} 
                                    textOverflow={"ellipsis"} 
                                    ml={2} 
                                    mr={2}
                                >
                                    {record.title}
                                </Text>

                            })}
                        </HStack>}
                    </VStack>                    
                    <Flex 
                        h={"100%"} 
                        maxW={"20%"}
                        alignItems={"center"} 
                        justifyContent={"center"}
                        borderLeftWidth={1}
                        borderColor={"gray"}
                        p={5}                                               
                    >
                        <InfoIcon 
                            color={"#6060fd"} 
                            boxSize={12}
                            cursor={"pointer"}
                            _hover={{ opacity: 0.5 }} 
                            _active={{ opacity: 0.3 }}
                        />
                    </Flex>
                </HStack>
            </Flex>

        ))}     

    </>

}

export default memo(List);