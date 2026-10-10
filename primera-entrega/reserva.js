const DIAS_MAXIMOS_RESERVA = 14;
const PERSONAS_MAXIMAS = 20;
let campoConError = null;

/**
 * Convierte una fecha al formato AAAA-MM-DD usando la hora local (no UTC).
 * @method formatearFechaInput
 * @param {Date} fecha - Fecha que se quiere convertir.
 * @return {string} Fecha en el formato que usa el input de tipo date.
 */
const formatearFechaInput = (fecha) => {
    const anio = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    const dia = String(fecha.getDate()).padStart(2, '0');

    return `${anio}-${mes}-${dia}`;
};

/**
 * Calcula el rango de fechas permitido para reservar: desde hoy hasta dentro de dos semanas.
 * @method obtenerRangoFechas
 * @return {{minima: string, maxima: string}} Fechas mínima y máxima en formato AAAA-MM-DD.
 */
const obtenerRangoFechas = () => {
    const hoy = new Date();
    const limite = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate() + DIAS_MAXIMOS_RESERVA);

    return {
        minima: formatearFechaInput(hoy),
        maxima: formatearFechaInput(limite)
    };
};

/**
 * Limita el calendario del input de fecha al rango permitido para reservar.
 * @method configurarFechaReserva
 * @return {void} Asigna los atributos min y max al input de fecha.
 */
const configurarFechaReserva = () => {
    const fecha = document.getElementById('fecha');
    const rango = obtenerRangoFechas();

    fecha.min = rango.minima;
    fecha.max = rango.maxima;
};

/**
 * Muestra el diálogo de error, blanquea el campo incorrecto y le devuelve el foco.
 * @method mostrarError
 * @param {HTMLInputElement|HTMLSelectElement} campo - Campo que tiene el valor incorrecto.
 * @param {string} titulo - Título que se muestra en el diálogo.
 * @param {string} texto - Explicación del error para el usuario.
 * @return {boolean} Siempre false, para indicar que la validación falló.
 */
const mostrarError = (campo, titulo, texto) => {
    const dialogo = document.getElementById('dialogo-error');

    campo.value = '';
    campoConError = campo;
    document.getElementById('dialogo-titulo').textContent = titulo;
    document.getElementById('dialogo-mensaje').textContent = `Error: ${texto}`;
    dialogo.showModal();

    return false;
};

/**
 * Devuelve el foco al campo que tenía el error cuando se cierra el diálogo.
 * @method enfocarCampoConError
 * @return {void} Enfoca el último campo marcado como incorrecto.
 */
const enfocarCampoConError = () => {
    if (campoConError) {
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
    const rango = obtenerRangoFechas();
    const cantidad = Number(personas.value);
    const esLunes = new Date(`${fecha.value}T00:00:00`).getDay() === 1;
    const ahora = new Date();
    const horaActual = `${String(ahora.getHours()).padStart(2, '0')}:${String(ahora.getMinutes()).padStart(2, '0')}`;

    if (!nombre.value.trim()) {
        return mostrarError(nombre, 'Revisemos tu nombre', 'Por favor ingresá tu nombre.');
    }

    if (!/^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ' ]+$/.test(nombre.value.trim())) {
        return mostrarError(nombre, 'Revisemos tu nombre', 'El nombre solo puede contener letras y espacios.');
    }

    if (!personas.value || !Number.isInteger(cantidad) || cantidad <= 0) {
        return mostrarError(personas, 'Revisemos la cantidad',
            'Por favor ingresá una cantidad de personas válida, mayor a 0.');
    }

    if (cantidad > PERSONAS_MAXIMAS) {
        return mostrarError(personas, 'Revisemos la cantidad',
            `Para grupos de más de ${PERSONAS_MAXIMAS} personas escribinos por WhatsApp.`);
    }

    if (!fecha.value) {
        return mostrarError(fecha, 'Revisemos la fecha', 'Por favor seleccioná una fecha para la reserva.');
    }

    if (fecha.value < rango.minima || fecha.value > rango.maxima) {
        return mostrarError(fecha, 'Revisemos la fecha',
            `Solo podés reservar desde hoy hasta dentro de ${DIAS_MAXIMOS_RESERVA} días.`);
    }

    if (!horario.value) {
        return mostrarError(horario, 'Revisemos el horario', 'Por favor seleccioná un horario para la reserva.');
    }

    if (esLunes && horario.value < '16:00') {
        return mostrarError(horario, 'Revisemos el horario', 'Los lunes abrimos solo de 16:00 a 21:00 hs.');
    }

    if (fecha.value === rango.minima && horario.value <= horaActual) {
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
 * @param {string} fechaReserva - Fecha seleccionada para la reserva.
 * @param {string} horarioReserva - Horario seleccionado para la reserva.
 * @return {void} Actualiza el resultado visible en la página.
 */
const mostrarReserva = (nombreReserva, cantidadPersonas, fechaReserva, horarioReserva) => {
    const resultado = document.getElementById('resultado-reserva');
    const fechaFormateada = new Date(`${fechaReserva}T00:00:00`).toLocaleDateString('es-AR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
    });

    resultado.textContent = `¡Listo, ${nombreReserva}! Reservamos una mesa para ${cantidadPersonas} ${
        cantidadPersonas === 1 ? 'persona' : 'personas'
    } el ${fechaFormateada} a las ${horarioReserva} hs.`;
};
