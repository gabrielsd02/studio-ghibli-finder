import { camelCase } from "lodash";
import { 
    MoviesProps, 
    PeopleProps,
    SpeciesProps 
} from "../src/interfaces";

interface ConsultMoviesIdProps {
    movies: MoviesProps[]; 
    id: string;
    characters?: PeopleProps[];
    returnCharacters?: boolean;
}

interface ConsultPeopleProps {
    people: PeopleProps[]; 
    movies?: MoviesProps[]; 
    species?: SpeciesProps[]; 
    nameCharacter?: string
    firstToLast?: boolean;
}

type RecordMovieProps = MoviesProps & { characters: PeopleProps[] };
type RecordPeopleProps = PeopleProps & { films: MoviesProps[]; species: SpeciesProps[] };

function isEmpty(str: string): boolean {
    return (!str || str.length === 0);
}

export function camelizeKeys(obj: any): any {

	if (Array.isArray(obj)) {
	    return obj.map(v => camelizeKeys(v));
	} else if (obj != null && obj.constructor === Object) {
        return Object.keys(obj).reduce(
            (result, key) => ({
            ...result,
            [camelCase(key)]: camelizeKeys(obj[key]),
            }),
            {},
        );
	}
	return obj;

};

export async function consultPeople({
    people, 
    movies, 
    species,
    firstToLast=true, 
    nameCharacter
}: ConsultPeopleProps) {
    
    let records = people as RecordPeopleProps[]; 
    
	if(nameCharacter && !isEmpty(nameCharacter)) {
        
        records = records.filter((data) => {      
            const name = data.name.toLocaleUpperCase().trim();
            const nameSearched = nameCharacter.toLocaleUpperCase().trim();
            const position = name.search(nameSearched);
            
            if(position !== -1) return true;

            return false;                  
        })        

    };  
    
    records = records
    .map((character) => {

        let peopleMovies = [] as MoviesProps[];
        let peopleSpecies = [] as SpeciesProps[];

        if(movies && character.films.length > 0) {
                
            character.films.map(async (film) => {

                const moviesPerson = await consultMoviesId({movies, id: film});
                
                if(moviesPerson.film) peopleMovies.push(moviesPerson.film);

            });                    

        } 
        
        if(species && character.species) {

            // const speciePerson = consultaSpeciesId(species, character.species);
            consultSpeciesId(species, character.species) 
            .then((speciePerson) => {

                if(speciePerson) peopleSpecies.push(speciePerson); 

            })           

        };  

        const mountRecord = {
            ...character,
            films: peopleMovies,
            species: peopleSpecies
        } as RecordPeopleProps

        return mountRecord;

    })
    .sort((a, b) => {

        let str1 = a.name.toLowerCase();            
        let str2 = b.name.toLowerCase();                    
        
        if(firstToLast) {
            if (str1 < str2) return -1;        
            if (str1 > str2) return 1;
        } else {
            if (str1 > str2) return -1;        
            if (str1 < str2) return 1;
        }

        return 0;
        
    });

	return { 
        records,    
		total: records.length    
	};


}

export async function consultPeopleId(people: PeopleProps[], id: string) {

    let character: PeopleProps | null | undefined = null;

    character = people.find((p) => p.id === id);

    return character;

}

export async function consultSpeciesId(species: SpeciesProps[], id: string) {

    let specie: SpeciesProps | null | undefined = null;

    specie = species.find((p) => p.id === id);

    return specie;

}

export async function consultMovies(movies: MoviesProps[], people?: PeopleProps[], nameMovie?: string) {
    
    let records = movies as RecordMovieProps[];        
    
    if(nameMovie && !isEmpty(nameMovie)) {
        
        records = records.filter((data) => {      
            const name = data.title.toLocaleUpperCase().trim();
            const nameSearched = nameMovie.toLocaleUpperCase().trim();
            const position = name.search(nameSearched);

            if(position !== -1) return true;

            return false;
        })        

    };  

    records = records
    .map((movie) => {

        let peoplesMovie = [] as PeopleProps[];

        if(people && movie.people.length > 0) {
                
            movie.people.map(async (person) => {

                const moviesPerson = await consultPeopleId(people, person);
                
                if(moviesPerson) peoplesMovie.push(moviesPerson);

            });                    

        }

        const mountRecord = {
            ...movie,
            characters: peoplesMovie
        } as RecordMovieProps

        return mountRecord;

    })
    .sort((a, b) => {

        let str1 = a.title.toLowerCase();            
        let str2 = b.title.toLowerCase();            

        if (str1 < str2) {
            return -1;
        }
        if (str1 > str2) {
            return 1;
        }
        return 0;
        
    });

    return { 
        records,        
        total: records.length 
    };

}

export async function consultMoviesId({
    movies, 
    id, 
    characters=[],
    returnCharacters=false
}: ConsultMoviesIdProps) {

    let film: MoviesProps | null | undefined = null;
    let peoplesMovie = [] as PeopleProps[];

    film = movies.find((m) => m.id === id);

    if(returnCharacters && characters.length > 0) {

        if(film?.people && film.people.length > 0) {
                
            film.people.map(async (person) => {

                const moviesPerson = await consultPeopleId(characters, person);
                
                if(moviesPerson) peoplesMovie.push(moviesPerson);

            });                    

        }
        
    }

    return {
        film,
        characters: peoplesMovie
    };

}
