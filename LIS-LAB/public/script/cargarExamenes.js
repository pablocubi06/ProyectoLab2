const fs = require('fs');
const pug = require('pug');

const tabla = document.getElementById('examenes');
const tablaSeleccionados = document.getElementById('seleccionados'); // Referencia a la segunda tabla
let examenesSeleccionados = [];
let examenes;
let examenID = [];
fetch('/api/examenes')
.then(response => {
  if (!response.ok) {
    throw new Error(`Error al obtener datos de personas. Código de estado HTTP: ${response.status}`);
  }
  return response.json();
})
.then(data => {
    examenes = data;
  })
  .catch(error => {
    console.error('Error al obtener datos de exámenes:', error);
  });
  
  const inputBusqueda = document.getElementById('valor');

inputBusqueda.addEventListener('keyup', () => {
    const valorBusqueda = inputBusqueda.value.toLowerCase();
    console.log(valorBusqueda)
  
    const resultados = buscarEnDatos(valorBusqueda,examenes);
    
    llenarTabla(resultados);
  });

function buscarEnDatos(valor, datos) {
    return datos.filter(examen => {
      const nombre = examen.nombre_analisis.toLowerCase();
       return nombre.indexOf(valor) !== -1;
          
      }
  
 );}
 function llenarTabla(resultados){
    tabla.innerHTML = '';

    resultados.forEach(examen => {
      const fila = tabla.insertRow();
      const celdaId = fila.insertCell(0);
      const celdaCodigo = fila.insertCell(1);
      const celdaNombre = fila.insertCell(2);
      const celdaTipoMuestra = fila.insertCell(3);
      const celdaAccion = fila.insertCell(4);

      celdaId.textContent = examen.id;
      celdaCodigo.textContent = examen.codigo;
      celdaNombre.textContent = examen.nombre_analisis;
      celdaTipoMuestra.textContent = examen.tipo_muestra;

      const botonAgregar = document.createElement('button');
      botonAgregar.textContent = 'Agregar';
      botonAgregar.addEventListener('click', (event) => {
        event.preventDefault();
        const examenExistente = examenesSeleccionados.find(e => e.id === examen.id);
  
        if (!examenExistente) {
          examenesSeleccionados.push(examen);
          
          actualizarTablaSeleccionados();
        }
      });

      celdaAccion.appendChild(botonAgregar);
    });
  }

function actualizarTablaSeleccionados() {
  tablaSeleccionados.innerHTML='';

  examenesSeleccionados.forEach(examen => {
    const fila = tablaSeleccionados.insertRow();
    const celdaId = fila.insertCell(0);
    const celdaCodigo = fila.insertCell(1);
    const celdaNombre = fila.insertCell(2);
    const celdaTipoMuestra = fila.insertCell(3);
    const celdaAccion = fila.insertCell(4);
    examenID.push(examen.id);
    celdaId.textContent = examen.id;
    celdaCodigo.textContent = examen.codigo;
    celdaNombre.textContent = examen.nombre_analisis;
    celdaTipoMuestra.textContent = examen.tipo_muestra;
    const botonEliminar = document.createElement('button');
      botonEliminar.textContent = 'Eliminar';
      botonEliminar.addEventListener('click', (event) => {
        event.preventDefault();
        const examenExistente = examenesSeleccionados.find(e => e.id === examen.id);
  
          examenesSeleccionados.pop(examen);
          examenID.pop(examen);
          actualizarTablaSeleccionados();
        
      });

      celdaAccion.appendChild(botonEliminar);
    });

  
  diasDemora();
  fechaEntrega();
}

function diasDemora(){
  if (examenesSeleccionados.length === 0) {
    return null; 
  }

  //  map para crear un arreglo de los números de días
  const dias = examenesSeleccionados.map(examen => examen.dias_demora);

  //  Math.max para encontrar el número más grande en el arreglo de días
  const diasMasLargos = Math.max(...dias);
  document.getElementById('dias').value = diasMasLargos;
}
function fechaEntrega() {
  const entrega = document.getElementById('entrega');
  const actual = new Date(document.getElementById('fechaInput').value); // Convierte la fecha a un objeto Date
  const dias = parseInt(document.getElementById('dias').value); // Convirte la cantidad de días a un número entero

  if (!isNaN(dias)) {
    actual.setDate(actual.getDate() + dias); 
    entrega.value = actual.toISOString().split('T')[0]; // Formatear y muestrar la nueva fecha en el campo de entrega
  } else {
    console.log('La cantidad de días no es un número válido.');
  }
}
document.getElementById('enviarDatos').addEventListener('click', () => {
 
  const idPaciente = document.getElementById('dni').value;
  const fechaCreacion = document.getElementById('fechaInput').value;
  const fechaEntrega = document.getElementById('entrega').value;
console.log(idPaciente)

  // Crea un objeto con los valores a enviar al servidor
  const dataToSend = {
    idExamen: examenID,
    idPaciente: idPaciente,
    fechaCreacion: fechaCreacion,
    fechaEntrega : fechaEntrega  
      };

  // Enviar los datos al servidor
  fetch('/cargarOrden', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dataToSend),
  })
  .then(response => response.json())

  .catch(error => {
    // Maneja cualquier error en la solicitud
    console.error('Error en la solicitud POST:', error);
  });
});

function imprimir(){
   // Datos para las etiquetas (reemplaza estos valores con los correctos)
   const datos = {
    numeroOrden: '1',
    nombrePaciente: document.getElementById('nombre').value,
    fecha: document.getElementById('fechaInput').value,
  };

  // Realizar una solicitud AJAX para obtener las etiquetas renderizadas
  fetch('/imprimirEtiquetas', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(datos),
  })
    .then((response) => response.text())
    .then((contenidoAImprimir) => {
      const ventana = window.open('', 'VentanaDeImpresion', 'width=800,height=600');
      ventana.document.write(contenidoAImprimir);
      ventana.document.close();
      ventana.print();
    });
}
