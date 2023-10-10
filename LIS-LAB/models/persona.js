'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Persona extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Persona.init({
    dni: DataTypes.STRING,
    apellido: DataTypes.STRING,
    nombre: DataTypes.STRING,
    sexo: DataTypes.STRING,
    fecha_nac: DataTypes.DATE,
    ciudad_nac: DataTypes.STRING,
    pais_nac: DataTypes.STRING,
    embarazada: DataTypes.BOOLEAN,
    pre_diagnostico: DataTypes.STRING,
    patolog_prev: DataTypes.STRING,
    tipo_usuario: DataTypes.STRING,
    mail: DataTypes.STRING,
    telefono: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Persona',
  });
  return Persona;
};