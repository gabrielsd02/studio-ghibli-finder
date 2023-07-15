import React from "react";
import {
    Flex,
    Icon,
    VStack,
    Checkbox,
    Stack,
    Button
} from '@chakra-ui/react';
import {
    FaMale,
    FaFemale,
    FaEllipsisH,
    FaSortAlphaDown,
    FaSortAlphaDownAlt
} from 'react-icons/fa';

import {
    ContainerParams,
    ButtonFilter
} from './styles';
import { FiltersToPeople } from './FiltersToPeople'
import { ParamsListPeopleProps } from './interfaces';

export function ParamsList({
    isMobile = false,
    typeList,
    consultParams,
    setOpenModal,
    setConsultParams
}: ParamsListPeopleProps) {
    
    return <ContainerParams
        isMobile={isMobile}
    >
        <ButtonFilter
            onClick={() => setConsultParams({ 
                ...consultParams, 
                firstToLast: !consultParams.firstToLast 
            })}
            isMobile={isMobile}     
        >                        
            <Icon
                as={consultParams.firstToLast ? FaSortAlphaDown : FaSortAlphaDownAlt}
                fontSize={isMobile ? '20px' : '30px'}
                color={'gray.200'}
            />
        </ButtonFilter>
        {typeList === 'people' ? <FiltersToPeople 
            isMobile={isMobile}
            consultParams={consultParams}
            setConsultParams={setConsultParams}
        />
        : <ButtonFilter
            isMobile={isMobile}
            onClick={() => setOpenModal(true)}        
        >                        
            <Icon
                as={FaEllipsisH}
                fontSize={isMobile ? '20px' : '30px'}
                color={'gray.200'}
            />
        </ButtonFilter>}
    </ContainerParams>

}

export default React.memo(ParamsList);