import { Sequelize,Model,DataTypes } from 'sequelize';
import { sequelize } from './conexion.js';

  class Paciente extends Model {

  }
  Paciente.init({
      id:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
      },
      dni:{
        type:DataTypes.INTEGER,
        allowNull:false,
        unique:true
        
      },
      
      apellido: {
        type: DataTypes.STRING,
        allowNull: false
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false
      },
      sexo: {
        type: DataTypes.STRING,
        allowNull: false
      },
      fecha_nac:{
        type:DataTypes.DATE
      },
      embarazada:{
        type:DataTypes.BOOLEAN
      },
     diagnostico: {
        type: DataTypes.STRING
      },
      patolog_prev:{
        type:DataTypes.STRING
      },
      email:{
        type:DataTypes.STRING,
        allowNull:false
      },
      telefono:{
        type:DataTypes.INTEGER,
        allowNull:false
      }
    },
      {
    sequelize,
    modelName: 'Pacientes',
  });

  export{Paciente};
