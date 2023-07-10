import React from "react";
import {
    Flex,
    Icon,
    VStack,
    Checkbox
} from '@chakra-ui/react';
import {
    FaMale,
    FaFemale,
    FaEllipsisH,
    FaSortAlphaDown,
    FaSortAlphaDownAlt
} from 'react-icons/fa';
import { ConsultParamsProps } from "../../pages/Home";

interface ParamsListPeopleProps {
    typeList: string;
    consultParams: ConsultParamsProps;
    setOpenModal(value: boolean): void;
    setConsultParams(value: ConsultParamsProps): void
};

export function ParamsList({
    typeList,
    consultParams,
    setOpenModal,
    setConsultParams
}: ParamsListPeopleProps) {

    const ComponentToPeople = () => {
        return <VStack           
            w={'56px'}           
            align={'center'}
            justify={'center'}
            spacing={5}
            ml={'0.55rem !important'}
        >
            <VStack
                w={'100%'}
                align={'center'}
                justify={'center'}
            >
                <Icon
                    as={FaMale}
                    fontSize={'35px'}
                    color={'black'}
                />
                <Checkbox 
                    borderColor={'rgba(0, 0, 0, 0.7)'}
                    background={'rgba(0, 0, 0, 0.7)'}
                    colorScheme={'rgba(0, 0, 0, 0.7)'}
                    iconColor={'white'}
                    size={'lg'}
                    isChecked={consultParams.masculineCheck}
                    onChange={() => setConsultParams({
                        ...consultParams, 
                        masculineCheck: !consultParams.masculineCheck
                    })}
                    _hover={{
                        boxShadow: '0px 0px 5px white'
                    }}
                    _active={{
                        opacity: 0.7
                    }}
                />
            </VStack>
            <VStack
                w={'100%'}
                align={'center'}
                justify={'center'}
            >
                <Icon
                    as={FaFemale}
                    fontSize={'35px'}
                    color={'black'}
                />
                <Checkbox                                     
                    borderColor={'rgba(0, 0, 0, 0.7)'}
                    background={'rgba(0, 0, 0, 0.7)'}
                    colorScheme={'rgba(0, 0, 0, 0.7)'}
                    iconColor={'white'}
                    size={'lg'}
                    isChecked={consultParams.femaleCheck}
                    onChange={() => setConsultParams({
                        ...consultParams, 
                        femaleCheck: !consultParams.femaleCheck
                    })}
                    _hover={{
                        boxShadow: '0px 0px 5px white'
                    }}
                    _active={{
                        opacity: 0.7
                    }}
                />
            </VStack>
        </VStack>
    }
    
    return <VStack
        alignItems={'flex-start'}
        justify={'flex-start'}
        height={'85%'}
        ml={'0.7rem !important'}
        spacing={5}
    >
        <Flex
            background={'rgba(0, 0, 0, 0.6)'}
            borderRadius={50}
            ml={'0.5rem !important'}
            p={3}
            border={"1px solid black"}
            boxShadow={'0px 0px 5px black'}
            cursor={'pointer'}
            onClick={() => setConsultParams({ ...consultParams, firstToLast: !consultParams.firstToLast })}
            _hover={{
                opacity: 0.7
            }}            
        >                        
            <Icon
                as={consultParams.firstToLast ? FaSortAlphaDown : FaSortAlphaDownAlt}
                fontSize={'30px'}
                color={'gray.200'}
            />
        </Flex>
        {typeList === 'people' ? <ComponentToPeople />
        : <Flex
            background={'rgba(0, 0, 0, 0.6)'}
            borderRadius={50}
            ml={'0.5rem !important'}
            p={3}
            cursor={'pointer'}
            onClick={() => setOpenModal(true)}
            _hover={{
                opacity: 0.7
            }}            
        >                        
            <Icon
                as={FaEllipsisH}
                fontSize={'30px'}
                color={'gray.200'}
            />
        </Flex>}
    </VStack>

}

export default React.memo(ParamsList);