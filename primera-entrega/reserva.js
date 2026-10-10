/**
 * Valida los datos ingresados en el formulario de reservas y muestra los errores.
 * @method validarReserva
 * @return {boolean} Indica si los datos ingresados son validos.
 */
window.validarReserva = () => {
    const nombre = document.getElementById('nombre');
    const personas = document.getElementById('personas');
    const fecha = document.getElementById('fecha');
    const horario = document.getElementById('horario');
    const dialogo = document.getElementById('dialogo-error');
    const mensaje = document.getElementById('dialogo-mensaje');
    const hoy = new Date();
    const fechaMinima = hoy.toISOString().split('T')[0];

    if (!nombre.value.trim()) {
        nombre.value = '';
        mensaje.textContent = 'Error: Por favor ingresa tu nombre.';
        dialogo.showModal();
        nombre.focus();
        return false;
    }

    if (!personas.value || Number(personas.value) <= 0 || !Number.isInteger(Number(personas.value))) {
        personas.value = '';
        mensaje.textContent = 'Error: Por favor ingresa una cantidad de personas valida, mayor a 0.';
        dialogo.showModal();
        personas.focus();
        return false;
    }

    if (!fecha.value) {
        fecha.value = '';
        mensaje.textContent = 'Error: Por favor selecciona una fecha para la reserva.';
        dialogo.showModal();
        fecha.focus();
        return false;
    }

    if (fecha.value < fechaMinima) {
        fecha.value = '';
        mensaje.textContent = 'Error: Por favor selecciona una fecha actual o futura.';
        dialogo.showModal();
        fecha.focus();
        return false;
    }

    if (!horario.value) {
        horario.value = '';
        mensaje.textContent = 'Error: Por favor selecciona un horario para la reserva.';
        dialogo.showModal();
        horario.focus();
        return false;
    }

    mostrarReserva(nombre.value.trim(), personas.value, fecha.value, horario.value);
    return true;
};

/**
 * Calcula y muestra el resumen de la reserva realizada.
 * @method mostrarReserva
 * @param {string} nombreReserva - Nombre de la persona que realiza la reserva.
 * @param {string} cantidadPersonas - Cantidad de personas de la reserva.
 * @param {string} fechaReserva - Fecha seleccionada para la reserva.
 * @param {string} horarioReserva - Horario seleccionado para la reserva.
 * @return {void} Actualiza el resultado visible en la pagina.
 */
const mostrarReserva = (nombreReserva, cantidadPersonas, fechaReserva, horarioReserva) => {
    const resultado = document.getElementById('resultado-reserva');
    const fechaFormateada = new Date(`${fechaReserva}T00:00:00`).toLocaleDateString('es-AR');

    resultado.textContent = `Listo, ${nombreReserva}! Reservamos una mesa para ${cantidadPersonas} ${
        Number(cantidadPersonas) === 1 ? 'persona' : 'personas'
    } el ${fechaFormateada} a las ${horarioReserva} hs.`;
};
