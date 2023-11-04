import { Model,DataTypes } from 'sequelize';
import { sequelize } from './conexion.js';
  class Determinacion extends Model {
  
  }
  Determinacion.init({
    id:{
      type:DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true
    },
     
    nombre_determ: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:true
    },
    nombreExamen:{
      type:DataTypes.STRING,
      allowNull:false,
      
    },   
    unidad_medida: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
      {
      sequelize,
      modelName: 'Determinaciones',
      
});
export{Determinacion};
