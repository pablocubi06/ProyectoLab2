'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Determinacion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Determinacion.init({
    codigo: DataTypes.INTEGER,
    nDeterminacion: DataTypes.STRING,
    unidMedida: DataTypes.STRING,
    valorRef: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Determinacion',
  });
  return Determinacion;
};