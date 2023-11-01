import { Model,DataTypes } from 'sequelize';
import { sequelize } from './conexion.js';
  class Valorref extends Model {
  
  }
  Valorref.init({
    codigo:{
      type:DataTypes.INTEGER,
      allowNull:true,
      primaryKey:true,
      autoIncrement: true
    },

    cod_determ:{
      type:DataTypes.INTEGER,
      allowNull:true,
      autoIncrement: false
    },
    
    nombreRef: {
      type: DataTypes.STRING,
      allowNull: false
    },
    valorMin: {
      type: DataTypes.STRING,
      allowNull: false
    },
    valorMax: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
      {
      sequelize,
      
      
});
export{Valorref};