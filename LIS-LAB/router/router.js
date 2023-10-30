import express, { Router } from 'express';
const router = Router();
import { Persona } from '../models/persona.js';
import { Examen } from '../models/examen.js';
const app = express();
import path from 'path';
import { render } from 'pug';


app.set('view engine', 'pug');
app.set('views', './vistas');

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('menu')
})
app.get('/orden', (req, res) => {
  res.render('orden');
});
app.get('/cargarPaciente', (req, res) => {
  res.render('cargarPaciente');
});

app.get('/editar/:id', async (req, res) => {
  const pacienteId = req.params.id;
  const paciente = await Persona.findByPk(pacienteId);
  res.render('editar', { paciente });

});

app.get('/nuevaOrden/:id', async (req, res) => {
  const pacienteId = req.params.id;
  const paciente = await Persona.findByPk(pacienteId);
  res.render('nuevaOrden');

});

app.get('/api/personas', async (req, res) => {
  try {
    const personas = await Persona.findAll(); // Esto asume que tienes un modelo "Persona"

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
    pacientes = await Persona.findAll({ where: { nombre: valor } });
  } else if (criterio === 'dni') {
    pacientes = await Persona.findAll({ where: { dni: valor } });
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
app.post('/buscar-examen', async (req, res) => {
  const {valor} = req.body;
  let examenes = [];
  examenes = await Examen.findAll({ where: { nombre_analisis: valor } });
  res.render('examen', {examenes});
 
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
    const { nombre_analisis, tipo_muestra, dias_demora, nota } = req.body;
    await Examen.create({
      nombre_analisis, tipo_muestra, dias_demora, nota
    });
    res.render('menu.html', {
      mensaje: ('Los datos se cargaron correctamente')
    });

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


app.listen(3030, () => { console.log("corriendo") });