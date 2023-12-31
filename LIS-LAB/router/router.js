import express, { Router } from 'express';
import session  from 'express-session';
const router = Router();
import { Orden } from '../models/orden.js';
import { TipoUsuario } from '../models/tipousuario.js';
import { EstadoOrden } from '../models/estadoOrden.js';
import { Auditoria } from '../models/auditoria.js';
import { Examen } from '../models/examen.js';
import { Determinacion } from '../models/determinacion.js';
import { Valorref } from '../models/valorref.js';
const app = express();
import path from 'path';
import { render } from 'pug';
import { Paciente } from '../models/paciente.js';
import { where } from 'sequelize';
import bcrypt from "bcrypt";

app.set('view engine', 'pug');
app.set('views', './vistas');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


app.get('/', (req, res) => {
  res.render('principal')
})
app.get('/orden', (req, res) => {
  res.render('orden');
});
app.get('/cargarPaciente', (req, res) => {
  res.render('cargarPaciente');
});

app.get('/editar/:id', async (req, res) => {
  const pacienteId = req.params.id;
  const paciente = await Paciente.findByPk(pacienteId);
  res.render('editar', { paciente });

});

app.get('/nuevaOrden/:id', async (req, res) => {
  const pacienteId = req.params.id;
  console.log(pacienteId)
  const persona = await Paciente.findByPk(pacienteId);
  console.log(persona);
  res.render('nuevaOrden',{persona});

});

app.get('/api/personas', async (req, res) => {
  try {
    const personas = await Paciente.findAll(); // Esto asume que tienes un modelo "Persona"

    res.json(personas); // Devuelve los resultados como JSON
  } catch (error) {
    console.error('Error al obtener datos de personas:', error);
    res.status(500).json({ error: 'Error al obtener datos de personas' });
  }
});


app.post('/buscar?criterio=${criterio}&valor=${valor}', async (req, res) => {
  const { criterio, valor } = req.body;
  let pacientes = [];

  if (criterio === 'nombre') {
    pacientes = await Paciente.findAll({ where: { nombre: valor } });
  } else if (criterio === 'dni') {
    pacientes = await Paciente.findAll({ where: { dni: valor } });
  } else if (criterio === 'email') {
    pacientes = await Paciente.findAll({ where: { email: valor } });
  }

  res.render('orden', { pacientes });
});

app.post('/cargar-paciente', async (req, res) => {
  try {
    // Obtén los datos del formulario
    const {
      dni, apellido, nombre, sexo, fecha_nac, embarazada, diagnostico,
      patolog_prev, email, telefono
    } = req.body;
    console.log(sexo);
    // Crea un nuevo paciente en la base de datos usando el modelo Paciente
    await Paciente.create({
      dni, apellido, nombre, sexo, fecha_nac,embarazada, diagnostico,
      patolog_prev, email, telefono
    });

    // Redirige a una página de éxito o a donde desees
    res.render('orden');
  } catch (error) {
    console.error('Error al cargar paciente:', error);
    res.redirect('/error'); // Página de error en caso de problemas
  }
});


app.post('/cargarOrden',async(req,res)=>{
  const fechaCreacion = req.body.fechaCreacion;
  const fechaEntrega = req.body.fechaEntrega;
  const idExamen = req.body.idExamen;  
  const idPaciente=req.body.idPaciente;
  const muestra = true
  const estado = "Esperando Toma de muestra";
  console.log(idExamen);
  await Orden.create({
    idPaciente,idExamen,muestra,fechaCreacion,fechaEntrega,estado
  })
res.render()
})


app.post('/guardar-edicion', (req, res) => {
  const pacienteId = req.body.dni;
  const nuevosDatos = {
    dni: req.body.dni,
    apellido: req.body.apellido,
    nombre: req.body.nombre,
    sexo: req.body.sexo,
    fecha_nac: req.body.fecha_nac,
    embarazada: req.body.embarazada,
    diagnostico: req.body.pre_diagnostico,
    patolog_prev: req.body.patolog_prev,
    email: req.body.email,
    telefono: req.body.telefono
  };
  Persona.update(nuevosDatos, {
    where: { dni: pacienteId }
  })
    .then(() => {
      res.render('orden'); // Redirige a la lista de pacientes o a donde desees
    })
    .catch(error => {
      console.error('Error al actualizar paciente:', error);

    });

});
app.post('/buscar-examen', async (req, res) => {
  const {valor} = req.body;
  let examenes = [];
  examenes = await Examen.findAll({ where: { nombre_analisis: valor } });
  res.render('examen', {examenes});
 
});
app.post('/imprimirEtiquetas', (req, res) => {
  // Datos para las etiquetas (reemplaza estos valores con los correctos)
  const datos = {
    numeroOrden: '1',
    nombrePaciente: req.body.nombrePaciente,
    fecha: req.body.fecha,
  };
  console.log(datos)

  // Renderiza las etiquetas usando Pug
  res.render('imprimirEtiquetas',{datos});
});

