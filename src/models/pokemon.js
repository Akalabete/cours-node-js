const validTypes = ['Plante', 'Feu', 'Eau', 'Insecte', 'Normal', 'Electrik', 'Poison', 'Fée', 'Vol', 'Combat', 'Psy'];
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Pokemon', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {msg: "Le nom du pokémon est déjà pris"},
        validate: {
          is: {
            args: ["^[a-zA-ZÀ-ÿ\\s]+$", 'i'],
            msg: "Le nom ne peut contenir que des lettres et des espaces"
          },
          notNull: {msg: "Le nom ne peut pas être nul"},
          notEmpty: {msg: "Le nom ne peut pas être vide"}
        }
      },
      hp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: {msg: "La valeur doit être un nombre entier positif"},
          notNull: {msg: "La valeur ne peut pas être nulle"},
          min: {args: [1], msg: "La valeur doit être un nombre entier positif"},
          max: {args: [999], msg: "La valeur doit être un nombre entier positif inférieur à 1000"}
        }
      },
      cp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: {msg: "La valeur doit être un nombre entier positif"},
          notNull: {msg: "La valeur ne peut pas être nulle"},
          min: {args: [1], msg: "La valeur doit être un nombre entier positif"},
          max: {args: [99], msg: "La valeur doit être un nombre entier positif inférieur à 100"}
        }
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: false,
        isUrl: {msg: "La valeur doit être une URL"},
        notNull: {msg: "La valeur ne peut pas être nulle"}
      },
      types: {
        type: DataTypes.STRING,
        allowNull: false,
        get() {
            return this.getDataValue('types').split(',');
        },
        set(types) {
            this.setDataValue('types', types.join());
        },
        validate: {
          isTypesValid(value) {
            if(!value) {
              throw new Error('Le pokémon doit avoir au moins un type')
            }
            if(value.split(',').lengnth > 3) {
              throw new Error('Le pokémon ne peut pas avoir plus de 3 types')
            }
            value.split(',').forEach(type => {
              if(!validTypes.includes(type)) {
                throw new Error(`Le type ${type} n'est pas valide, les types autorisés sont ${validTypes.join(', ')}`)
              }
            })
          }

        }
      }
    }, {
      timestamps: true,
      createdAt: 'created',
      updatedAt: false
    })
  }