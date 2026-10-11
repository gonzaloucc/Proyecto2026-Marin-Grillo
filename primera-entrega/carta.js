const CATEGORIAS = ['bebidas', 'dulce', 'salado', 'experiencias'];
let filtroActual = 'todo';
let esPedido = false;

/**
 * Arma las tarjetas de una categoría con los productos recibidos, agrupados por sección.
 * Si la categoría no tiene productos en la lista, la oculta. En la página de pedidos
 * agrega a cada producto un botón para sumarlo al carrito y, si ya está en el carrito,
 * la cantidad elegida con un botón para quitar unidades.
 * @method mostrarCategoria
 * @param {string} categoria - Categoría a mostrar (bebidas, dulce, salado o experiencias).
 * @param {Array} lista - Productos que quedaron después de aplicar los filtros.
 * @return {void} Carga el contenido en el div con id "lista-" + categoria.
 */
const mostrarCategoria = (categoria, lista) => {
    const contenedor = document.getElementById('categoria-' + categoria);
    const productosCategoria = lista.filter((producto) => producto.categoria === categoria);
    const carritoList = esPedido ? obtenerCarrito() : [];
    const secciones = [];
    let contenido = '';

    if (contenedor === null) {
        return;
    }

    if (productosCategoria.length === 0) {
        contenedor.style.display = 'none';
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
            const cantidad = carritoList.filter((id) => id === producto.id).length;
            let boton = '';

            if (esPedido) {
                boton = `<button type="button" class="boton-agregar" onclick="agregarAlCarrito(${producto.id})"
                    aria-label="Agregar ${producto.nombre} al pedido">
                    <span class="material-symbols-rounded" aria-hidden="true">add</span>
                </button>`;
            }

            if (esPedido && cantidad > 0) {
                boton = `<div class="carrito-cantidad">
                    <button type="button" class="boton-cantidad" onclick="quitarDelCarrito(${producto.id})"
                        aria-label="Quitar una unidad de ${producto.nombre}">
                        <span class="material-symbols-rounded" aria-hidden="true">remove</span>
                    </button>
                    <span>${cantidad}</span>
                    ${boton}
                </div>`;
            }

            contenido += `<li class="carta-item">
                <div class="carta-item-texto">
                    <p class="carta-nombre">${producto.nombre}</p>
                    <p class="carta-detalle">${producto.descripcion}</p>
                </div>
                <strong>${formatearPrecio(producto.precio)}</strong>
                ${boton}
            </li>`;
        });

        contenido += '</ul></article>';
    });

    contenedor.style.display = 'block';
    document.getElementById('lista-' + categoria).innerHTML = contenido;
};

/**
 * Filtra los productos según la categoría elegida y la palabra del buscador, y muestra el resultado.
 * En la página de pedidos solo se tienen en cuenta los productos para llevar.
 * @method filtrarCarta
 * @return {void} Vuelve a mostrar la carta con los productos filtrados.
 */
const filtrarCarta = () => {
    const palabra = document.getElementById('buscador').value.toLowerCase().trim();
    let lista = productos;

    if (esPedido) {
        lista = lista.filter((producto) => producto.paraLlevar);
    }

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
 * @param {string} pagina - "carta" para la carta completa o "pedido" para el take away.
 * @return {void}
 */
const iniciarCarta = (pagina) => {
    const filtroInicial = location.hash.replace('#', '');
    const opcion = document.getElementById('filtro-' + filtroInicial);

    esPedido = pagina === 'pedido';

    if (opcion !== null) {
        opcion.checked = true;
        filtroActual = filtroInicial;
    } else {
        document.getElementById('filtro-todo').checked = true;
    }

    filtrarCarta();
};
