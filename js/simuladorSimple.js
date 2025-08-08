// Declaración de constantes y variables
const especialidades = ["Clínico", "Pediatra", "Dermatólogo", "Cardiólogo"];
let turnos = []; // Almacena turnos registrados
let contadorTurnos = 1;

// Solicitar turno
function solicitarTurno() {
  const nombre = prompt("Ingrese su nombre:");
  if (!nombre) {
    alert("Debe ingresar un nombre válido.");
    return;
  }

  const especialidad = prompt(
    "Elija una especialidad (ESCRIBIR TAL CUAL APARECE EL NOMBRE EN PANTALLA):\n" +
      especialidades.join("\n")
  );
  if (!especialidades.includes(especialidad)) {
    alert("Especialidad no válida. Intente nuevamente.");
    return;
  }

  const fecha = prompt("Ingresá la fecha del turno (formato YYYY-MM-DD):");
  if (!fecha) {
    alert("Fecha no válida. Intente nuevamente.");
    return;
  }
  const hora = prompt("Ingresá la hora del turno (formato HH:MM):");
  if (!hora) {
    alert("Hora no válida. Intente nuevamente.");
    return;
  }

  const turno = "TURNO-" + contadorTurnos++;
  turnos.push({ nombre, especialidad, turno, fecha, hora });

  alert(
    `Turno asignado:\nNombre: ${nombre}\nEspecialidad: ${especialidad}\nCódigo: ${turno} \nFecha: ${fecha}\nHora: ${hora}`
  );
  console.log("Turnos actuales:", turnos);
}

// Función 2: Ver todos los turnos
function verTurnos() {
  if (turnos.length === 0) {
    alert("No hay turnos registrados.");
    return;
  }

  let mensaje = "Listado de turnos:\n";
  for (let i = 0; i < turnos.length; i++) {
    const t = turnos[i];
    mensaje += `${t.turno} - ${t.nombre} - Fecha : ${t.fecha} - Hora : ${t.hora} (${t.especialidad})\n`;
  }

  alert(mensaje);
  console.log("Turnos registrados:", turnos);
}

// Función 3: Cancelar turno
function cancelarTurno() {
  if (turnos.length === 0) {
    alert("No hay turnos registrados para cancelar.");
    return;
  } else {
    const codigo = prompt("Ingrese el código del turno a cancelar:");
    const index = turnos.findIndex((t) => t.turno === codigo);

    if (index === -1) {
      alert("Turno no encontrado.");
      return;
    }

    const confirmar = confirm(
      `¿Está seguro que desea cancelar el turno de ${turnos[index].nombre}?`
    );
    if (confirmar) {
      turnos.splice(index, 1);
      alert("Turno cancelado con éxito.");
    } else {
      alert("Cancelación abortada.");
    }

    console.log("Turnos actualizados:", turnos);
  }
}

// Menú principal
function menu() {
  let salir = false;

  while (!salir) {
    const opcion = prompt(
      "Bienvenido al Simulador de Turnos Médicos\n\n1. Solicitar turno\n2. Ver turnos\n3. Cancelar turno\n4. Salir"
    );

    switch (opcion) {
      case "1":
        solicitarTurno();
        break;
      case "2":
        verTurnos();
        break;
      case "3":
        cancelarTurno();
        break;
      case "4":
        salir = true;
        alert("¡Gracias por usar el simulador!");
        break;
      default:
        alert("Opción inválida. Intente de nuevo.");
    }
  }
}

// Inicia el simulador
menu();
