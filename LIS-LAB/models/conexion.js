import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('lab2','root','',{
    host : 'localhost',
    dialect : 'mysql'
})

sequelize.authenticate()
.then(()=>{
    console.log('coenctado')
})
.catch(err=>{
    console.log(' No Conectado');
})
export{ sequelize};