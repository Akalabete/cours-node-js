const { Pokemon } = require('../db/sequelize')
const { Op } = require('sequelize')


module.exports = (app) => {
  app.get('/api/pokemons', (req, res) => {
    if(req.query.name) {
      const name = req.query.name;
      return Pokemon.findAll({
        where: {
          name:{ // propriété de l'objet recherché
            [Op.like]: `%${name}%` // opérateur de comparaison
            }
          },
          limit: 5
      })
      .then(pokemons => {
        const message = `Il y à ${pokemons.length} pokémons qui correspondent à votre recherche.`
        res.json({ message, data: pokemons })
      });
    } else {
      Pokemon.findAll()
      .then(pokemons => {
        const message = 'La liste des pokémons a bien été récupérée.'
        res.json({ message, data: pokemons })
      })
      .catch(error => {
        const message = `La liste des pokémons n'a pas pu être récupérée. Réessayez dans quelques instants.`
        res.status(500).json({ message, data: error })
      })
    }
  })
}