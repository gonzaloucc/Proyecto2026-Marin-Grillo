/**
 * Formatea un precio como moneda argentina, sin decimales (ej: $ 4.500).
 * @method formatearPrecio
 * @param {number} precio - Precio que se quiere formatear.
 * @return {string} Precio formateado como moneda local.
 */
const formatearPrecio = (precio) => {
    return new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
        maximumFractionDigits: 0
    }).format(precio);
};

/**
 * Arma las tarjetas de una categoría de la carta, agrupando los productos por sección.
 * @method mostrarCategoria
 * @param {string} categoria - Categoría a mostrar (bebidas, dulce, salado o experiencias).
 * @return {void} Carga el contenido en el div con id "lista-" + categoria.
 */
const mostrarCategoria = (categoria) => {
    const lista = productos.filter((producto) => producto.categoria === categoria);
    const secciones = [];
    let contenido = '';

    lista.forEach((producto) => {
        if (!secciones.includes(producto.seccion)) {
            secciones.push(producto.seccion);
        }
    });

    secciones.forEach((seccion) => {
        contenido += `<article class="panel carta-seccion">
            <h4 class="panel-titulo">${seccion}</h4>
            <ul class="carta-lista">`;

        lista.filter((producto) => producto.seccion === seccion).forEach((producto) => {
            contenido += `<li class="carta-item">
                <div>
                    <p class="carta-nombre">${producto.nombre}</p>
                    <p class="carta-detalle">${producto.descripcion}</p>
                </div>
                <strong>${formatearPrecio(producto.precio)}</strong>
            </li>`;
        });

        contenido += '</ul></article>';
    });

    document.getElementById('lista-' + categoria).innerHTML = contenido;
};

/**
 * Muestra la carta completa al cargar la página.
 * @method mostrarCarta
 * @return {void} Carga todas las categorías de la carta.
 */
const mostrarCarta = () => {
    const categorias = ['bebidas', 'dulce', 'salado', 'experiencias'];

    categorias.forEach((categoria) => mostrarCategoria(categoria));
};
