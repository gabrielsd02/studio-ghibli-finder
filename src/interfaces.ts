export interface PeopleProps {
    id: string;
    name: string;
    gender: string;
    age: string;
    eyeColor: string;
    hairColor: string;
    films: string[];
    species: string;
    url: string;
}

export interface MoviesProps {
    id: string;
    title: string;
    originalTitle: string;
    originalTitleRomanised: string;
    image: string;
    movieBanner: string;
    description: string;
    director: string;
    producer: string;
    releaseDate: string;
    runningTime: string;
    rtScore: string;
    url: string;
    people: string[];
    species: string[];
    locations: string[];
    vehicles: string[];
}

export interface SpeciesProps {
    id: string;
    name: string;
    classification: string;
    eye_colors: string;
    hair_colors: string;
    url: string;
    people: string[];
    films: string[];
  }