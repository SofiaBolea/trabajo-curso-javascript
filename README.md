## trabajo-curso-javascript
Comisión 80890 Javascript - CoderHouse - Alumna :  Sofía Bolea Maldonado



# Idea de proyecto
La idea de este proyecto es que sea el front de un manejador de turnos online de algún establecimiento sanitario.
En este caso, como ejemplo, el establecimiento es "Vida Sana".

## Detalles
Con el objetivo de simular datos recopilados de una base de datos, creé un archivo "baseDeDatos.js" para poder manejar listas de objetos que en la realidad se obtendrían de una base de datos.

## Funciones actuales
En este momento las funcionalidades js aprendidas se pueden observar en "verMedicos.html":

- Filtro de lista de médicos segun la especialidad seleccionada. Esta funcionalidad se activa en el momento en que se carga la página, si no hay una especialidad seleccionada, se mostrará la lista de medicos completa.
- Cambios en la estructura HTML añadiendo elementos a la tabla.
- El usuario podrá avanzar a la pagina "pedirTurno.html" haciendo click en el boton que se muestra en la tabla "solicitar turno". Este botón ademas de llevarlo a la página "pedirTurno.html" guardará el nombre del médico seleccionado y la especialidad del mismo.
- Si el usuario decide clickear en el boton "solicitar turno", los valores guardados del médico seleccionado se presetearán en los campos "medico" y "especialidad" del formulario, ahorrando asi un paso al usuario.

## Funcionalidades a agregar 

- Poder solicitar un turno. Una vez cargado el formulario se agregará el turno a la lista de turnos. Una vez agregado el turno a la lista de turnos, se mostrará el mensaje "Turno solicitado con éxito" en una ventana modal.
- La ventana modal usada para la muestra del mensaje "Turno solicitado con éxito" tendra un boton "verTurnos". Al hacer click en ese boton se redirige a la página "verTurnos.html". También contará con un botón para cerrar el modal. Cualdo haga click en ese botón el usuario permanecerá en la página "pedirTurno" pero esta se actualizará para borrar los datos cargados (solo quedarán precargados los datos nombre, apellido, DNI, fecha de nacimiento)
- Validación para que el usuario solo pueda solicitar turnos y ver turnos si está logueado en la página.
- Iniciar Sesion. Se solicitará e-mail y contraseña
- Registrarse. Para el registro se solicitará Nombre, apellido, DNI, fecha de nacimiento, e-mail, contraseña y una confirmación de contraseña. 
- Se usarán los datos cargados en el registro (nombre, apellido, DNI, fecha de nacimiento) para precompletar el formulario de la página "pedirTurno.html", con el objetivo de ahorrar pasos a los usuarios.
- En la página "verTurnos.html" se observaran los turnos de la lista de turnos. En el caso de que no haya ningun turno se mostrará el mensaje "aún no hay turnos".
- La tabla en la que se muestran los turnos, tendrá una columna con botones "cancelar" (cada uno que corresponda a un turno específico). Este botón permitirá al usuario cancelar el turno. Cuando haga click sobre el se abrirá una ventana modal con el mensaje "¿seguro que desea cancelar el turno?". En la ventana modal también habrá dos botones. El primero es "cerrar", estará a la izquierda y permitirá cerrar la ventana modal sin cancelar el turno y manteniendose en la página "verturnos". El segundo botón será "Cancelar Turno", el cual eliminará el turno de la lista de turnos, cerrará la ventana modal actual y abrirá otra de confirmación. 
- Ventana modal de confirmación de eliminación: se abrirá una vez presionado el botón "Cancelar Turno". Esta ventana mostrará un mensaje de éxito "Turno cancelado con éxito". (En este caso, solo muestra mensaje de éxito ya que no se realizará ninguna validación real con una base de datos). Esta ventana se podrá cerrar haciendo click en cualquier parte de la pantalla fuera de la ventana modal. Una vez que se cierra esta ventana modal, el usuario permanece en la página "verTurnos.html"

