let personas; 


fetch('/api/personas') 
  .then(response => response.json())
  .then(data => {
    personas = data; 
  })
  .catch(error => {
    console.error('Error al obtener datos de personas:', error);
  });
  console.log(personas)

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


function llenarTabla(resultados) {
  const tabla = document.getElementById('resultados');
  console.log(tabla)
  
  tabla.innerHTML = '';

  
  resultados.forEach(persona => {
    const fila = tabla.insertRow();
    const celdaNombre = fila.insertCell(0);
    const celdaDNI = fila.insertCell(1);
    const celdaEmail = fila.insertCell(2);
    const celdaAccion = fila.insertCell(3);
    

    celdaNombre.textContent = persona.nombre;
    celdaDNI.textContent = persona.dni;
    celdaEmail.textContent = persona.email;
    const botonEditar = document.createElement('button');
    botonEditar.textContent = 'Editar';
    botonEditar.addEventListener('click', () => {
      
      window.location.href = `/editar/${persona.dni}`;
    });
    const botonCargar = document.createElement('button');
    botonCargar.textContent = 'Cargar Orden';
    botonCargar.addEventListener('click', () => {
     
      window.location.href = `/nuevaOrden/${persona.id}`;
    });
    
    celdaAccion.appendChild(botonEditar);
    celdaAccion.appendChild(botonCargar);
   
  
  
  });
}