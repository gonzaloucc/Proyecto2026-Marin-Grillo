const DIAS_MAXIMOS_RESERVA = 14
const PERSONAS_MAXIMAS = 20
export const HORARIOS = ['08:30', '10:00', '12:00', '16:00', '18:00', '20:00']

/**
 * Convierte una fecha al formato AAAA-MM-DD que usa el input de tipo date.
 * @param {Date} fecha - Fecha que se quiere convertir.
 * @returns {string} Fecha en formato AAAA-MM-DD.
 */
const formatearFechaInput = (fecha) => {
    const anio = fecha.getFullYear()
    const mes = String(fecha.getMonth() + 1).padStart(2, '0')
    const dia = String(fecha.getDate()).padStart(2, '0')

    return `${anio}-${mes}-${dia}`
}

/**
 * Calcula la primera y la última fecha que se pueden reservar (hoy y dentro de dos semanas).
 * @returns {{ minima: string, maxima: string }} Fechas en formato AAAA-MM-DD.
 */
export const obtenerLimitesFecha = () => {
    const hoy = new Date()
    const limite = new Date()

    limite.setDate(hoy.getDate() + DIAS_MAXIMOS_RESERVA)

    return { minima: formatearFechaInput(hoy), maxima: formatearFechaInput(limite) }
}

/**
 * Valida un campo del formulario de reservas.
 * @param {string} campo - Nombre del campo a validar (nombre, personas, fecha u horario).
 * @param {Object} datos - Todos los datos cargados en el formulario.
 * @returns {string} Mensaje de error, o un texto vacío si el campo es válido.
 */
export const validarCampo = (campo, datos) => {
    const { minima, maxima } = obtenerLimitesFecha()

    if (campo === 'nombre') {
        if (datos.nombre.trim() === '') return 'Por favor ingresá tu nombre.'
        if (!isNaN(datos.nombre.trim())) return 'El nombre no puede ser un número.'
    }

    if (campo === 'personas') {
        const cantidad = Number(datos.personas)

        if (datos.personas === '' || !Number.isInteger(cantidad) || cantidad <= 0) {
            return 'Ingresá una cantidad de personas válida, mayor a 0.'
        }
        if (cantidad > PERSONAS_MAXIMAS) {
            return 'Para grupos de más de ' + PERSONAS_MAXIMAS + ' personas escribinos por WhatsApp.'
        }
    }

    if (campo === 'fecha') {
        if (datos.fecha === '') return 'Por favor seleccioná una fecha.'
        if (datos.fecha < minima || datos.fecha > maxima) {
            return 'Solo podés reservar desde hoy hasta dentro de ' + DIAS_MAXIMOS_RESERVA + ' días.'
        }
    }

    if (campo === 'horario') {
        const ahora = new Date()
        const horaActual = String(ahora.getHours()).padStart(2, '0') + ':' +
            String(ahora.getMinutes()).padStart(2, '0')
        const esLunes = new Date(datos.fecha + 'T00:00:00').getDay() === 1

        if (datos.horario === '') return 'Por favor seleccioná un horario.'
        if (esLunes && datos.horario < '16:00') return 'Los lunes abrimos solo de 16:00 a 21:00 hs.'
        if (datos.fecha === minima && datos.horario <= horaActual) {
            return 'Ese horario ya pasó. Elegí uno más tarde.'
        }
    }

    return ''
}
