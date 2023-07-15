import React from "react";
import {
    Text,
    Flex,
    Tooltip
} from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';

import { ItemMovieListProps } from './interface';
import { 
    Title,
    Label,
    TextValue,
    CharacterName,
    TextDescription,
    ContainerCharacters,
    ContainerLabelValue,
    ContainerDescription,
    BoxTitleInformations,
    ContainerInformations, 
    ContainerTitleInformations,
    ContainerInformationsMovie
} from './styles';

export function ItemMovieList({
    navigate,
    isMobile = false,
    title,
    id,
    characters,
    runningTime,
    description,
    releaseDate,
    rtScore
}: ItemMovieListProps) {
    
    return <ContainerInformations 
        onClick={() => {
            if(!isMobile) return;
            if(navigate) navigate(`movie-details/${id}`);
        }}
        isMobile={isMobile}
    >
        <BoxTitleInformations isMobile={isMobile}>
            <ContainerTitleInformations>
                <Title isMobile={isMobile}>
                    {title}
                </Title>
                <ContainerInformationsMovie isMobile={isMobile}>
                    <ContainerLabelValue>
                        <Label isTruncated>
                            Duration:
                        </Label> 
                        <TextValue isTruncated> 
                            {runningTime}min                                
                        </TextValue>
                    </ContainerLabelValue>
                    <ContainerLabelValue>
                        <Label isTruncated>
                            Release Date:
                        </Label> 
                        <TextValue isTruncated>
                            {releaseDate}
                        </TextValue>
                    </ContainerLabelValue>
                    <ContainerLabelValue>
                        <Tooltip 
                            label={'Rotten Tomatoes score'}
                            fontSize={'16px'}
                            textColor={'yellow.200'}
                            bgColor={'blue.500'}
                            hasArrow
                            placement={'top'}
                        >
                            <Label 
                                textDecoration={'underline'}
                                isTruncated
                            >
                                RT Score:
                            </Label>                             
                        </Tooltip>  
                        <Flex
                            align={'center'}
                            justify={'center'}
                        >                                
                            <TextValue isTruncated>
                                {rtScore}                                        
                            </TextValue>    
                            <StarIcon
                                color={'yellow'}
                                fontSize={'md'}
                                ml={1}
                                mt={'-1.1px'}
                            />
                        </Flex>                   
                    </ContainerLabelValue>                            
                </ContainerInformationsMovie>
            </ContainerTitleInformations>                   
        </BoxTitleInformations>
        <ContainerDescription isMobile={isMobile}>
            <TextDescription
                noOfLines={isMobile ? 3 : (characters && characters?.length > 0) ? 2 : 3}
            >
                {description}
            </TextDescription>
        </ContainerDescription>
        {(characters && characters.length > 0 && !isMobile) && <ContainerCharacters>           
            <Label>
                Characters: 
            </Label>   
            {characters.map((item, key: number) => {

                const assistant = 'name';
                let name = (characters.length - 1 === key) ? item[assistant] : `${item[assistant]} |`;

                // catch the first word
                name = (characters.length - 1 === key) ? name?.split(' ')[0] : `${name?.split(' ')[0]} |`;                    

                return <CharacterName
                    key={key} 
                >
                    {name}
                </CharacterName>

            })}
        </ContainerCharacters>}
    </ContainerInformations>     
    
}

export default React.memo(ItemMovieList);