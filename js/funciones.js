
AOS.init();


// Mapeos para mostrar nombres completos y especialidades correctamente
const formatoDoctor = {
    "ana-lopez": "Dra. Ana López",
    "juan-perez": "Dr. Juan Pérez",
    "marta-gomez": "Dra. Marta Gómez",
    "sofia-mendez": "Dra. Sofía Méndez",
    "carlos-ruiz": "Dr. Carlos Ruiz",
    "lucas-fernandez": "Dr. Lucas Fernández",
    "roberto-silva": "Dr. Roberto Silva",
    "carmen-vega": "Dra. Carmen Vega",
    "miguel-torres": "Dr. Miguel Torres",
    "patricia-ramos": "Dra. Patricia Ramos",
    "fernando-castro": "Dr. Fernando Castro",
    "laura-morales": "Dra. Laura Morales"
};

const formatoEspecialidad = {
    "clinica-medica": "Clínica Médica",
    "pediatria": "Pediatría",
    "ginecologia": "Ginecología",
    "cardiologia": "Cardiología",
    "dermatologia": "Dermatología",
    "traumatologia": "Traumatología"
};

// Mapeo especialidad -> médicos
const medicosPorEspecialidad = {
    "clinica-medica": ["carlos-ruiz", "patricia-ramos"],
    "pediatria": ["ana-lopez","roberto-silva"],
    "ginecologia": ["fernando-castro", "sofia-mendez"],
    "cardiologia": [ "juan-perez", "carmen-vega"],
    "dermatologia": ["marta-gomez", "miguel-torres"],
    "traumatologia": ["laura-morales", "lucas-fernandez"]
};

// Inicializar dependencias entre selects
export function inicializarFormulario() {
    const selectEspecialidad = document.getElementById("especialidad");
    const selectDoctor = document.getElementById("doctor");

    // Cuando cambia la especialidad -> filtra médicos
    selectEspecialidad.addEventListener("change", () => {
        const esp = selectEspecialidad.value;
        selectDoctor.innerHTML = `<option value="">Selecciona un doctor</option>`;

        if (esp && medicosPorEspecialidad[esp]) {
            medicosPorEspecialidad[esp].forEach(key => {
                selectDoctor.innerHTML += `<option value="${key}">${formatoDoctor[key]}</option>`;
            });
        }
    });

    // Cuando cambia el doctor -> autocompleta especialidad
    selectDoctor.addEventListener("change", () => {
        const doctorKey = selectDoctor.value;
        if (!doctorKey) return;

        for (const [esp, medicos] of Object.entries(medicosPorEspecialidad)) {
            if (medicos.includes(doctorKey)) {
                selectEspecialidad.value = esp;
                break;
            }
        }
    });
}

// Solicitar turno
export function pedirTurno(nombre, apellido, fechaDeNacimiento, DNI, especialidad, doctor, fecha, hora) {

    const nuevoTurno = { nombre, apellido, fechaDeNacimiento, dni: DNI, dia: fecha, hora, especialidad, doctor };

    let turnos = JSON.parse(localStorage.getItem("turnos")) || [];
    turnos.push(nuevoTurno);
    localStorage.setItem("turnos", JSON.stringify(turnos));

    Swal.fire({
        title: 'Turno solicitado con éxito',
        icon: 'success',
        showCancelButton: true,
        cancelButtonText: 'Seguir agendando',
        confirmButtonText: 'Ver turnos',
        customClass: { confirmButton: 'button', cancelButton: 'button' },
        buttonsStyling: false,
        reverseButtons: true
    }).then(result => {
        if (result.isConfirmed) window.location.href = "./verTurnos.html";
    });
}

// Recuperar turnos con nombres y especialidades en formato humano
export function recuperarTurnos() {
    let turnos = JSON.parse(localStorage.getItem("turnos")) || [];
    const tablaDeTurnos = document.getElementById('tabla-turnos');
    tablaDeTurnos.innerHTML = "";

    turnos.forEach((t, index) => {
        tablaDeTurnos.innerHTML += `
        <tr>
            <td>${t.dia}</td>
            <td>${t.hora}</td>
            <td>${formatoEspecialidad[t.especialidad]}</td>
            <td>${formatoDoctor[t.doctor]}</td>
            <td><button data-index="${index}" class="btn-cancelar">Cancelar</button></td>
        </tr>`;
    });

    // Agregar listeners a botones
    document.querySelectorAll('.btn-cancelar').forEach(btn => {
        btn.addEventListener('click', () => cancelarTurno(btn.dataset.index));
    });
}

// Cancelar turno
export function cancelarTurno(index) {
    let turnos = JSON.parse(localStorage.getItem("turnos")) || [];
    turnos.splice(index, 1);
    localStorage.setItem("turnos", JSON.stringify(turnos));
    recuperarTurnos();

    Swal.fire({
        title: 'Cancelado',
        text: 'El turno fue cancelado correctamente.',
        icon: 'success',
        timer: 2000,
        showConfirmButton: false
    });
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
        "Dr. Lucas Fernández": "lucas-fernandez",
        "Dr. Roberto Silva": "roberto-silva",
        "Dra. Carmen Vega": "carmen-vega",
        "Dr. Miguel Torres": "miguel-torres",
        "Dra. Patricia Ramos": "patricia-ramos",
        "Dr. Fernando Castro": "fernando-castro",
        "Dra. Laura Morales": "laura-morales"
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

