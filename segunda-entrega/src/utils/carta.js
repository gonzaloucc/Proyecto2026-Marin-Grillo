/**
 * Filtra los productos según la categoría elegida y la palabra del buscador.
 * @param {Array} productos - Productos de la carta.
 * @param {string} filtro - Categoría elegida (todo, bebidas, comer, dulce, salado o experiencias).
 * @param {string} busqueda - Texto escrito en el buscador.
 * @returns {Array} Productos que cumplen con el filtro y la búsqueda.
 */
export const filtrarProductos = (productos, filtro, busqueda) => {
    const palabra = busqueda.toLowerCase().trim()
    let lista = productos

    if (filtro === 'comer') {
        lista = lista.filter((producto) => producto.categoria === 'dulce' || producto.categoria === 'salado')
    } else if (filtro !== 'todo') {
        lista = lista.filter((producto) => producto.categoria === filtro)
    }

    if (palabra) {
        lista = lista.filter((producto) =>
            producto.nombre.toLowerCase().includes(palabra) ||
            producto.descripcion.toLowerCase().includes(palabra) ||
            producto.seccion.toLowerCase().includes(palabra)
        )
    }

    return lista
}
