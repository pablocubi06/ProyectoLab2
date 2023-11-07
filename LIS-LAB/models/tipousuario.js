import { Model,DataTypes } from 'sequelize';
import { sequelize } from './conexion.js';
  class TipoUsuario extends Model {
    
  }
  TipoUsuario.init({
    id:{
      type:DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true
    },
    usuario:{
      type:DataTypes.STRING,
      allowNull:false,
      unique:true
    },
    password:{
      type:DataTypes.STRING,
      allowNull:false,
      unique:true
    },
    rol:{
      type:DataTypes.STRING,
      allowNull:false,
      
    }
  }, {
    sequelize,
    modelName: 'TipoUsuarios',
  });
  export{TipoUsuario};
