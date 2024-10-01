const express = require('express');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const sequelize = require('./src/db/sequelize');
const port = 3000;

app
    .use(favicon(__dirname + '/favicon.ico'))
    .use(morgan('dev'))
    .use(bodyParser.json())

sequelize.initDb();

/* futurs endpoints below */
require('./src/routes/findAllPokemons.js')(app);
require('./src/routes/findPokemonByPk.js')(app);
require('./src/routes/addNewPokemon.js')(app);
require('./src/routes/updatePokemon.js')(app);
require('./src/routes/deletePokemon.js')(app);

// gestion des erreurs
    // 404 
app.use(({res}) => {
    const message = `impossible de trouver le pokémon demandé :(`
    res.status(404).json({ message });
})

app.listen(port, () => console.log(`Example app listening on http://localhost:${port}!`));