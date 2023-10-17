import { Sequelize,Model,DataTypes } from 'sequelize';
import { sequelize } from './conexion.js';
console.log(sequelize);
  class Persona extends Model {

  }
  Persona.init({
      dni:{
        type:DataTypes.INTEGER,
        allowNull:false,
        primaryKey:true
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
      ciudad_nac:{
        type: DataTypes.STRING
      },
      pais_nac:{
        type: DataTypes.STRING
      },
      embarazada:{
        type:DataTypes.INTEGER
      },
       pre_diagnostico: {
        type: DataTypes.STRING
      },
      patolog_prev:{
        type:DataTypes.STRING
      },
      tipo_usuario:{
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
   
  });
  export{Persona};
