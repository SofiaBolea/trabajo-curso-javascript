import { presetearMedico, pedirTurno, inicializarFormulario } from '../funciones.js';

// Inicializar selects dependientes
inicializarFormulario();

// Presetear si venís de "Solicitar turno"
presetearMedico();

const formulario = document.getElementById("formulario-turno");

formulario.addEventListener("submit", event => {
    event.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const fechaDeNacimiento = document.getElementById("fecha-nacimiento").value;
    const DNI = document.getElementById("dni").value;
    const especialidad = document.getElementById("especialidad").value;
    const doctor = document.getElementById("doctor").value;
    const fecha = document.getElementById("fecha-turno").value;
    const hora = document.getElementById("hora-turno").value;

    pedirTurno(nombre, apellido, fechaDeNacimiento, DNI, especialidad, doctor, fecha, hora);

    formulario.reset();
    presetearMedico(); // Mantener preselección si venís de solicitud
});
