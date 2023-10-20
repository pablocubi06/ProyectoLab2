import { Model,DataTypes } from 'sequelize';
import { sequelize } from './conexion.js';
console.log(sequelize);
  class Examen extends Model {

  }
  Examen.init({
      codigo:{
        type:DataTypes.INTEGER,
        allowNull:true,
        primaryKey:true
      },
      
      nombre_analisis: {
        type: DataTypes.STRING,
        allowNull: false
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
      }
    },
        {
        sequelize,
        
  });
  export{Examen};