app.get('/examen', (req, res) => {

  res.render('examen')
});
app.get('/determinaciones', (req, res) => {
   res.render('determinaciones')
});
app.get('/valoresDeReferencia', (req, res) => {

  res.render('valorref')
});
app.post('/cargar-examen', async (req, res) => {
  try {
    const {codigo, nombre_analisis, tipo_muestra,nota, dias_demora} = req.body,eliminado=false;
    await Examen.create({
     codigo,nombre_analisis, tipo_muestra,nota, dias_demora,eliminado
    });
   
    
      res.render("examen")

  } catch (error) {

    console.error('Error al cargar examen:', error);
    res.redirect('/error'); // Página de error en caso de problemas
  }



});
app.get('/editar-examen/:codigo', async (req, res) => {
  const codigoExamen = req.params.codigo;
  console.log(codigoExamen)
  const examen = await Examen.findByPk(codigoExamen);
  //console.log(examen.nombre_analisis)
  res.render('editarExamen', { examen });

});
app.post('/editar-examen', (req, res) => {
  const codigo = req.body.codigo;
  const nuevosDatos = {
    nombre_analisis: req.body.nombre_analisis,
    tipo_muestra: req.body.tipo_muestra,
    dias_demora: req.body.dias_demora,
    nota: req.body.nota
  };
    Examen.update(nuevosDatos, {
    where: { codigo: codigo }
  })
    .then(() => {
      res.render('examen'); // Redirige a la lista de pacientes o a donde desees
    })
    .catch(error => {
      console.error('Error al actualizar el examen:', error);

    });
});
app.get('/eliminar-examen/:codigo', async (req, res) => {
      const codigoExamen = req.params.codigo;
      const examen = await Examen.findByPk(codigoExamen);
      //console.log(examen.nombre_analisis)
      res.render('eliminarExamen', { examen });
 });
 app.post('/eliminar-examen', async(req, res) => {
  res.render('examen', {
    mensaje: ('Los datos se cargaron correctamente')
  });
  
  });

  // middleware para obtener los datos del examen
const getExamenesData = (req, res, next) => {
  // realizar la consulta a la base de datos
  const examenes = Examamen.findAll();

  // almacenar los datos del examen en la sesión
  req.session.examenes = examenes;
  next();
};



app.get('/api/examenes',async(req,res)=>{
  try {
    const examenes = await Examen.findAll({
      where:{
        eliminado:false
      }
    }); 
    console.log(examenes)
    res.json(examenes); 
  } catch (error) {
    console.error('Error al obtener datos de personas:', error);
    res.status(500).json({ error: 'Error al obtener datos de personas' });
  }

})

app.post('/buscar-determinacion', async (req, res) => {
  const {valor} = req.body;
  let d = [];
  d = await Determinacion.findAll({ where: { nombre_determ: valor } });
  res.render('determinaciones', {d});
 
});


  
  
































app.get('/usuario', (req, res) => {

  res.render('usuario')
});



app.post("/cargar-usuario", async (req, res) => {
  
  if (!(req.body.usuario && req.body.password)) {
  return res.status(400).send({ error: "Datos no tienen formato apropiado" });
  }
    try {
      // generar salt para hashear el password
  const salt = await bcrypt.genSalt(10);

  // hasheamos el password con salt anexado
  const hash = await bcrypt.hash(req.body.password, salt);

  // Creamos un nuevo usuario con la contraseña hasheada
  const nuevoUsuario = {
    usuario: req.body.usuario,
    password: hash,
    rol: req.body.rol
    
  };

  // Creando un nuevo usuario
  const user = TipoUsuario.create(nuevoUsuario);

  //user.save().then((doc) => res.status(201).send(doc));
    } catch (error) {
      
    console.error('Error al cargar usuario:', error);
    res.redirect('/error'); // Página de error en caso de problemas
    }

  
  });

app.post("/login", async (req, res) => {
  const datos = {
    usuario: req.body.usuario,
    password: req.body.password
  };

    const user = await TipoUsuario.findOne( {where: { usuario: datos.usuario }});
   
    if (user) {
    // compara password del usuario con password hasheado en la BD
    
    const validPassword = await bcrypt.compare(datos.password, user.password);
    console.log(validPassword);
    console.log(user.password);
    if (validPassword) {
     
      res.render('menu', {user});
      
    //configurar la session para no autenticar en cada requerimiento
      
    //req.session.usuario= datos.usuario;
    //req.session.rol = datos.rol;
    //res.send(`haz iniciado sesion como ${req.session.usuario}`);
    } else {
    res.status(400).json({ error: "Password Inválido" });
    res.render('principal')
    }
    } else {
    res.status(401).json({ error: "El usuario no existe" });
    res.render('principal');
    }
  });   

  app.use(session({
    secret: 'secret',
    resave:true,
    saveUninitialized: true
  }))
  
app.get(`/editar-pass/:id`, async (req, res) => {
  const dato = req.params.id;
  console.log(dato)
  const user = await TipoUsuario.findByPk(dato);
  //console.log(examen.nombre_analisis)
    res.render('cambiarPassword', {user})
});

app.post(`/editar-pass`, async (req, res) => {

    // generar salt para hashear el password
const salt = await bcrypt.genSalt(10);

const hash = await bcrypt.hash(req.body.password, salt);
   
   let  usuario= req.body.usuario;
   const password = hash;
   TipoUsuario.update(password,  {where: { usuario: usuario }})
  
    .then(() => {
      let user = TipoUsuario.findOne( {where: { usuario: usuario }});
      res.render('menu', {user})
    })
    .catch(error => {
      console.error('Error al actualizar el usuario:', error);

    });

});  



app.listen(3030, () => { console.log("corriendo") });