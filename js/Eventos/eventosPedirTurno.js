import { presetearMedico, pedirTurno, inicializarFormulario, presetearUsuario } from '../funciones.js';

// Inicializar selects dependientes
inicializarFormulario();
presetearUsuario();

// Presetear si venís de "Solicitar turno"
presetearMedico();

const formulario = document.getElementById("formulario-turno");

formulario.addEventListener("submit", async event => {
    event.preventDefault();

    // Obtener valores
    const nombre = document.getElementById("nombre").value.trim();
    const apellido = document.getElementById("apellido").value.trim();
    const fechaDeNacimiento = document.getElementById("fecha-nacimiento").value.trim();
    const DNI = document.getElementById("dni").value.trim();
    const especialidad = document.getElementById("especialidad").value;
    const doctor = document.getElementById("doctor").value;
    const fecha = document.getElementById("fecha-turno").value;
    const hora = document.getElementById("hora-turno").value;

    let errores = [];

    // Validaciones básicas
    if (validator.isEmpty(nombre)) errores.push("El nombre es obligatorio");
    if (validator.isEmpty(apellido)) errores.push("El apellido es obligatorio");
    if (!validator.isInt(DNI, { min: 1000000, max: 99999999 })) errores.push("DNI inválido");
    if (validator.isEmpty(especialidad)) errores.push("Debe seleccionar una especialidad");
    if (validator.isEmpty(doctor)) errores.push("Debe seleccionar un doctor");
    if (validator.isEmpty(hora)) errores.push("Hora del turno es obligatoria");

    // Validación fecha de nacimiento
    if (!validator.isDate(fechaDeNacimiento)) {
        errores.push("Fecha de nacimiento inválida");
    } else {
        const nacimientoDate = new Date(fechaDeNacimiento);
        const hoy = new Date();
        const edad = hoy.getFullYear() - nacimientoDate.getFullYear();
        if (edad < 1) errores.push("El paciente debe tener al menos 1 año");
    }

    // Validación fecha del turno
    if (!validator.isDate(fecha)) {
        errores.push("Fecha del turno inválida");
    } else {
        const fechaTurnoDate = new Date(fecha);
        const hoy = new Date();
        hoy.setHours(0,0,0,0); // Para comparar solo la fecha
        if (fechaTurnoDate < hoy) errores.push("La fecha del turno debe ser hoy o posterior");
    }

    // Mostrar errores si los hay
    if (errores.length > 0) {
        Swal.fire({
            icon: 'error',
            title: 'Formulario incompleto',
            html: errores.join('<br>'),
        });
        return;
    }

    // Si pasa la validación, pedir turno
    await pedirTurno(nombre, apellido, fechaDeNacimiento, DNI, especialidad, doctor, fecha, hora);

    // Resetear campos excepto los personales
    const dniInput = document.getElementById("dni");
    const nombreInput = document.getElementById("nombre");
    const apellidoInput = document.getElementById("apellido");
    const fechaNacimientoInput = document.getElementById("fecha-nacimiento");

    formulario.reset();

    // Mantener los datos personales
    nombreInput.value = nombre;
    apellidoInput.value = apellido;
    dniInput.value = DNI;
    fechaNacimientoInput.value = fechaDeNacimiento;

    // Presetear select de médico si venís de "Solicitar turno"
    presetearMedico();
});
