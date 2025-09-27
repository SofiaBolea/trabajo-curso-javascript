import { turnos, medicos } from './baseDeDatos.js';

AOS.init();

export function pedirTurno(nombre, apellido, fechaDeNacimiento, DNI, especialidad, doctor, fecha, hora) {
    const nuevoTurno = {
        nombre: nombre,
        apellido: apellido,
        fechaDeNacimiento: fechaDeNacimiento,
        dni: DNI,
        dia: fecha,
        hora: hora,
        especialidad: especialidad,
        doctor: doctor
    };

    turnos.push(nuevoTurno);
}

export function recuperarTurnos(turnos) {
    let tablaDeTurnos = document.getElementById('tabla-turnos');
    tablaDeTurnos.innerHTML = ""; // Limpia la tabla primero
    for (let index = 0; index < turnos.length; index++) {
        tablaDeTurnos.innerHTML += `
        <tr>
            <td>${turnos[index].dia}</td>
            <td>${turnos[index].hora}</td>
            <td>${turnos[index].especialidad}</td>
            <td>${turnos[index].doctor}</td>
            <td><button>Cancelar</button></td>
        </tr>
        `;
    }
}

export function recuperarMedicos(medicos) {
    let tablaDeMedicos = document.getElementById('tabla-medicos');

    tablaDeMedicos.innerHTML = ""; // Limpia la tabla primero
    for (let index = 0; index < medicos.length; index++) {
        tablaDeMedicos.innerHTML += `
        <tr>
            <td>${medicos[index].nombre}</td>
            <td>${medicos[index].especialidad}</td>
            <td> <a href="./pedirTurno.html"> <button>Solicitar turno</button> </a> </td>
        </tr>
        `;
    }
}

export function filtrarMedicos(especialidad) {
    let tablaDeMedicos = document.getElementById('tabla-medicos');
    tablaDeMedicos.innerHTML = ""; // Limpia la tabla antes de mostrar los resultados

    const medicosFiltrados = medicos.filter(medico => medico.especialidad === especialidad);
    for (let index = 0; index < medicosFiltrados.length; index++) {
        tablaDeMedicos.innerHTML += `
        <tr>
            <td>${medicosFiltrados[index].nombre}</td>
            <td>${medicosFiltrados[index].especialidad}</td>
            <td> <a href="./pedirTurno.html"> <button>Solicitar turno</button> </a> </td>
        </tr>
        `;
    }
}

export function solicitarTurno(nombreMedico, especialidad) {
    const medicoSeleccionado = {
        nombre: nombreMedico,
        especialidad: especialidad
    };

    localStorage.setItem('medicoSeleccionado', JSON.stringify(medicoSeleccionado));
    console.log('Datos guardados:', medicoSeleccionado);
}

// Función para mapear especialidad a value del select
function mapearEspecialidadAValue(especialidad) {
    const mapeoEspecialidades = {
        "Clínica Médica": "clinica-medica",
        "Pediatría": "pediatria",
        "Ginecología": "ginecologia",
        "Cardiología": "cardiologia",
        "Dermatología": "dermatologia",
        "Traumatología": "traumatologia"
    };

    return mapeoEspecialidades[especialidad] || null;
}

// Función para mapear nombre del doctor a value del select
function mapearDoctorAValue(nombreDoctor) {
    const mapeoMedicos = {
        "Dra. Ana López": "ana-lopez",
        "Dr. Juan Pérez": "juan-perez",
        "Dra. Marta Gómez": "marta-gomez",
        "Dr. Carlos Ruiz": "carlos-ruiz",
        "Dra. Sofía Méndez": "sofia-mendez",
        "Dr. Lucas Fernández": "lucas-fernandez"
    };

    return mapeoMedicos[nombreDoctor] || null;
}

function limpiarMedicoSeleccionado() {
    localStorage.removeItem('medicoSeleccionado');
}

export function presetearMedico() {

    // Validar si existe la variable en localStorage
    const medicoData = localStorage.getItem('medicoSeleccionado');

    if (medicoData) {
        // Parsear los datos
        const medico = JSON.parse(medicoData);
        // Presetear el select de especialidad
        const selectEspecialidad = document.getElementById('especialidad');
        if (selectEspecialidad) {

            const especialidadValue = mapearEspecialidadAValue(medico.especialidad);
            if (especialidadValue) {
                selectEspecialidad.value = especialidadValue;
            }
        }

        // Presetear el select de doctor
        const selectDoctor = document.getElementById('doctor');
        if (selectDoctor) {
            const doctorValue = mapearDoctorAValue(medico.nombre);
            if (doctorValue) {
                selectDoctor.value = doctorValue;
            }
        }

        limpiarMedicoSeleccionado();
        return;
    }
    return false;
}

