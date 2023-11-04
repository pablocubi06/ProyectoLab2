import { Sequelize,Model,DataTypes } from 'sequelize';
import { sequelize } from './conexion.js';
  class EstadoOrden extends Model {
   
  }
  EstadoOrden.init({
    id:{
      type:DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true
    },
    estado:{
      type:DataTypes.STRING,
      allowNull:false,
      unique:true
    }
    
  }, {
    sequelize,
    modelName: 'EstadoOrdenes',
  });
 export{EstadoOrden};
