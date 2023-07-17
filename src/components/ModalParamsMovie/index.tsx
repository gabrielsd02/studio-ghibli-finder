import React, {
    useRef,
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
    StackProps,
    NumberInput,
    NumberInputField,
    HStack,
    VStack,
    Flex
} from '@chakra-ui/react';
import { ModalParamsMovieProps } from './interface';

export function ModalParamsMovie({
    consultParams,
    setOpenModal,
    consultMovies,
    setConsultParams
}: ModalParamsMovieProps) {

    const refInputOne = useRef<HTMLInputElement>(null);
    const refInputTwo = useRef<HTMLInputElement>(null);
    const refInputThree = useRef<HTMLInputElement>(null);

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
    const [optionActive, setOptionActive] = useState(
        consultParams.yearMovieRelease ? 'year' : (
            consultParams.durationMovie ? 'duration' : (
                consultParams.scoreMovie ? 'score' : ""
            )
        )
    );

    const handleCloseModal = useCallback(() => {
        setOptionActive('');
        setOpenModal(false);
    }, []);
    
    const handleSaveModal = () => {
        
        if(optionActive === "") {
            
            setConsultParams(Object.assign(consultParams, paramsStandard));            
            consultMovies(Object.assign(consultParams, paramsStandard));

        } else {
            
            setConsultParams(Object.assign(consultParams, paramsToChange));
            consultMovies(Object.assign(consultParams, paramsToChange));

        }        
        
        handleCloseModal();

    };

    const handleCleanModal = () => {
        setParamsToChange({
            ...paramsToChange,
            durationMovie: null,
            scoreMovie: null,
            yearMovieRelease: null,
            fromDurationMovie: false,
            fromScoreMovie: false,
            fromYearMovieRelease: false
        });
        if(refInputOne.current) refInputOne.current.value = "";
        if(refInputTwo.current) refInputTwo.current.value = "";
        if(refInputThree.current) refInputThree.current.value = "";
    };

    useEffect(() => {
        if(
            !paramsToChange.yearMovieRelease &&
            !paramsToChange.durationMovie &&
            !paramsToChange.scoreMovie
        ) setOptionActive('');          
    }, [paramsToChange]);
    
    return <Modal 
        isOpen 
        isCentered
        size={'xl'}        
        onClose={handleCloseModal}   
        motionPreset={'scale'}              
    >
        <ModalOverlay />
        <ModalContent 
            color={'white'}
            background={'#1ca1d1'}
        >
            <ModalHeader
                pl={5}
                borderBottomWidth={'1px'}
                borderStyle={"solid"}
                borderColor={"white"}
                textShadow={'0px 0px 5px black'}
            >
                More Options for Movies Listing
            </ModalHeader>
            <ModalCloseButton 
                mt={'5px'}
                mr={'2px'}
            />
            <ModalBody 
                p={5}
                borderBottomWidth={'1px'}
                borderStyle={"solid"}
                borderColor={"white"}
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
                                    ref={refInputOne}                                          
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
                                        
                                        setOptionActive('year');
                                        setParamsToChange({
                                            ...paramsToChange,
                                            yearMovieRelease: yearMovie,
                                            durationMovie: null,
                                            scoreMovie: null,
                                            fromDurationMovie: false,
                                            fromScoreMovie: false
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
                                ref={refInputTwo}  
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
                                        
                                        setOptionActive('duration');
                                        setParamsToChange({
                                            ...paramsToChange,
                                            durationMovie,
                                            yearMovieRelease: null,
                                            scoreMovie: null,
                                            fromScoreMovie: false,
                                            fromYearMovieRelease: false
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
                                ref={refInputThree}
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
                                        
                                        setOptionActive('score');
                                        setParamsToChange({
                                            ...paramsToChange,
                                            scoreMovie,
                                            yearMovieRelease: null,
                                            durationMovie: null,
                                            fromDurationMovie: false,
                                            fromYearMovieRelease: false
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
                p={5}
                pb={'1rem !important'}
            >
                <HStack
                    justifyContent={'space-between'}
                    align={'center'}
                    w={'100%'}
                >
                    <Flex
                        align={'center'}
                        justify={'center'}
                    >
                        <Button 
                            mr={3}
                            colorScheme='red' 
                            onClick={handleCloseModal}
                            _hover={{
                                boxShadow: '0px 0px 5px red',
                                opacity: 0.8
                            }}
                        >
                            Close
                        </Button>
                        {(optionActive && optionActive.length > 0) && <Button 
                            mr={3}
                            colorScheme='white' 
                            onClick={handleCleanModal}
                            border={"1px solid white"}
                            _hover={{
                                boxShadow: '0px 0px 5px white',
                                opacity: 0.8
                            }}
                        >
                            Clean
                        </Button>}
                    </Flex>
                    <Button 
                        colorScheme='blue' 
                        onClick={handleSaveModal}
                        _hover={{
                            boxShadow: '0px 0px 5px #3182ce',
                            opacity: 0.8
                        }}
                    >
                        Save
                    </Button>
                </HStack>
            </ModalFooter>
        </ModalContent>
    </Modal>

}

export default React.memo(ModalParamsMovie);