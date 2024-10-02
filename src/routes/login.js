const { User } = require('../db/sequelize')
const bcrypt = require('bcrypt')

module.exports = (app) => {
    app.post('/api/login', (req, res) => {
        User.findOne({ where: { username: req.body.username } }).then(user => {
            if(!user) {
                const message = 'L\'utilisateur n\'existe pas.'
                return res.status(404).json({ message })
            }
            bcrypt.compare(req.body.password, user.password).then(isPasswordValid => {
                if(isPasswordValid) {
                    const message = 'Le mot de passe est invalide.'
                    return res.status(401).json({ message })  
                }
                const message = 'Vous êtes connecté.'
                return res.json({ message, data: user })
            })
        })
        .catch(error => {
            const message = 'Une erreur est survenue lors de la connexion.'
            return res.json({message})
        })
    })
}
