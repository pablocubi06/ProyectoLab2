'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Resultado extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  DetalleOrden.init({
    codigo: DataTypes.INTEGER,
    codigoOrden: DataTypes.INTEGER,
    codigoExamen: DataTypes.INTEGER,
    codigoDeterm: DataTypes.INTEGER,
    resultado: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'DetalleOrden',
  });
  return DetalleOrden;
};