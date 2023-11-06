const examenesSelect = document.getElementById('examenes'); 
let examenes;


fetch('/api/examenes')
  .then(response => response.json())
  .then(data => {
    examenes = data;

    // Crea una opción predeterminada y agrégala al select
    const defaultOption = document.createElement('option');
    defaultOption.value = ''; 
    defaultOption.textContent = 'Seleccione un examen';
    examenesSelect.appendChild(defaultOption);

    // Itera sobre los datos y crea opciones para el select
    examenes.forEach(examen => {
      const option = document.createElement('option');
      option.value = examen.codigo; 
      option.textContent = examen.nombre_analisis; 
      examenesSelect.appendChild(option); 
    });
  })
  .catch(error => {
    console.error('Error al obtener datos de exámenes:', error);
  });