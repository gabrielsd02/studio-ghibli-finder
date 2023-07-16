import { MoviesProps, PeopleProps } from "../../interfaces";

export interface MovieDetailsResponse {
    film: MoviesProps | null;
    characters: PeopleProps[] | null;
}