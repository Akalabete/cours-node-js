const { Pokemon } = require('../db/sequelize')
const { Op } = require('sequelize')


module.exports = (app) => {
  app.get('/api/pokemons', (req, res) => {
    if(req.query.name) {
      const name = req.query.name;
      const limit = parseInt(req.query.limit) || 5;
      if (name.length <3) {
        const message = 'Le terme de recherche doit contenir au moins 3 caractères.'
        return res.status(400).json({ message })
      }
      return Pokemon.findAndCountAll({
        where: {
          name:{ // propriété de l'objet recherché
            [Op.like]: `%${name}%` // opérateur de comparaison
            }
          },
          order : [['name']], // ordre de tri
          limit: limit, // nombre de résultats
      })
      .then(({count, rows}) => {
        const message = `Il y à ${count} pokémons qui correspondent à votre recherche.`
        res.json({ message, data: rows })
      });
    } else {
      Pokemon.findAll(({order: [['name']]}))
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