/**
 * Formatea un precio como moneda argentina, sin decimales (ej: $ 4.500).
 * @param {number} precio - Precio que se quiere formatear.
 * @returns {string} Precio formateado como moneda local.
 */
export const formatearPrecio = (precio) => {
    return new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
        maximumFractionDigits: 0
    }).format(precio)
}
