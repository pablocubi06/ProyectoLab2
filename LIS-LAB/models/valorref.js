import { Model,DataTypes } from 'sequelize';
import { sequelize } from './conexion.js';
  class Valorref extends Model {
  
  }
  Valorref.init({
    id:{
      type:DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true
    },
    nombreDererminacion:{
      type:DataTypes.STRING,
      allowNull:true,
      
    },
    sexoPaciente:{
      type:DataTypes.STRING,
      allowNull:false
    },
    edadMin: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    edadMax: {
      type:DataTypes.INTEGER,
      allowNull:false
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
      modelName: 'ValorRef',
      
});
export{Valorref};