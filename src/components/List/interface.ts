import { NavigateFunction } from "react-router-dom";
import { MoviesProps, PeopleProps } from "../../interfaces";

export interface ListProps {
    isMobile?: boolean;
    recordsList: PeopleProps[] | MoviesProps[];
    navigate?: NavigateFunction;
    type: string;
}