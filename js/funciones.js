

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

    // Obtener turnos existentes del localStorage
    let turnos = JSON.parse(localStorage.getItem("turnos")) || [];
    // Agregar el nuevo turno
    turnos.push(nuevoTurno);
    // Guardar en localStorage
    localStorage.setItem("turnos", JSON.stringify(turnos));
}

export function recuperarTurnos() {
    let turnos = JSON.parse(localStorage.getItem("turnos")) || [];
    let tablaDeTurnos = document.getElementById('tabla-turnos');
    tablaDeTurnos.innerHTML = ""; // Limpia la tabla primero
    for (let index = 0; index < turnos.length; index++) {
        tablaDeTurnos.innerHTML += `
        <tr>
            <td>${turnos[index].dia}</td>
            <td>${turnos[index].hora}</td>
            <td>${turnos[index].especialidad}</td>
            <td>${turnos[index].doctor}</td>
            <td><button data-index="${index}" class="btn-cancelar">Cancelar</button></td>
        </tr>
        `;
    }
}

export async function recuperarMedicos(){
    const response = await fetch('../js/baseDeDatos.json');
    const data = await response.json();
    const medicos = data.medicos;

    let tablaDeMedicos = document.getElementById('tabla-medicos');
    tablaDeMedicos.innerHTML = "";

    medicos.forEach(medico => {
        tablaDeMedicos.innerHTML += `
        <tr>
            <td>${medico.nombre}</td>
            <td>${medico.especialidad}</td>
            <td><a href="./pedirTurno.html"><button>Solicitar turno</button></a></td>
        </tr>`;
    });

    return medicos; 
}

export async function filtrarMedicos(especialidad) {
    const response = await fetch('../js/baseDeDatos.json');
    const data = await response.json();
    const medicos = data.medicos;
    let tablaDeMedicos = document.getElementById('tabla-medicos');
     
    tablaDeMedicos.innerHTML = ""; // Limpia la tabla primero

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

export function cancelarTurno(index) {
    let turnos = JSON.parse(localStorage.getItem("turnos")) || [];
    if (index < 0 || index >= turnos.length) {
        console.warn("Índice inválido. No se pudo cancelar el turno.");
        return;
    }
    turnos.splice(index, 1); 
    localStorage.setItem("turnos", JSON.stringify(turnos));
    recuperarTurnos(); 
}
