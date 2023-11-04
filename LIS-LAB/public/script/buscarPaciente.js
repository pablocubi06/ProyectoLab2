let personas; // Variable para almacenar los datos de personas

// Realiza la solicitud GET y almacena el resultado en la variable "personas"
fetch('/api/personas') // Ajusta la ruta a tu aplicación
  .then(response => response.json())
  .then(data => {
    personas = data; // "personas" contiene los datos como un objeto JavaScript
  })
  .catch(error => {
    console.error('Error al obtener datos de personas:', error);
  });
  console.log(personas)
// EventListener para el evento "keyup" en el campo de búsqueda
const inputBusqueda = document.getElementById('valor');
console.log(inputBusqueda)
inputBusqueda.addEventListener('keyup', () => {
    const valorBusqueda = inputBusqueda.value.toLowerCase();
    const criterio = document.getElementById('criterio').value; 
    console.log(valorBusqueda)
    console.log(criterio)
    const resultados = buscarEnDatos(valorBusqueda, personas, criterio);
    
    llenarTabla(resultados);
  });
// Función para buscar en los datos locales
function buscarEnDatos(valor, datos, criterio) {
    return datos.filter(persona => {
      const nombre = persona.nombre.toLowerCase();
      const dni = persona.dni;
      const email = persona.email.toLowerCase();
  
      switch (criterio) {
        case 'nombre':
          return nombre.indexOf(valor) !== -1;
        case 'dni':
          return dni.indexOf(valor) !== -1;
        case 'email':
          return email.indexOf(valor) !== -1;
      
      }
    });
  }

// Función para llenar la tabla con los resultados
function llenarTabla(resultados) {
  const tabla = document.getElementById('resultados');
  console.log(tabla)
  // Limpia la tabla antes de llenarla con los nuevos resultados
  tabla.innerHTML = '';

  // Llena la tabla con los resultados
  resultados.forEach(persona => {
    const fila = tabla.insertRow();
    const celdaNombre = fila.insertCell(0);
    const celdaDNI = fila.insertCell(1);
    const celdaEmail = fila.insertCell(2);
    const celdaAccion = fila.insertCell(3);
    // Añade más celdas según las columnas de tu tabla

    celdaNombre.textContent = persona.nombre;
    celdaDNI.textContent = persona.dni;
    celdaEmail.textContent = persona.email;
    const botonEditar = document.createElement('button');
    botonEditar.textContent = 'Editar';
    botonEditar.addEventListener('click', () => {
      // Aquí puedes redirigir al usuario a la página de edición
      window.location.href = `/editar/${persona.dni}`;
    });
    const botonCargar = document.createElement('button');
    botonCargar.textContent = 'Cargar Orden';
    botonCargar.addEventListener('click', () => {
      // Aquí puedes redirigir al usuario a la página de edición
      window.location.href = `/nuevaOrden/${persona.id}`;
    });
    // Agrega el botón al elemento celdaAccion
    celdaAccion.appendChild(botonEditar);
    celdaAccion.appendChild(botonCargar);
    // Asigna más valores a las celdas según tus datos
  
  
  });
}