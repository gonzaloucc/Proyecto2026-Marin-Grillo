export const LIMITE_CANTIDAD_PRODUCTO = 10

// Clave propia para no mezclarlo con el carrito de la primera entrega (mismo dominio en GitHub Pages)
const CLAVE_CARRITO = 'carritoPastelier'

/**
 * Lee el carrito guardado en el localStorage.
 * @returns {Array} Productos del carrito ({ id, nombre, precio, cantidad }), o una lista vacía.
 */
export const obtenerCarritoGuardado = () => {
    const carrito = localStorage.getItem(CLAVE_CARRITO)
    return carrito !== null ? JSON.parse(carrito) : []
}

/**
 * Guarda el carrito en el localStorage.
 * @param {Array} carrito - Productos del carrito.
 */
export const guardarCarrito = (carrito) => {
    localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito))
}

/**
 * Cuenta cuántas unidades hay en total en el carrito.
 * @param {Array} carrito - Productos del carrito.
 * @returns {number} Cantidad total de unidades.
 */
export const contarProductos = (carrito) => {
    let cantidad = 0
    carrito.forEach((item) => {
        cantidad += item.cantidad
    })
    return cantidad
}

/**
 * Calcula el precio total del carrito.
 * @param {Array} carrito - Productos del carrito.
 * @returns {number} Suma de precio por cantidad de cada producto.
 */
export const calcularTotal = (carrito) => {
    let total = 0
    carrito.forEach((item) => {
        total += item.precio * item.cantidad
    })
    return total
}
