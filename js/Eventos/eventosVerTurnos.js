
import { recuperarTurnos, cancelarTurno } from '../funciones.js';

recuperarTurnos();

let indexSeleccionado = null; // guardamos el turno que el usuario quiere cancelar

const tablaDeTurnos = document.getElementById("tabla-turnos");


// Delegación de eventos en los botones "Cancelar"
tablaDeTurnos.addEventListener("click", (event) => {
    if (event.target.classList.contains("btn-cancelar")) {
        const indexSeleccionado = event.target.getAttribute("data-index");

        Swal.fire({
            title: '¿Seguro que querés cancelar este turno?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, cancelar',
            iconColor: '#d6ff7f',
            cancelButtonText: 'No, volver',
            customClass: {
                confirmButton: 'button',   
                cancelButton: 'button'     
            },
            
            buttonsStyling: false, 
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                cancelarTurno(parseInt(indexSeleccionado));
            }
        });
    }
});