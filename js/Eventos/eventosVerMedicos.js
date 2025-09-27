
import { recuperarMedicos, filtrarMedicos, solicitarTurno } from '../funciones.js';

// Al cargar la página, muestra todos los médicos
localStorage.removeItem('medicoSeleccionado');
recuperarMedicos();

const selectEspecialidad = document.getElementById('especialidad');
selectEspecialidad.addEventListener('change', (e) => {
    const valor = e.target.value;
    if (valor === "") {
        recuperarMedicos(medicos);
    } else {
        // Convierte el valor a formato de especialidad (por ejemplo: "pediatria" => "Pediatría")
        const especialidadFormateada = {
            "clinica-medica": "Clínica Médica",
            "pediatria": "Pediatría",
            "ginecologia": "Ginecología",
            "cardiologia": "Cardiología",
            "dermatologia": "Dermatología",
            "traumatologia": "Traumatología"
        }[valor];
        filtrarMedicos(especialidadFormateada);
    }
});

const tablaMedicos = document.getElementById('tabla-medicos');
tablaMedicos.addEventListener('click', (e) => {
    if (e.target.textContent.trim() === 'Solicitar turno') {
        const fila = e.target.closest('tr');
        const nombre = fila.cells[0].textContent.trim();
        const especialidad = fila.cells[1].textContent.trim();
        console.log('Médico seleccionado:', { nombre, especialidad });
        solicitarTurno(nombre, especialidad);
    }
});


