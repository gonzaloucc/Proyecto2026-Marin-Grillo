import { calcularTotal } from '@utils/carrito.js'
import { formatearPrecio } from '@utils/formato.js'

const HORARIOS_RETIRO = [
    '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
    '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30'
]

export const FORMAS_DE_PAGO = ['Efectivo', 'Transferencia']

/**
 * Convierte la hora de una fecha al formato HH:MM.
 * @param {Date} fecha - Fecha de la que se toma la hora.
 * @returns {string} Hora en formato HH:MM.
 */
const formatearHora = (fecha) => {
    return String(fecha.getHours()).padStart(2, '0') + ':' + String(fecha.getMinutes()).padStart(2, '0')
}

/**
 * Devuelve los horarios en los que se puede retirar hoy: con al menos 30 minutos de
 * anticipación y, los lunes, solo desde las 16:00.
 * @returns {Array} Horarios disponibles en formato HH:MM.
 */
export const obtenerHorariosDisponibles = () => {
    const ahora = new Date()
    const limite = new Date()

    limite.setMinutes(ahora.getMinutes() + 30)

    // Si sumando 30 minutos ya es otro día, hoy no quedan horarios
    if (limite.getDate() !== ahora.getDate()) {
        return []
    }

    let disponibles = HORARIOS_RETIRO.filter((hora) => hora >= formatearHora(limite))

    if (ahora.getDay() === 1) {
        disponibles = disponibles.filter((hora) => hora >= '16:00')
    }

    return disponibles
}

/**
 * Valida un campo del formulario de retiro.
 * @param {string} campo - Nombre del campo a validar (nombre, telefono, horario o pago).
 * @param {Object} datos - Todos los datos cargados en el formulario.
 * @returns {string} Mensaje de error, o un texto vacío si el campo es válido.
 */
export const validarCampoRetiro = (campo, datos) => {
    if (campo === 'nombre') {
        if (datos.nombre.trim() === '') return 'Por favor ingresá el nombre de quien retira.'
        if (!isNaN(datos.nombre.trim())) return 'El nombre no puede ser un número.'
    }

    if (campo === 'telefono') {
        const telefono = datos.telefono.trim()

        if (telefono === '' || isNaN(telefono) || telefono.length < 8 || telefono.length > 13) {
            return 'Ingresá un teléfono válido, solo números y sin espacios (entre 8 y 13 dígitos).'
        }
    }

    if (campo === 'horario') {
        if (datos.horario === '') return 'Por favor elegí un horario de retiro para hoy.'
        if (!obtenerHorariosDisponibles().includes(datos.horario)) {
            return 'Ese horario ya no está disponible. Elegí otro.'
        }
    }

    if (campo === 'pago' && datos.pago === '') {
        return 'Por favor elegí cómo vas a pagar al retirar.'
    }

    return ''
}

/**
 * Arma el texto del pedido que se envía al WhatsApp de la cafetería.
 * @param {Array} carrito - Productos del carrito.
 * @param {Object} datos - Datos del formulario de retiro.
 * @returns {string} Mensaje con el detalle del pedido y los datos de contacto.
 */
export const generarMensaje = (carrito, datos) => {
    let mensaje = '¡Hola La Pastelier! Quiero hacer un pedido para retirar en el local:\n\n'

    carrito.forEach((item) => {
        mensaje += '• ' + item.cantidad + ' x ' + item.nombre + ' — ' +
            formatearPrecio(item.precio * item.cantidad) + '\n'
    })

    mensaje += '\nTotal: ' + formatearPrecio(calcularTotal(carrito)) + '\n\n'
    mensaje += 'Nombre: ' + datos.nombre.trim() + '\n'
    mensaje += 'Teléfono: ' + datos.telefono.trim() + '\n'
    mensaje += 'Retiro: hoy a las ' + datos.horario + ' hs\n'
    mensaje += 'Pago: ' + datos.pago

    if (datos.aclaraciones.trim() !== '') {
        mensaje += '\nAclaraciones: ' + datos.aclaraciones.trim()
    }

    return mensaje
}
