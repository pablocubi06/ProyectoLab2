const fechaInput = document.getElementById("fechaInput");
const fechaActual = new Date();
const anio = fechaActual.getFullYear();
  const mes = (fechaActual.getMonth() + 1).toString().padStart(2, '0');
  const dia = fechaActual.getDate().toString().padStart(2, '0');
const fechaActualok = `${anio}-${mes}-${dia}`;
console.log(dia)
console.log(mes)
console.log(anio)
console.log(fechaActualok)
fechaInput.value = fechaActualok
console.log(fechaInput.value)