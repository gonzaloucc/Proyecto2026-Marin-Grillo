const TELEFONO_WHATSAPP = '5493510000000';
const HORARIOS_RETIRO = [
    '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
    '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30'
];

/**
 * Lee el carrito guardado en el localStorage.
 * @method obtenerCarrito
 * @return {Array} Lista con los id de los productos agregados (un id por cada unidad).
 */
const obtenerCarrito = () => {
    const carrito = localStorage.getItem('carrito');

    return carrito !== null ? JSON.parse(carrito) : [];
};

/**
 * Actualiza el contador del header y, si existe en la página, la barra con el resumen del pedido.
 * @method contarProductos
 * @return {void}
 */
const contarProductos = () => {
    const carritoList = obtenerCarrito();
    const contador = document.getElementById('cant-prod');
    const resumen = document.getElementById('resumen-pedido');
    let total = 0;

    contador.innerText = carritoList.length;
    contador.style.display = carritoList.length > 0 ? 'flex' : 'none';

    if (resumen !== null) {
        carritoList.forEach((id) => {
            total += productos.find((producto) => producto.id === id).precio;
        });

        document.getElementById('resumen-cantidad').innerText = carritoList.length +
            (carritoList.length === 1 ? ' producto' : ' productos');
        document.getElementById('resumen-total').innerText = formatearPrecio(total);
        resumen.style.display = carritoList.length > 0 ? 'flex' : 'none';
    }
};

/**
 * Actualiza lo que corresponda según la página: el contador del header, la lista del carrito
 * (en carrito.html) y las cantidades de cada producto (en pedido.html).
 * @method actualizarPagina
 * @return {void}
 */
const actualizarPagina = () => {
    contarProductos();

    if (document.getElementById('carrito') !== null) {
        mostrarCarrito();
    }

    if (document.getElementById('resumen-pedido') !== null) {
        filtrarCarta();
    }
};

/**
 * Agrega una unidad de un producto al carrito y lo guarda en el localStorage.
 * @method agregarAlCarrito
 * @param {number} id - Id del producto que se quiere agregar.
 * @return {void}
 */
const agregarAlCarrito = (id) => {
    const carritoList = obtenerCarrito();

    carritoList.push(id);
    localStorage.setItem('carrito', JSON.stringify(carritoList));
    actualizarPagina();
};

/**
 * Quita una unidad de un producto del carrito.
 * @method quitarDelCarrito
 * @param {number} id - Id del producto que se quiere quitar.
 * @return {void}
 */
const quitarDelCarrito = (id) => {
    const carritoList = obtenerCarrito();
    const indice = carritoList.indexOf(id);

    if (indice !== -1) {
        carritoList.splice(indice, 1);
    }

    localStorage.setItem('carrito', JSON.stringify(carritoList));
    actualizarPagina();
};

/**
 * Elimina todos los productos del carrito.
 * @method vaciarCarrito
 * @return {void}
 */
const vaciarCarrito = () => {
    localStorage.removeItem('carrito');
    actualizarPagina();
};

/**
 * Calcula el total del carrito y arma la lista de productos con su cantidad y subtotal.
 * Si el carrito está vacío, oculta el formulario de retiro.
 * @method mostrarCarrito
 * @return {void} Carga el contenido en el div con id "carrito".
 */
