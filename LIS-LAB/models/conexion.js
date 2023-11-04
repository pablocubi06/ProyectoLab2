import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('laboratorio','root','',{
    host : 'localhost',
    dialect : 'mysql'
})
sequelize.sync()
.then(() => {
  console.log('La tabla de Paciente se ha creado con éxito.');
})
.catch((error) => {
  console.error('Error al crear la tabla de Paciente:', error);
});
sequelize.authenticate()
.then(()=>{
    console.log('conectado')
})
.catch(err=>{
    console.log(' No Conectado');
})
export{ sequelize};