import { Model,DataTypes } from 'sequelize';
import { sequelize } from './conexion.js';

  class Examen extends Model {

  }
  Examen.init({
      id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
      },
      codigo:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
        
      },
      
      nombre_analisis: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:true
      },
      tipo_muestra: {
        type: DataTypes.STRING,
        allowNull: false
      },
      dias_demora: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      nota: {
        type: DataTypes.STRING,
        allowNull: false
      },
      eliminado:{
        type:DataTypes.BOOLEAN,
        allowNull:false
      }
    },
        {
        sequelize,
        modelName: 'Examenes',
  });
  export{Examen};