const mostrarCarrito = () => {
    const carritoList = obtenerCarrito();
    const listaProductos = [];
    let total = 0;
    let contenido = '';

    if (carritoList.length === 0) {
        document.getElementById('carrito').innerHTML = `<div class="carrito-vacio">
            <p>Tu pedido está vacío.</p>
            <a href="pedido.html" class="boton boton-primario">
                <span class="material-symbols-rounded icono" aria-hidden="true">shopping_bag</span>Elegir productos
            </a>
        </div>`;
        document.getElementById('formulario-retiro').style.display = 'none';
        return;
    }

    carritoList.forEach((id) => {
        if (!listaProductos.includes(id)) {
            listaProductos.push(id);
        }
    });

    listaProductos.forEach((id) => {
        const producto = productos.find((item) => item.id === id);
        const cantidad = carritoList.filter((item) => item === id).length;
        const subtotal = producto.precio * cantidad;

        total += subtotal;
        contenido += `<li class="carrito-item">
            <div class="carta-item-texto">
                <p class="carta-nombre">${producto.nombre}</p>
                <p class="carta-detalle">${formatearPrecio(producto.precio)} c/u</p>
            </div>
            <div class="carrito-cantidad">
                <button type="button" class="boton-cantidad" onclick="quitarDelCarrito(${id})"
                    aria-label="Quitar una unidad de ${producto.nombre}">
                    <span class="material-symbols-rounded" aria-hidden="true">remove</span>
                </button>
                <span>${cantidad}</span>
                <button type="button" class="boton-cantidad" onclick="agregarAlCarrito(${id})"
                    aria-label="Agregar una unidad de ${producto.nombre}">
                    <span class="material-symbols-rounded" aria-hidden="true">add</span>
                </button>
            </div>
            <strong>${formatearPrecio(subtotal)}</strong>
        </li>`;
    });

    document.getElementById('carrito').innerHTML = `<ul class="carrito-lista">${contenido}</ul>
        <div class="carrito-total">
            <span>Total</span>
            <strong>${formatearPrecio(total)}</strong>
        </div>
        <button type="button" class="boton boton-contorno-oscuro" onclick="vaciarCarrito()">
            <span class="material-symbols-rounded icono" aria-hidden="true">delete</span>Vaciar pedido
        </button>`;
    document.getElementById('formulario-retiro').style.display = 'block';
};

/**
 * Convierte la hora de una fecha al formato HH:MM.
 * @method formatearHora
 * @param {Date} fecha - Fecha de la que se toma la hora.
 * @return {string} Hora en formato HH:MM.
 */
const formatearHora = (fecha) => {
    return String(fecha.getHours()).padStart(2, '0') + ':' + String(fecha.getMinutes()).padStart(2, '0');
};

/**
 * Devuelve los horarios en los que se puede retirar hoy: dentro del horario de atención
 * y con al menos 30 minutos de anticipación. Los lunes solo desde las 16:00.
 * @method obtenerHorariosDisponibles
 * @return {Array} Horarios disponibles en formato HH:MM.
 */
const obtenerHorariosDisponibles = () => {
    const ahora = new Date();
    const limite = new Date();

    limite.setMinutes(ahora.getMinutes() + 30);

    if (limite.getDate() !== ahora.getDate()) {
        return [];
    }

    let disponibles = HORARIOS_RETIRO.filter((hora) => hora >= formatearHora(limite));

    if (ahora.getDay() === 1) {
        disponibles = disponibles.filter((hora) => hora >= '16:00');
    }

    return disponibles;
};

/**
 * Carga en el select los horarios de retiro disponibles para hoy.
 * @method cargarHorariosRetiro
 * @return {void}
 */
const cargarHorariosRetiro = () => {
    const disponibles = obtenerHorariosDisponibles();
    let opciones = '<option value="">Elegí un horario</option>';

    if (disponibles.length === 0) {
        opciones = '<option value="">Hoy ya no hay horarios disponibles</option>';
    }

    disponibles.forEach((hora) => {
        opciones += `<option value="${hora}">${hora} hs</option>`;
    });

    document.getElementById('horario-retiro').innerHTML = opciones;
};

/**
 * Arma el texto del pedido que se envía al WhatsApp de la cafetería.
 * @method generarMensaje
 * @param {string} nombre - Nombre de quien retira.
 * @param {string} telefono - Teléfono de contacto.
 * @param {string} horario - Horario de retiro elegido.
 * @param {string} pago - Forma de pago elegida.
 * @param {string} aclaraciones - Comentarios opcionales del cliente.
 * @return {string} Mensaje con el detalle del pedido y los datos de contacto.
 */
