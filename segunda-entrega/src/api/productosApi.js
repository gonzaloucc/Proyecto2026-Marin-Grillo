const BASE_URL = import.meta.env.VITE_BASE_URL

/**
 * Obtiene el listado de productos de la carta desde el servicio (json-server).
 * @returns {Promise<Array>} Productos de la carta.
 */
export const getProductos = async () => {
    const respuesta = await fetch(`${BASE_URL}productos`)
    if (!respuesta.ok) throw new Error('Error al obtener el listado de productos')
    return respuesta.json()
}
