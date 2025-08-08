function guardarTurno() {
  const nombre = document.getElementById("nombre").value;
  const dni = document.getElementById("dni").value;
  const edad = parseInt(document.getElementById("edad").value);
  const especialidad = document.getElementById("especialidad").value;
  const fechaInput = document.getElementById("fecha").value;
  const hora = document.getElementById("hora").value;

  // Convertir fecha a formato legible
  const fechaObjeto = new Date(fechaInput + "T" + hora);
  const opciones = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const fechaLegible = fechaObjeto.toLocaleDateString("es-AR", opciones);
  const horaLegible = fechaObjeto.toLocaleTimeString("es-AR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const nuevoTurno = {
    nombre,
    dni,
    edad,
    especialidad,
    fecha: fechaLegible,
    hora: horaLegible,
  };

  alert("Turno solicitado con éxito.");
  console.log("Nuevo turno:", nuevoTurno);
  
}


const form = document.getElementById("form-turno");
form.addEventListener("submit", function (event) {
  event.preventDefault(); // Evita que se recargue la página

  let confirmacion = confirm("¿Estás segura de que querés solicitar el turno?");

  if (confirmacion) {
    guardarTurno(); 
    form.reset(); // Limpia el formulario solo si se confirmó
  } else {
    alert("Solicitud de turno cancelada.");
  }
});


