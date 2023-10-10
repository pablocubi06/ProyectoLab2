'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Orden extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Orden.init({
    codigo: DataTypes.STRING,
    idPaciente: DataTypes.STRING,
    fechaIngreso: DataTypes.DATE,
    fechaEntrega: DataTypes.DATE,
    estado: DataTypes.STRING,
    tipoMuestras: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Orden',
  });
  return Orden;
};