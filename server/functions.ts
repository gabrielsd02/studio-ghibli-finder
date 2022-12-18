import { camelCase } from "lodash";
import { MoviesProps, PeopleProps } from "../src/interfaces";

type RecordMovieProps = MoviesProps & { characters: PeopleProps[] };
type RecordPeopleProps = PeopleProps & { films: MoviesProps[] };

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

export async function consultPeople(people: PeopleProps[], movies?: MoviesProps[], nameCharacter?: string) {

    let records = [] as RecordPeopleProps[]; 
    
	if(nameCharacter) {
        
        records = people.filter((data) => {      
            const name = data.name.toLocaleUpperCase().trim();
            const nameSearched = nameCharacter.toLocaleUpperCase().trim();
            const position = name.search(nameSearched);
            
            if(position !== -1) return true;

            return false;                  
        })
        .map((character) => {

            let peopleMovies = [] as MoviesProps[];

            if(movies && character.films.length > 0) {
                    
                character.films.map(async (film) => {

                    const moviesPerson = await consultMoviesId(movies, film);
                    
                    if(moviesPerson) peopleMovies.push(moviesPerson);

                });                    

            } 

            const mountRecord = {
                ...character,
                films: peopleMovies
            } as RecordPeopleProps

            return mountRecord;

        })
        .sort();

	};  

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

export async function consultMovies(movies: MoviesProps[], people?: PeopleProps[], nameMovie?: string) {
    
    let records = [] as RecordMovieProps[];        
    
    if(nameMovie) {
        
        records = movies.filter((data) => {      
            const name = data.title.toLocaleUpperCase().trim();
            const nameSearched = nameMovie.toLocaleUpperCase().trim();
            const position = name.search(nameSearched);

            if(position !== -1) return true;

            return false;
        })
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
        .sort();

    };  

    return { 
        records,        
        total: records.length 
    };

}

export async function consultMoviesId(movies: MoviesProps[], id: string) {

    let character: MoviesProps | null | undefined = null;

    character = movies.find((m) => m.id === id);

    return character;

}