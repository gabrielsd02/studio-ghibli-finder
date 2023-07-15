import { NavigateFunction } from "react-router-dom";
import { PeopleProps } from "../../interfaces";

export interface ItemMovieListProps {
    isMobile?: boolean;
    id: string;
    title: string;
    runningTime: string;
    navigate?: NavigateFunction;
    rtScore: string;
    description: string;
    releaseDate: string;
    characters: PeopleProps[] | null;
}