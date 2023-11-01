$.ajax({
    url: '/cargar-examen',
    type: 'POST',
    success: function(response) {
      // Actualizar el contenido de la página con el mensaje recibido
      $('#mensaje').text(response.message);
    }
  });