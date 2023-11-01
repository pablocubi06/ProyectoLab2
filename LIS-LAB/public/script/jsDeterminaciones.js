// Importar el módulo Sequelize
import { Examen } from '../models/examen.js';


// Crear una función que busque el tipo de examen especificado en la tabla de exámenes
const buscarTipoExamen = async () => {
  const examenes = await Examen.findAll({
  });
return examenes;
};

// Ejecutar la función y obtener los resultados
const examenes = buscarTipoExamen();

// Crear un option para cada resultado
const options = examenes.map((examen) => {
  return (
    <option value={examen.codigo}>{examen.nombre_analisis}</option>
  );
});

// Agregar los options al elemento DOM correspondiente
const select = document.querySelector("#examenes");
select.innerHTML = options.join("");