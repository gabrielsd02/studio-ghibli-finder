import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import datas from '../database/index.json';

import { 
  camelizeKeys, 
  consultMovies, 
  consultPeople,
  consultPeopleId,
  consultMoviesId 
} from './functions';
import {
  PeopleProps,
  MoviesProps,
  SpeciesProps
} from '../src/interfaces';

const PORT = process.env.PORT || 3001;

const people: PeopleProps[] = camelizeKeys(datas.people);
const films: MoviesProps[] = camelizeKeys(datas.films);
const species: SpeciesProps[] = camelizeKeys(datas.species);

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.get("/people",  
    async ({ query }, res) => {
                        
        const name = query.name as string | undefined;
        const firstToLast: boolean = query.firstToLast ? JSON.parse(query.firstToLast as string) : true;
        const gender: string | null = query.gender ? query.gender as string : null;
        
        const result = await consultPeople({
            people, 
            movies: films, 
            species, 
            gender,
            firstToLast,
            nameCharacter: name
        });

        res.json(result);
    }
);

app.get("/people/:id", 
    async ({ params }, res) => {

        const id = params.id;

        const result = await consultPeopleId(people, id);

        if(!result) {

            res.status(400);
            res.render("error", {
                people: "Character not found"
            });

        }

        res.json(result);
    }
);

app.get("/films", 
    async ({ query }, res) => {

        const name = query.name as string;
        const firstToLast: boolean | undefined = query.firstToLast ? JSON.parse(query.firstToLast as string) : undefined;
        const yearMovieRelease: string | null = query.yearMovieRelease ? query.yearMovieRelease as string : null;
        const durationMovie: string | null = query.durationMovie ? query.durationMovie as string : null; 
        const scoreMovie: string | null = query.scoreMovie ? query.scoreMovie as string : null;
        const fromDurationMovie: boolean | undefined = query.fromDurationMovie ? JSON.parse(query.fromDurationMovie as string) : undefined;
        const fromYearMovieRelease: boolean | undefined = query.fromYearMovieRelease ? JSON.parse(query.fromYearMovieRelease as string) : undefined; 
        const fromScoreMovie: boolean | undefined = query.fromScoreMovie ? JSON.parse(query.fromScoreMovie as string) : undefined;

        const result = await consultMovies({
            movies: films, 
            people, 
            firstToLast,
            nameMovie: name,
            yearMovieRelease,
            durationMovie,
            scoreMovie,
            fromDurationMovie,
            fromYearMovieRelease,
            fromScoreMovie
        });

        res.json(result);

    }
);

app.get("/films/:id", 
    async ({ params }, res) => {

        const id = params.id;

        const result = await consultMoviesId({
            movies: films, 
            id,
            characters: people,
            returnCharacters: true
        });
        
        if(!result.film) {

            res.status(400).json('Movie not found');
            return;

        }

        res.json(result);

    }
);  

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
