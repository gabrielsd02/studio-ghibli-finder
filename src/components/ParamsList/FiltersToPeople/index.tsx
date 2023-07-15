import {
    FaMale,
    FaFemale
} from 'react-icons/fa';
import { Icon } from '@chakra-ui/react';

import {
    CheckboxGender,
    ContainerIconCheckbox,
    ContainerFiltersPeople   
} from './styles';
import { FiltersToPeopleProps } from './interface';

export function FiltersToPeople({
    isMobile,
    consultParams,
    setConsultParams
}: FiltersToPeopleProps) {

    return <ContainerFiltersPeople           
        isMobile={isMobile}
    >
        <ContainerIconCheckbox
            isMobile={isMobile}
        >
            <Icon
                as={FaMale}
                fontSize={'35px'}
                color={'black'}
            />
            <CheckboxGender 
                isMobile={isMobile}
                isChecked={consultParams.masculineCheck}
                onChange={() => setConsultParams({
                    ...consultParams, 
                    masculineCheck: !consultParams.masculineCheck
                })}
            />
        </ContainerIconCheckbox>
        <ContainerIconCheckbox
            isMobile={isMobile}
            marginInlineStart={isMobile ? '5px !important' : 'auto'}
        >
            <Icon
                as={FaFemale}
                fontSize={'35px'}
                color={'black'}
            />
            <CheckboxGender                                     
                isMobile={isMobile}
                isChecked={consultParams.femaleCheck}
                onChange={() => setConsultParams({
                    ...consultParams, 
                    femaleCheck: !consultParams.femaleCheck
                })}
            />
        </ContainerIconCheckbox>
    </ContainerFiltersPeople>

}