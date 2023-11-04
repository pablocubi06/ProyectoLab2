import { Sequelize,Model,DataTypes } from 'sequelize';
import { sequelize } from './conexion.js';
  class Auditoria extends Model {
   
  }
  Auditoria.init({
    id:{
      type:DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true
    },
    idUsuario:{
      type:DataTypes.STRING,
      allowNull:false,
      unique:true
    },
    fechaHora:{
        type:DataTypes.DATE,
        allowNull:false
    },
    descripcion:{
        type:DataTypes.STRING,
        allowNull:false
    }
    
  }, {
    sequelize,
    modelName: 'Auditorias',
  });
  export{Auditoria};