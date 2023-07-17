import { 
    MoviesProps, 
    PeopleProps,
    SpeciesProps 
} from "../src/interfaces";

export interface ConsultMoviesIdProps {
    movies: MoviesProps[]; 
    id: string;
    characters?: PeopleProps[];
    returnCharacters?: boolean;
}

export interface ConsultPeopleProps {
    people: PeopleProps[]; 
    movies?: MoviesProps[]; 
    species?: SpeciesProps[]; 
    nameCharacter?: string
    firstToLast?: boolean;
    gender?: string | null;
}

export interface ConsultMoviesProps {
    movies: MoviesProps[]; 
    people?: PeopleProps[]; 
    firstToLast?: boolean;
    nameMovie?: string;   
    yearMovieRelease?: string | null;
    fromYearMovieRelease?: boolean;
    durationMovie?: string | null;
    fromDurationMovie?: boolean;
    scoreMovie?: string | null;
    fromScoreMovie?: boolean; 
}

export type RecordMovieProps = MoviesProps & { characters: PeopleProps[] };
export type RecordPeopleProps = PeopleProps & { films: MoviesProps[]; species: SpeciesProps[] };