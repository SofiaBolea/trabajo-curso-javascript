import { medicos } from './baseDeDatos.js';
import { recuperarMedicos, filtrarMedicos, solicitarTurno } from './funciones.js';

// Al cargar la página, muestra todos los médicos
document.addEventListener('DOMContentLoaded', () => {
    recuperarMedicos(medicos);

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
            // Obtener la fila (tr) que contiene el botón
            const fila = e.target.closest('tr');
            
            // Obtener el nombre del médico y especialidad
            const nombre = fila.cells[0].textContent.trim();
            const especialidad = fila.cells[1].textContent.trim();
            
            // Guardar los datos
            console.log('Médico seleccionado:', { nombre, especialidad });
            
            // Aquí puedes hacer lo que necesites con los datos
            solicitarTurno(nombre, especialidad);
        }
    });
});

