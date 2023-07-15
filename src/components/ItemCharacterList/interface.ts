import { NavigateFunction } from "react-router-dom";
import { MoviesProps, SpeciesProps } from "../../interfaces";

export interface ItemCharacterListProps {
    isMobile?: boolean;
    name: string;
    age: string | null;
    gender: string;
    species: SpeciesProps[];
    eyeColor: string;
    hairColor: string;
    movies: MoviesProps[];
    navigate?: NavigateFunction
}