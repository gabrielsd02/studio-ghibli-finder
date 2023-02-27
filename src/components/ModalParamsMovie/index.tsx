import React, {
    useState, 
    useEffect,
    useCallback 
} from 'react';
import { 
    Modal, 
    Button,
    ModalBody,
    ModalHeader,
    ModalFooter,
    ModalOverlay,
    ModalContent,
    ModalCloseButton,
    Checkbox,
    Text,
    NumberInput,
    NumberInputField,
    HStack,
    VStack,
    Flex
} from '@chakra-ui/react';
import { ConsultParamsProps } from '../../pages/Home';

interface ModalParamsMovieProps {
    consultParams: ConsultParamsProps;
    setOpenModal(value: boolean): void;
    consultMovies(value?: null | ConsultParamsProps): Promise<void>;
    setConsultParams(value: ConsultParamsProps): void
}

export function ModalParamsMovie({
    consultParams,
    setOpenModal,
    consultMovies,
    setConsultParams
}: ModalParamsMovieProps) {

    const paramsStandard = {
        order: 'alphabetically',
        firstToLast: true,
        masculineCheck: true,
        femaleCheck: true,
        durationMovie: null,
        scoreMovie: null,
        yearMovieRelease: null,
        fromDurationMovie: false,
        fromScoreMovie: false,
        fromYearMovieRelease: false
    };

    const [paramsToChange, setParamsToChange] = useState(consultParams);
    
    const [optionActive, setOptionActive] = useState("");

    const handleCloseModal = useCallback(() => {
        setOptionActive('');
        setOpenModal(false);
    }, []);

    const handleSaveModal = () => {
        
        if(optionActive === "") {
            
            setConsultParams(paramsStandard);            
            consultMovies(paramsStandard);

        } else {
            
            setConsultParams(Object.assign(consultParams, paramsToChange));
            consultMovies(Object.assign(consultParams, paramsToChange));

        }        
        
        handleCloseModal();

    };

    useEffect(() => {

        if(
            paramsToChange.yearMovieRelease && 
            paramsToChange.yearMovieRelease.length > 0
        ) {
            setOptionActive('year');
            setParamsToChange({
                ...paramsToChange,
                durationMovie: null,
                scoreMovie: null,
                fromDurationMovie: false,
                fromScoreMovie: false
            });
        } else if(
            paramsToChange.durationMovie && 
            paramsToChange.durationMovie.length > 0
        ) {
            setOptionActive('duration');
            setParamsToChange({
                ...paramsToChange,
                yearMovieRelease: null,
                scoreMovie: null,
                fromScoreMovie: false,
                fromYearMovieRelease: false
            });
        } else if(
            paramsToChange.scoreMovie &&
            paramsToChange.scoreMovie.length > 0
        ) {
            setOptionActive('score');
            setParamsToChange({
                ...paramsToChange,
                yearMovieRelease: null,
                durationMovie: null,
                fromDurationMovie: false,
                fromYearMovieRelease: false
            });
        } else {
            setOptionActive('');
        }        

    }, [paramsToChange]);
    
    return <Modal 
        isOpen 
        isCentered
        size={'xl'}        
        onClose={handleCloseModal} 
    >
        <ModalOverlay />
        <ModalContent 
            color={'white'}
            background={'#1ca1d1'}
        >
            <ModalHeader
                p={5}
            >
                More Options for Movies Listing
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody 
                pl={5}
                pr={5}
            >
                <VStack
                    w={'100%'}
                    h={'100%'}
                    spacing={'10px'}
                >
                    <HStack
                        w={'100%'}
                        color={'white'}
                        opacity={optionActive === 'year' || optionActive === '' ? 1 : 0.5}
                        align={'center'}
                        justify={'space-between'}                        
                    >
                        <Flex
                            w={'100%'}
                            justify={'flex-start'}
                            align={'center'}
                        >
                            <Text>Enter the year the movie was released: </Text>
                            <NumberInput
                                variant='flushed'
                                focusBorderColor={"black"}   
                                value={paramsToChange.yearMovieRelease || ''}                              
                            >
                                <NumberInputField
                                    h={'auto'}                            
                                    textOverflow={'ellipsis'}         
                                    overflow={'hidden'}    
                                    textAlign={'center'}
                                    pl={1}
                                    pr={1}
                                    ml={2}
                                    color={"white"}
                                    borderColor={"black"}                            
                                    autoComplete={"off"}      
                                    maxLength={4} 
                                    w={'70px'}                                                            
                                    disabled={optionActive !== 'year' && optionActive !== ''}
                                    onChange={(e) => {
                                        
                                        let yearMovie: null | string = e.target.value;

                                        if(yearMovie === "") {
                                            yearMovie = null;
                                        }

                                        setParamsToChange({
                                            ...paramsToChange,
                                            yearMovieRelease: yearMovie
                                        });

                                    }}
                                />
                            </NumberInput>
                        </Flex>
                        {
                            (
                                paramsToChange.yearMovieRelease && 
                                paramsToChange.yearMovieRelease.length === 4
                            ) && <Checkbox 
                                borderColor={'rgba(0, 0, 0, 0.7)'}
                                colorScheme={'rgba(0, 0, 0, 0.7)'}
                                iconColor={'white'}
                                isChecked={paramsToChange.fromYearMovieRelease}
                                pt={'2px'}
                                w={'200px'}
                                onChange={() => setParamsToChange({
                                    ...paramsToChange, 
                                    fromYearMovieRelease: !paramsToChange.fromYearMovieRelease
                                })}
                                _active={{
                                    opacity: 0.7
                                }}
                            >
                                From this year?
                            </Checkbox>
                        }
                    </HStack>
                    <HStack
                        w={'100%'}
                        opacity={optionActive === 'duration' || optionActive === '' ? 1 : 0.5}
                        align={'center'}
                        justify={'space-between'}
                    >
                        <Flex
                            w={'100%'}
                            justify={'flex-start'}
                            align={'center'}
                        >
                            <Text>Enter the duration of movie: </Text>
                            <NumberInput
                                variant='flushed'
                                focusBorderColor={"black"}
                                textAlign={'center'}
                                value={paramsToChange.durationMovie || ''}   
                            >
                                <NumberInputField
                                    h={'auto'}
                                    pl={1}
                                    pr={1}
                                    ml={2}
                                    textAlign={'center'}
                                    textOverflow={'ellipsis'}         
                                    overflow={'hidden'}  
                                    color={"white"}
                                    borderColor={"black"}                                                          
                                    autoComplete={"off"}      
                                    maxLength={3} 
                                    disabled={optionActive !== 'duration' && optionActive !== ''}
                                    w={'70px'}
                                    onChange={(e) => {
                                        
                                        let durationMovie: null | string = e.target.value;

                                        if(durationMovie === "") {
                                            durationMovie = null;
                                        }

                                        setParamsToChange({
                                            ...paramsToChange,
                                            durationMovie
                                        });

                                    }}
                                />
                            </NumberInput>
                            <Text ml={2}>minutes</Text>
                        </Flex>
                        {
                            (
                                paramsToChange.durationMovie && 
                                paramsToChange.durationMovie.length > 0
                            ) && <Checkbox 
                                w={'250px'}
                                pt={'2px'}
                                borderColor={'rgba(0, 0, 0, 0.7)'}
                                colorScheme={'rgba(0, 0, 0, 0.7)'}
                                iconColor={'white'}
                                isChecked={paramsToChange.fromDurationMovie}
                                onChange={() => setParamsToChange({
                                    ...paramsToChange, 
                                    fromDurationMovie: !paramsToChange.fromDurationMovie
                                })}
                                _active={{
                                    opacity: 0.7
                                }}
                            >
                                From this duration?
                            </Checkbox>
                        }
                    </HStack>
                    <HStack
                        w={'100%'}                        
                        align={'center'}
                        opacity={optionActive === 'score' || optionActive === '' ? 1 : 0.5}
                        justify={'space-between'}
                    >
                        <Flex
                            w={'100%'}
                            justify={'flex-start'}
                            align={'center'}
                        >
                            <Text>Enter the score of movie: </Text>
                            <NumberInput
                                variant='flushed'
                                focusBorderColor={"black"}
                                textAlign={'center'}
                                value={paramsToChange.scoreMovie || ''}     
                            >
                                <NumberInputField
                                    h={'auto'}
                                    pl={1}
                                    pr={1}
                                    ml={2}
                                    textAlign={'center'}
                                    textOverflow={'ellipsis'}         
                                    overflow={'hidden'}  
                                    color={"white"}
                                    borderColor={"black"}
                                    disabled={optionActive !== 'score' && optionActive !== ''}                                                        
                                    autoComplete={"off"}      
                                    maxLength={3} 
                                    w={'70px'}
                                    onChange={(e) => {
                                        
                                        let scoreMovie: null | string = e.target.value;

                                        if(scoreMovie === "") {
                                            scoreMovie = null;
                                        }

                                        setParamsToChange({
                                            ...paramsToChange,
                                            scoreMovie
                                        });

                                    }}
                                />
                            </NumberInput>
                        </Flex>
                        {
                            (
                                paramsToChange.scoreMovie && 
                                paramsToChange.scoreMovie.length > 0
                            ) && <Checkbox 
                                w={'250px'}
                                pt={'2px'}
                                borderColor={'rgba(0, 0, 0, 0.7)'}
                                colorScheme={'rgba(0, 0, 0, 0.7)'}
                                iconColor={'white'}
                                isChecked={paramsToChange.fromScoreMovie}
                                onChange={() => setParamsToChange({
                                    ...paramsToChange, 
                                    fromScoreMovie: !paramsToChange.fromScoreMovie
                                })}
                                _active={{
                                    opacity: 0.7
                                }}
                            >
                                From this score?
                            </Checkbox>
                        }
                    </HStack>    
                </VStack>           
            </ModalBody>
            <ModalFooter
                p={3}
            >
                <Button 
                    mr={3}
                    colorScheme='red' 
                    onClick={handleCloseModal}
                >
                    Close
                </Button>
                <Button 
                    colorScheme='blue' 
                    onClick={handleSaveModal}
                >
                    Save
                </Button>
            </ModalFooter>
        </ModalContent>
    </Modal>

}

export default React.memo(ModalParamsMovie);