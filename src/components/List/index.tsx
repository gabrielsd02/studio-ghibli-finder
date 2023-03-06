import { 
    memo
} from 'react';
import {
    NavigateFunction
} from 'react-router-dom';
import { 
    Flex, 
    HStack, 
    Image,
    Box,
    Icon
} from '@chakra-ui/react';
import { FaInfo } from 'react-icons/fa';

import { 
    MoviesProps, 
    PeopleProps 
} from '../../interfaces'
import { ItemCharacterList } from '../ItemCharacterList';
import { ItemMovieList } from '../ItemMovieList';

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
                        minW={'auto'}
                        h={"100%"} 
                        alignItems={"center"} 
                        justifyContent={"center"}
                        borderRightWidth={1}
                        borderColor={"gray"} 
                        overflow={"hidden"}
                    >
                        <Image 
                            alt={'Image'}
                            margin={'auto'}
                            boxSize={'100%'}          
                            objectFit={'contain'}                            
                            borderTopLeftRadius={10}
                            borderBottomLeftRadius={10}
                            src={isPeople ? record[typeContrary][0].image : record.image}
                            cursor={!isPeople ? 'pointer' : 'normal'}
                            onClick={() => {
                                if(!isPeople) window.open(record.image);
                            }}
                            _hover={{
                                opacity: !isPeople ? 0.3 : 1
                            }}                                                        
                        />
                    </Box>
                    {isPeople ? <ItemCharacterList 
                        age={record.age}
                        eyeColor={record.eyeColor}
                        gender={record.gender}
                        hairColor={record.hairColor}
                        name={record.name}
                        movies={record[typeContrary]}
                        species={record.species}
                        navigate={navigate}
                        key={index}
                    /> : <ItemMovieList 
                        title={record.title}
                        rtScore={record.rtScore}
                        key={index}
                        description={record.description}
                        releaseDate={record.releaseDate}
                        runningTime={record.runningTime}
                        characters={record.characters}
                    />}               
                   {(!isPeople && navigate) && <Flex 
                        h={"100%"} 
                        w={"10%"}
                        background={"#1869bdde"}
                        alignItems={"center"} 
                        justifyContent={"center"}
                        overflow={'hidden'}
                        borderLeftWidth={1}
                        borderTopRightRadius={10}
                        borderBottomRightRadius={10}
                        borderColor={"gray"}
                        p={5}               
                        cursor={"pointer"}
                        onClick={() => navigate(`movie-details/${record.id}`)}
                        _hover={{ opacity: 0.5 }} 
                        _active={{ opacity: 0.3 }}                                
                    >
                        <Icon 
                            as={FaInfo}
                            color={'black'}
                            fontSize={'50px'}
                        />
                    </Flex>}
                </HStack>
            </Flex>

        })}     

    </>

}

export default memo(List);