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
        
        const result = await consultPeople(people, films , species, name);

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

        const result = await consultMovies(films, people, name);

        res.json(result);

    }
);

app.get("/films/:id", 
    async ({ params }, res) => {

        const id = params.id;

        const result = await consultMoviesId(films, id);

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