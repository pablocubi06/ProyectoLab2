import express, { Router } from 'express';
const router = Router();
import { Persona } from '../models/persona.js';
const app = express();
import path from 'path';
import { render } from 'pug';


app.set('view engine', 'pug');
app.set('views','../vistas');
app.use(express.urlencoded({ extended: true }));

app.get('/',  (req, res) => {
        res.render('orden');
          });
app.get('/cargarPaciente',(req,res)=>{
    res.render('cargarPaciente');
});

app.get('/editar/:id',async (req, res) => {
    const pacienteId = req.params.id;
   console.log(pacienteId)
    const paciente = await Persona.findByPk(pacienteId);
    console.log(paciente.nombre)
     res.render('editar', { paciente });
   
  });

app.post('/buscar', async (req, res) => {
            const {criterio, valor } = req.body;
            let pacientes = [];
          
            if (criterio === 'nombre') {
              pacientes = await Persona.findAll({ where:{nombre: valor } });
            } else if (criterio === 'dni') {
              pacientes = await Persona.findAll({ where:{dni: valor } });
            } else if (criterio === 'email') {
              pacientes = await Persona.findAll({ where: { email: valor } });
            }
       
            res.render('orden', { pacientes });
          });

app.post('/cargar-paciente', async (req, res) => {
  try {
    // Obtén los datos del formulario
    const {
      dni, apellido, nombre, sexo, fecha_nac, ciudad_nac, pais_nac, embarazada, pre_diagnostico,
      patolog_prev, tipo_usuario, email, telefono
    } = req.body;

    // Crea un nuevo paciente en la base de datos usando el modelo Paciente
    await Persona.create({
      dni, apellido, nombre, sexo, fecha_nac, ciudad_nac, pais_nac, embarazada, pre_diagnostico,
      patolog_prev, tipo_usuario, email, telefono
    });

    // Redirige a una página de éxito o a donde desees
    res.render('orden');
  } catch (error) {
    console.error('Error al cargar paciente:', error);
    res.redirect('/error'); // Página de error en caso de problemas
  }
});


// Ruta para procesar el formulario de edición (POST)
app.post('/guardar-edicion', (req, res) => {
    const pacienteId = req.body.dni;
    const nuevosDatos = {
        dni: req.body.dni,
        apellido: req.body.apellido,
        nombre: req.body.nombre,
        sexo: req.body.sexo,
        fecha_nac: req.body.fecha_nac,
        ciudad_nac: req.body.ciudad_nac,
        pais_nac: req.body.pais_nac,
        embarazada: req.body.embarazada,
        pre_diagnostico: req.body.pre_diagnostico,
        patolog_prev: req.body.patolog_prev,
        tipo_usuario: req.body.tipo_usuario,
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





  
  app.listen(3030,()=>{console.log("corriendo")});