import { Sequelize,Model,DataTypes } from 'sequelize';
import { sequelize } from './conexion.js';
  class Orden extends Model {
    
    }
  
  Orden.init({
    id:{
      type:DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true
    },
    idPaciente:{
      type:DataTypes.INTEGER,
      allowNull:false
    },
    fechaCreacion:{
      type:DataTypes.DATE,
      allowNull:false
    },
    fechaEntrega:{
      type:DataTypes.DATE,
      allowNull:false
    },
    estado:{
      type:DataTypes.STRING,
      allowNull:false
    }
    
  }, {
    sequelize,
    modelName: 'Ordenes',
  });
  export{Orden};
