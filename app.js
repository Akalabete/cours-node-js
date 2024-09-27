const express = require('express');
let pokemons = require('./mock-pokemons');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const { success, getUniqueId } = require('./helper.js');
const morgan = require('morgan');
const app = express();
const port = 3000;


app
    .use(favicon(__dirname + '/favicon.ico'))
    .use(morgan('dev'))
    .use(bodyParser.json())

app.get('/', (req, res) => res.send('Hello wonderful World!'));

app.get('/api/pokemons/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const pokemon = pokemons.find(pokemon => pokemon.id === id);
    const message = "Nous avons bien ce pokemon: ";
    res.json(success(message, pokemon));
    }
)
app.get('/api/pokemons', (req, res) => {
    const message = "La liste des pokemons est bien là!";
    res.json(success(message, pokemons));
    }
);

app.post('/api/pokemons', (req, res) => {
    const id = getUniqueId(pokemons);
    const pokemonCreated = { ...req.body, ...{id: id, created: new Date()} };
    pokemons.push(pokemonCreated);
    const message = `Le pokemon ${pokemonCreated.name} a bien été créé!`;
    res.json(success(message, pokemonCreated));
    }
);

app.put('/api/pokemons/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const pokemonUpdated = { ...req.body, id: id };
    pokemons = pokemons.map(pokemon => {
        return pokemon.id === id ? pokemonUpdated : pokemon;
    });
    
    const message = `Le pokemon ${pokemonUpdated.name} a bien été mis à jour!`;
    res.json(success(message, pokemonUpdated));
    }
);

app.delete('/api/pokemons/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const pokemonDeleted = pokemons.find(pokemon => pokemon.id ===id);
    pokemons = pokemons.filter(pokemon => pokemon.id !== id);
    const message = `Le pokemon ${pokemonDeleted.name} a bien été supprimé!`;
    res.json(success(message, pokemonDeleted));
    }
);


app.listen(port, () => console.log(`Example app listening on http://localhost:${port}!`));