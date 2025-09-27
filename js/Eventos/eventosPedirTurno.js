
import { presetearMedico, pedirTurno } from '../funciones.js';

// eventosPedirTurno.js
presetearMedico();

const formulario = document.getElementById("formulario-turno");

if (formulario) {
    formulario.addEventListener("submit", function (event) {
    // Previene el comportamiento predeterminado del formulario:
    event.preventDefault();

    // Se obtienen los valores de los campos del formulario:
    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const fechaDeNacimiento = document.getElementById("fecha-nacimiento").value;
    const DNI = document.getElementById("dni").value;
    const especialidad = document.getElementById("especialidad").value;
    const doctor = document.getElementById("doctor").value;
    const fecha = document.getElementById("fecha-turno").value;
    const hora = document.getElementById("hora-turno").value;
    pedirTurno(nombre, apellido, fechaDeNacimiento, DNI, especialidad, doctor, fecha, hora)
    // Se limpian los campos del formulario
    formulario.reset()
});}