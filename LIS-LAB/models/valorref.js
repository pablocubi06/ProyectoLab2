'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ValorRef extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ValorRef.init({
    codigo: DataTypes.INTEGER,
    nombreRef: DataTypes.STRING,
    valorMin: DataTypes.STRING,
    valorMax: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ValorRef',
  });
  return ValorRef;
};