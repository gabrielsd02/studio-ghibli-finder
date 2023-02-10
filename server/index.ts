import express from 'express';
import cors from 'cors';
import datas from '../database/index.json' assert { type: 'json' };

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

const PORT = 3001;

const people: PeopleProps[] = camelizeKeys(datas.people);
const films: MoviesProps[] = camelizeKeys(datas.films);
const species: SpeciesProps[] = camelizeKeys(datas.species);

const app = express();

app.use(cors());
app.use(express.json());

app.get("/people",  
    async ({ query }, res) => {
                        
        const name = query.name as string | undefined;
        const firstToLast: boolean = query.firstToLast ? JSON.parse(query.firstToLast as string) : null;
        
        const result = await consultPeople({
            people, 
            movies: films , 
            species, 
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
        const firstToLast: boolean = query.firstToLast ? JSON.parse(query.firstToLast as string) : null;

        const result = await consultMovies({
            movies: films, 
            people, 
            firstToLast,
            nameMovie: name
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

        if(!result) {

            res.status(400);
            res.render("error", {
                films: "Movie not found"
            });

        }

        res.json(result);

    }
);  

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
