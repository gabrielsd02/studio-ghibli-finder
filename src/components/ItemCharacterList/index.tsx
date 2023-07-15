import React from 'react';
import { 
    Text,
    Tooltip
} from '@chakra-ui/react';

import { 
    MovieTextName,
    ContainerMovies,
    ContainerTitle,
    ContainerTitleInfo,
    ContainerInformations,
    ContainerCharacter,
    TextContainer, 
    LabelInformation,
    TextResults,
    TitleName
} from './styles';
import { ItemCharacterListProps } from './interface';

export function ItemCharacterList({
    isMobile = false,
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
    
    return <ContainerCharacter>
        <ContainerTitleInfo>
            <ContainerTitle
                isMobile={isMobile}
            >
                <Tooltip
                    label={name}
                    fontSize={"md"}
                    hasArrow
                    placement='top'
                >
                    <TitleName isTruncated>
                        {name}
                    </TitleName>
                </Tooltip>
                <ContainerMovies>
                    <Text 
                        fontWeight={"bold"}
                    >
                        Movie:
                    </Text>             
                    {movies.map((item, key: number) => {     
                        
                        const title = (movies.length - 1) === key ? item.title : `${item.title} |`;

                        return <MovieTextName
                            key={key} 
                            isMobile={isMobile}
                            onClick={() => {
                                if(navigate) navigate(`movie-details/${item.id}`)
                            }}
                        >
                            {title}
                        </MovieTextName>

                    })}
                </ContainerMovies>
            </ContainerTitle>
            <ContainerInformations isMobile={isMobile}>
                <TextContainer isMobile={isMobile}>
                    <LabelInformation isMobile={isMobile}>                                        
                        Age
                    </LabelInformation> 
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
                        <TextResults isMobile={isMobile}>
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
                <TextContainer isMobile={isMobile}>
                    <LabelInformation isMobile={isMobile}>
                        Gender
                    </LabelInformation>
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
                        isMobile={isMobile}
                    >                        
                        {gender === "NA" ? '?' : gender}
                    </TextResults>                           
                </TextContainer>
                <TextContainer isMobile={isMobile}>
                    <LabelInformation isMobile={isMobile}>
                        Specie
                    </LabelInformation> 
                    <TextResults 
                        isMobile={isMobile}
                    >
                        {
                            species && species.length > 0 ? 
                            species[0].name : 
                            '?'
                        }
                    </TextResults>
                </TextContainer>
                <TextContainer isMobile={isMobile}>
                    <LabelInformation isMobile={isMobile}>
                        Eye Color 
                    </LabelInformation>
                    <TextResults 
                        color={verifyColor(eyeColor)}
                        fontWeight={'bold'}
                        textShadow={'-1px 1px 1px gray'}
                        isMobile={isMobile}
                    >
                        {eyeColor ?? ''}
                    </TextResults>                           
                </TextContainer>
                <TextContainer isMobile={isMobile}>
                    <LabelInformation isMobile={isMobile}>
                        Hair Color
                    </LabelInformation>
                    <TextResults 
                        color={verifyColor(hairColor)}
                        fontWeight={'bold'}
                        textShadow={'-1px 1px 1px gray'}
                        isMobile={isMobile}
                    >
                        {hairColor ?? ''}
                    </TextResults>
                </TextContainer>
            </ContainerInformations>
        </ContainerTitleInfo>
    </ContainerCharacter>   

}

export default React.memo(ItemCharacterList);