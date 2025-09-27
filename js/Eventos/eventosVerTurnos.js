
import { recuperarTurnos, cancelarTurno } from '../funciones.js';   

recuperarTurnos();

let indexSeleccionado = null; // guardamos el turno que el usuario quiere cancelar

const tablaDeTurnos = document.getElementById("tabla-turnos");
const modal = document.getElementById("modal-cancelar");
const btnConfirmar = document.getElementById("btn-confirmar-cancelar");
const btnCerrar = document.getElementById("btn-cerrar-modal");

// Delegación de eventos en los botones "Cancelar"
tablaDeTurnos.addEventListener("click", (event) => {
    if (event.target.classList.contains("btn-cancelar")) {
        indexSeleccionado = event.target.getAttribute("data-index");
        modal.classList.remove("hidden"); // mostramos el modal
    }
});

// Botón "Sí, cancelar"
btnConfirmar.addEventListener("click", () => {
    if (indexSeleccionado !== null) {
        cancelarTurno(parseInt(indexSeleccionado));
        indexSeleccionado = null;
    }
    modal.classList.add("hidden"); // cerramos el modal
});

// Botón "No, volver"
btnCerrar.addEventListener("click", () => {
    indexSeleccionado = null;
    modal.classList.add("hidden");

});
