
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
          min: {args: [1], msg: "La valeur doit être un nombre entier positif"}
        }
      },
      cp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: {msg: "La valeur doit être un nombre entier positif"},
          notNull: {msg: "La valeur ne peut pas être nulle"},
          min: {args: [1], msg: "La valeur doit être un nombre entier positif"}
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
        }
      }
    }, {
      timestamps: true,
      createdAt: 'created',
      updatedAt: false
    })
  }