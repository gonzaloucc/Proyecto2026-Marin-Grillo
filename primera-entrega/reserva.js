const DIAS_MAXIMOS_RESERVA = 14;
const PERSONAS_MAXIMAS = 20;
let campoConError = null;

/**
 * Convierte una fecha al formato AAAA-MM-DD que usa el input de tipo date.
 * @method formatearFechaInput
 * @param {Date} fecha - Fecha que se quiere convertir.
 * @return {string} Fecha en formato AAAA-MM-DD.
 */
const formatearFechaInput = (fecha) => {
    const anio = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    const dia = String(fecha.getDate()).padStart(2, '0');

    return `${anio}-${mes}-${dia}`;
};

/**
 * Limita el calendario del input de fecha desde hoy hasta dentro de dos semanas.
 * @method configurarFechaReserva
 * @return {void} Asigna los atributos min y max al input de fecha.
 */
const configurarFechaReserva = () => {
    const hoy = new Date();
    const limite = new Date();

    limite.setDate(hoy.getDate() + DIAS_MAXIMOS_RESERVA);

    document.getElementById('fecha').min = formatearFechaInput(hoy);
    document.getElementById('fecha').max = formatearFechaInput(limite);
};

/**
 * Muestra el diálogo de error y blanquea el campo que tiene el valor incorrecto.
 * @method mostrarError
 * @param {Object} campo - Input o select que tiene el valor incorrecto.
 * @param {string} titulo - Título que se muestra en el diálogo.
 * @param {string} texto - Explicación del error para el usuario.
 * @return {boolean} Siempre false, para indicar que la validación falló.
 */
const mostrarError = (campo, titulo, texto) => {
    campo.value = '';
    campoConError = campo;

    document.getElementById('dialogo-titulo').innerText = titulo;
    document.getElementById('dialogo-mensaje').innerText = 'Error: ' + texto;
    document.getElementById('dialogo-error').showModal();

    return false;
};

/**
 * Cierra el diálogo de error y vuelve a posicionar el cursor en el campo incorrecto.
 * @method cerrarDialogo
 * @return {void}
 */
const cerrarDialogo = () => {
    document.getElementById('dialogo-error').close();

    if (campoConError !== null) {
        campoConError.focus();
    }
};

/**
 * Valida los datos ingresados en el formulario de reservas y muestra los errores.
 * @method validarReserva
 * @return {boolean} Indica si los datos ingresados son válidos.
 */
const validarReserva = () => {
    const nombre = document.getElementById('nombre');
    const personas = document.getElementById('personas');
    const fecha = document.getElementById('fecha');
    const horario = document.getElementById('horario');
    const cantidad = Number(personas.value);
    const esLunes = new Date(fecha.value + 'T00:00:00').getDay() === 1;
    const ahora = new Date();
    const horaActual = String(ahora.getHours()).padStart(2, '0') + ':' + String(ahora.getMinutes()).padStart(2, '0');

    if (nombre.value.trim() === '') {
        return mostrarError(nombre, 'Revisemos tu nombre', 'Por favor ingresá tu nombre.');
    }

    if (!isNaN(nombre.value.trim())) {
        return mostrarError(nombre, 'Revisemos tu nombre', 'El nombre no puede ser un número.');
    }

    if (personas.value === '' || isNaN(cantidad) || !Number.isInteger(cantidad) || cantidad <= 0) {
        return mostrarError(personas, 'Revisemos la cantidad',
            'Por favor ingresá una cantidad de personas válida, mayor a 0.');
    }

    if (cantidad > PERSONAS_MAXIMAS) {
        return mostrarError(personas, 'Revisemos la cantidad',
            'Para grupos de más de ' + PERSONAS_MAXIMAS + ' personas escribinos por WhatsApp.');
    }

    if (fecha.value === '') {
        return mostrarError(fecha, 'Revisemos la fecha', 'Por favor seleccioná una fecha para la reserva.');
    }

    if (fecha.value < fecha.min || fecha.value > fecha.max) {
        return mostrarError(fecha, 'Revisemos la fecha',
            'Solo podés reservar desde hoy hasta dentro de ' + DIAS_MAXIMOS_RESERVA + ' días.');
    }

    if (horario.value === '') {
        return mostrarError(horario, 'Revisemos el horario', 'Por favor seleccioná un horario para la reserva.');
    }

    if (esLunes && horario.value < '16:00') {
        return mostrarError(horario, 'Revisemos el horario', 'Los lunes abrimos solo de 16:00 a 21:00 hs.');
    }

    if (fecha.value === fecha.min && horario.value <= horaActual) {
        return mostrarError(horario, 'Revisemos el horario', 'Ese horario ya pasó. Elegí uno más tarde.');
    }

    mostrarReserva(nombre.value.trim(), cantidad, fecha.value, horario.value);
    return true;
};

/**
 * Calcula y muestra el resumen de la reserva realizada.
 * @method mostrarReserva
 * @param {string} nombreReserva - Nombre de la persona que realiza la reserva.
 * @param {number} cantidadPersonas - Cantidad de personas de la reserva.
 * @param {string} fechaReserva - Fecha seleccionada para la reserva (AAAA-MM-DD).
 * @param {string} horarioReserva - Horario seleccionado para la reserva.
 * @return {void} Actualiza el resultado visible en la página.
 */
const mostrarReserva = (nombreReserva, cantidadPersonas, fechaReserva, horarioReserva) => {
    const fechaFormateada = new Date(fechaReserva + 'T00:00:00').toLocaleDateString('es-AR');
    const textoPersonas = cantidadPersonas === 1 ? 'persona' : 'personas';

    document.getElementById('resultado-reserva').innerText = '¡Listo, ' + nombreReserva +
        '! Reservamos una mesa para ' + cantidadPersonas + ' ' + textoPersonas +
        ' el ' + fechaFormateada + ' a las ' + horarioReserva + ' hs.';
};