const generarMensaje = (nombre, telefono, horario, pago, aclaraciones) => {
    const carritoList = obtenerCarrito();
    const listaProductos = [];
    let total = 0;
    let mensaje = '¡Hola La Pastelier! Quiero hacer un pedido para retirar en el local:\n\n';

    carritoList.forEach((id) => {
        if (!listaProductos.includes(id)) {
            listaProductos.push(id);
        }
    });

    listaProductos.forEach((id) => {
        const producto = productos.find((item) => item.id === id);
        const cantidad = carritoList.filter((item) => item === id).length;
        const subtotal = producto.precio * cantidad;

        total += subtotal;
        mensaje += '• ' + cantidad + ' x ' + producto.nombre + ' — ' + formatearPrecio(subtotal) + '\n';
    });

    mensaje += '\nTotal: ' + formatearPrecio(total) + '\n\n';
    mensaje += 'Nombre: ' + nombre + '\n';
    mensaje += 'Teléfono: ' + telefono + '\n';
    mensaje += 'Retiro: hoy a las ' + horario + ' hs\n';
    mensaje += 'Pago: ' + pago;

    if (aclaraciones !== '') {
        mensaje += '\nAclaraciones: ' + aclaraciones;
    }

    return mensaje;
};

/**
 * Valida el formulario de retiro. Si está todo bien, genera el mensaje, lo muestra en la consola,
 * abre el chat de WhatsApp con el pedido, avisa que el pedido fue generado y vacía el carrito.
 * @method enviarPedido
 * @return {boolean} Indica si el pedido se pudo enviar.
 */
const enviarPedido = () => {
    const nombre = document.getElementById('nombre-retiro');
    const telefono = document.getElementById('telefono');
    const horario = document.getElementById('horario-retiro');
    const pago = document.getElementById('pago');
    const aclaraciones = document.getElementById('aclaraciones');
    const numeroTelefono = telefono.value.trim();

    if (obtenerCarrito().length === 0) {
        return mostrarError(null, 'Tu pedido está vacío', 'Agregá al menos un producto antes de enviar el pedido.');
    }

    if (nombre.value.trim() === '') {
        return mostrarError(nombre, 'Revisemos tu nombre', 'Por favor ingresá el nombre de quien retira.');
    }

    if (!isNaN(nombre.value.trim())) {
        return mostrarError(nombre, 'Revisemos tu nombre', 'El nombre no puede ser un número.');
    }

    if (numeroTelefono === '' || isNaN(numeroTelefono) || numeroTelefono.length < 8 || numeroTelefono.length > 13) {
        return mostrarError(telefono, 'Revisemos el teléfono',
            'Ingresá un teléfono válido, solo números y sin espacios (entre 8 y 13 dígitos).');
    }

    if (horario.value === '') {
        return mostrarError(horario, 'Revisemos el horario', 'Por favor elegí un horario de retiro para hoy.');
    }

    if (!obtenerHorariosDisponibles().includes(horario.value)) {
        cargarHorariosRetiro();
        return mostrarError(horario, 'Revisemos el horario', 'Ese horario ya no está disponible. Elegí otro.');
    }

    if (pago.value === '') {
        return mostrarError(pago, 'Revisemos la forma de pago', 'Por favor elegí cómo vas a pagar al retirar.');
    }

    const mensaje = generarMensaje(nombre.value.trim(), numeroTelefono, horario.value, pago.value,
        aclaraciones.value.trim());

    console.log(mensaje);

    document.getElementById('pedido-armado').style.display = 'none';
    document.getElementById('pedido-enviado').style.display = 'block';

    window.open('https://wa.me/' + TELEFONO_WHATSAPP + '?text=' + encodeURIComponent(mensaje), '_blank');

    localStorage.removeItem('carrito');
    contarProductos();

    return true;
};
