const CATEGORIAS = ['bebidas', 'dulce', 'salado', 'experiencias'];
let filtroActual = 'todo';

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
 * Arma las tarjetas de una categoría con los productos recibidos, agrupados por sección.
 * Si la categoría no tiene productos en la lista, la oculta.
 * @method mostrarCategoria
 * @param {string} categoria - Categoría a mostrar (bebidas, dulce, salado o experiencias).
 * @param {Array} lista - Productos que quedaron después de aplicar los filtros.
 * @return {void} Carga el contenido en el div con id "lista-" + categoria.
 */
const mostrarCategoria = (categoria, lista) => {
    const productosCategoria = lista.filter((producto) => producto.categoria === categoria);
    const secciones = [];
    let contenido = '';

    if (productosCategoria.length === 0) {
        document.getElementById('categoria-' + categoria).style.display = 'none';
        return;
    }

    productosCategoria.forEach((producto) => {
        if (!secciones.includes(producto.seccion)) {
            secciones.push(producto.seccion);
        }
    });

    secciones.forEach((seccion) => {
        contenido += `<article class="panel carta-seccion">
            <h4 class="panel-titulo">${seccion}</h4>
            <ul class="carta-lista">`;

        productosCategoria.filter((producto) => producto.seccion === seccion).forEach((producto) => {
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

    document.getElementById('categoria-' + categoria).style.display = 'block';
    document.getElementById('lista-' + categoria).innerHTML = contenido;
};

/**
 * Filtra los productos según la categoría elegida y la palabra del buscador, y muestra el resultado.
 * @method filtrarCarta
 * @return {void} Vuelve a mostrar la carta con los productos filtrados.
 */
const filtrarCarta = () => {
    const palabra = document.getElementById('buscador').value.toLowerCase().trim();
    let lista = productos;

    if (filtroActual === 'comer') {
        lista = lista.filter((producto) => producto.categoria === 'dulce' || producto.categoria === 'salado');
    } else if (filtroActual !== 'todo') {
        lista = lista.filter((producto) => producto.categoria === filtroActual);
    }

    if (palabra) {
        lista = lista.filter((producto) =>
            producto.nombre.toLowerCase().includes(palabra) ||
            producto.descripcion.toLowerCase().includes(palabra) ||
            producto.seccion.toLowerCase().includes(palabra)
        );
    }

    CATEGORIAS.forEach((categoria) => mostrarCategoria(categoria, lista));

    document.getElementById('carta-vacia').style.display = lista.length === 0 ? 'block' : 'none';
};

/**
 * Guarda la categoría elegida por el usuario y actualiza la carta.
 * @method cambiarFiltro
 * @param {string} valor - Valor del radio button seleccionado (todo, bebidas, comer, dulce, salado o experiencias).
 * @return {void}
 */
const cambiarFiltro = (valor) => {
    filtroActual = valor;
    filtrarCarta();
};

/**
 * Muestra la carta al cargar la página. Si se llegó desde una tarjeta del inicio
 * (por ejemplo carta.html#comer), deja seleccionado ese filtro.
 * @method iniciarCarta
 * @return {void}
 */
const iniciarCarta = () => {
    const filtroInicial = location.hash.replace('#', '');
    const opcion = document.getElementById('filtro-' + filtroInicial);

    if (opcion !== null) {
        opcion.checked = true;
        filtroActual = filtroInicial;
    } else {
        document.getElementById('filtro-todo').checked = true;
    }

    filtrarCarta();
};
