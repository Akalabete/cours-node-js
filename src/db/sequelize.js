const { Sequelize, DataTypes } = require('sequelize')
const PokemonModel = require('../models/pokemon')
const UserModel = require('../models/users')
const pokemons = require('./mock-pokemons')
const bcrypt = require('bcrypt')


const sequelize = new Sequelize('pokedex', 'root', '', {
  host: 'localhost',
  dialect: 'mariadb',
  dialectOptions: {
    timezone: 'Etc/GMT-2',
  },
  logging: false
})
  
const Pokemon = PokemonModel(sequelize, DataTypes)
const User = UserModel(sequelize, DataTypes)

const initDb = () => {
  return sequelize.sync({force: true}).then(_ => {
    pokemons.map(pokemon => {
      Pokemon.create({
        name: pokemon.name,
        hp: pokemon.hp,
        cp: pokemon.cp,
        picture: pokemon.picture,
        types: pokemon.types
      }).then()
    })
    bcrypt.hash('admin', 10)
    .then(hash =>  User.create({username: 'admin', password: hash}))
    console.log('La base de donnée a bien été initialisée !')
  })
}

module.exports = { 
  initDb, Pokemon, User
}