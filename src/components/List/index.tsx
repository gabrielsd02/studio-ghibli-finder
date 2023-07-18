import { 
    Flex, 
    HStack, 
    Image,
    Box,
    Icon,
    Button
} from '@chakra-ui/react';
import { memo } from 'react';
import { FaInfo } from 'react-icons/fa';

import { ItemCharacterList } from '../ItemCharacterList';
import { ItemMovieList } from '../ItemMovieList';
import { ListProps } from './interface';
import {
    ImageItem,
    ContainerList,
    ContainerImage,
    ButtonInfoMovie,
    ContainerItemList
} from './styles'

export function List({
    recordsList, 
    isMobile = false,
    navigate,
    type
}: ListProps) {

    const records = recordsList;    
    const typeContrary = type === "people" ? 'films' : "characters";
    const isPeople = type === "people";
    
    return <>
        {records.map((record: any, index: number) => (                 
            <ContainerList isMobile={isMobile}>            
                <ContainerItemList>
                    <ContainerImage isMobile={isMobile}>
                        <ImageItem                             
                            src={isPeople ? record[typeContrary][0].image : record.image}
                            onClick={() => {
                                if(!isPeople) window.open(record.image);
                            }}
                            isPeople={isPeople}
                        />
                    </ContainerImage>
                    {isPeople ? <ItemCharacterList 
                        age={record.age}
                        eyeColor={record.eyeColor}
                        gender={record.gender}
                        hairColor={record.hairColor}
                        name={record.name}
                        movies={record[typeContrary]}
                        species={record.species}
                        navigate={navigate}
                        isMobile={isMobile}
                        key={index}
                    /> : <ItemMovieList 
                        id={record.id}
                        isMobile={isMobile}
                        title={record.title}
                        rtScore={record.rtScore}
                        navigate={navigate}
                        key={index}
                        description={record.description}
                        releaseDate={record.releaseDate}
                        runningTime={record.runningTime}
                        characters={record.characters}
                    />}               
                    {(!isPeople && navigate && !isMobile) && <ButtonInfoMovie                     
                        onClick={() => navigate(`movie-details/${record.id}`)}   
                    >
                        <Icon 
                            as={FaInfo}
                            color={'black'}
                            fontSize={'50px'}
                        />
                    </ButtonInfoMovie>}
                </ContainerItemList>
            </ContainerList>
        ))}     
    </>

}

export default memo(List);