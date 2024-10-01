const { Pokemon } = require('../db/sequelize')
  
module.exports = (app) => {
  app.get('/api/pokemons', (req, res) => {
    if(req.query.name) {
      const name = req.query.name;
      return Pokemon.findAll({
        where: { name: name }
      })
      .then(pokemons => {
        const message = pokemons.length > 1 ? 
          message = `Il y a ${pokemons.length} pokémons avec le nom ${name}.`
         : 
          message = `Il y a ${pokemons.length} pokémon avec le nom ${name}.`;
        
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