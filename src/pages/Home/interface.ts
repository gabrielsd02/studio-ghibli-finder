import { PeopleProps, MoviesProps } from "../../interfaces";

export interface RecordsProps {
    records: PeopleProps[] | MoviesProps[];
    total: number;
}

export interface CacheData extends RecordsProps {
    alreadyExecuted?: boolean;
    consultParams?: ConsultParamsProps;
    typeSearch?: string;
    name?: string | null;
}

export interface ConsultParamsProps {
    order: string;
    firstToLast: boolean;
    masculineCheck: boolean;
    femaleCheck: boolean;
    yearMovieRelease: string | null;
    fromYearMovieRelease: boolean;
    durationMovie: string | null;
    fromDurationMovie: boolean;
    scoreMovie: string | null;
    fromScoreMovie: boolean;
}