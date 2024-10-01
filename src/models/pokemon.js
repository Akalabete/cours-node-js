
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Pokemon', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
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
        allowNull: false
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: false
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