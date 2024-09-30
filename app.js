const express = require('express');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const sequelize = require('./src/db/sequelize.js');
const port = 3000;

app
    .use(favicon(__dirname + '/favicon.ico'))
    .use(morgan('dev'))
    .use(bodyParser.json())

sequelize.initDb();

/* futurs endpoints below */



app.listen(port, () => console.log(`Example app listening on http://localhost:${port}!`));