import { Model,DataTypes } from 'sequelize';
import { sequelize } from './conexion.js';
  class Determinacion extends Model {
  
  }
  Determinacion.init({
    codigo:{
      type:DataTypes.INTEGER,
      allowNull:true,
      primaryKey:true,
      autoIncrement: true
    },

    cod_examen:{
      type:DataTypes.INTEGER,
      allowNull:true,
      autoIncrement: false
    },
    
    nombre_determ: {
      type: DataTypes.STRING,
      allowNull: false
    },
    unidad_medida: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
      {
      sequelize,
      
      
});
export{Determinacion};
