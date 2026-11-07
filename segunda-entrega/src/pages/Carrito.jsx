import { useState } from 'react'
import { Link, useOutletContext } from 'react-router-dom'
import '@styles/Formulario.scss'
import '@styles/Pedido.scss'
import '@styles/Carrito.scss'
import { calcularTotal, LIMITE_CANTIDAD_PRODUCTO } from '@utils/carrito.js'
import { crearLinkWhatsApp } from '@utils/contacto.js'
import { formatearPrecio } from '@utils/formato.js'
import { FORMAS_DE_PAGO, generarMensaje, obtenerHorariosDisponibles, validarCampoRetiro } from '@utils/retiro.js'

const retiroVacio = { nombre: '', telefono: '', horario: '', pago: '', aclaraciones: '' }
const erroresVacios = { nombre: '', telefono: '', horario: '', pago: '' }

const Carrito = () => {
    const { carrito, agregarProducto, quitarProducto, vaciarCarrito } = useOutletContext()
    const [datos, setDatos] = useState(retiroVacio)
    const [errores, setErrores] = useState(erroresVacios)
    const [enviado, setEnviado] = useState(false)
    const horariosDisponibles = obtenerHorariosDisponibles()

    // Guarda el valor del campo y, si es obligatorio, lo valida en el momento
    const manejarCambio = (e) => {
        const { name, value } = e.target
        const nuevosDatos = { ...datos, [name]: value }

        setDatos(nuevosDatos)
        if (name !== 'aclaraciones') {
            setErrores({ ...errores, [name]: validarCampoRetiro(name, nuevosDatos) })
        }
    }

    const enviarPedido = (e) => {
        e.preventDefault()

        const nuevosErrores = {
            nombre: validarCampoRetiro('nombre', datos),
            telefono: validarCampoRetiro('telefono', datos),
            horario: validarCampoRetiro('horario', datos),
            pago: validarCampoRetiro('pago', datos)
        }
        setErrores(nuevosErrores)

        // Si hay algún error, se lleva el cursor al primer campo incorrecto
        const primerError = Object.keys(nuevosErrores).find((campo) => nuevosErrores[campo] !== '')
        if (primerError) {
            document.getElementById(primerError + '-retiro').focus()
            return
        }

        const mensaje = generarMensaje(carrito, datos)
        console.log(mensaje)
        window.open(crearLinkWhatsApp(mensaje), '_blank')

        vaciarCarrito()
        setDatos(retiroVacio)
        setEnviado(true)
    }

    // Pantalla final, después de mandar el pedido
    if (enviado) {
        return (
            <section className="seccion seccion-arena carta-pagina">
                <div className="contenedor">
                    <p className="antetitulo">Take away</p>
                    <h2 className="titulo-seccion">Tu pedido</h2>
                    <div className="panel pedido-enviado" role="status">
                        <span className="pedido-enviado-icono">
                            <span className="material-symbols-rounded" aria-hidden="true">check_circle</span>
                        </span>
                        <h3 className="titulo-categoria">¡Pedido generado!</h3>
                        <p className="panel-texto">Abrimos WhatsApp con el detalle de tu pedido. A la brevedad La
                            Pastelier se va a contactar con vos para confirmarlo.</p>
                        <Link to="/pedido" className="boton boton-primario">
                            <span className="material-symbols-rounded icono" aria-hidden="true">shopping_bag</span>
                            Hacer otro pedido
                        </Link>
                    </div>
                </div>
            </section>
        )
    }

    return (
        <section className="seccion seccion-arena carta-pagina">
            <div className="contenedor">
                <p className="antetitulo">Take away</p>
                <h2 className="titulo-seccion">Tu pedido</h2>

                {carrito.length === 0 ? (
                    <div className="panel carrito-vacio">
                        <p>Tu pedido está vacío.</p>
                        <Link to="/pedido" className="boton boton-primario">
                            <span className="material-symbols-rounded icono" aria-hidden="true">shopping_bag</span>
                            Elegir productos
                        </Link>
                    </div>
                ) : (
                    <div className="dos-columnas carrito-columnas">
                        <div className="panel">
                            <h3 className="panel-titulo">
                                <span className="material-symbols-rounded icono" aria-hidden="true">shopping_bag</span>
                                Productos
                            </h3>

                            <ul className="carrito-lista">
                                {carrito.map((item) => (
                                    <li key={item.id} className="carrito-item">
                                        <div>
                                            <p className="carta-nombre">{item.nombre}</p>
                                            <p className="carta-detalle">{formatearPrecio(item.precio)} c/u</p>
                                        </div>
                                        <div className="carrito-cantidad">
                                            <button type="button" className="boton-cantidad"
                                                onClick={() => quitarProducto(item.id)}
                                                aria-label={'Quitar una unidad de ' + item.nombre}>
                                                <span className="material-symbols-rounded" aria-hidden="true">remove</span>
                                            </button>
                                            <span>{item.cantidad}</span>
                                            <button type="button" className="boton-cantidad"
                                                onClick={() => agregarProducto(item)}
                                                disabled={item.cantidad >= LIMITE_CANTIDAD_PRODUCTO}
                                                aria-label={'Agregar una unidad de ' + item.nombre}
                                                title={item.cantidad >= LIMITE_CANTIDAD_PRODUCTO
                                                    ? 'Límite máximo alcanzado (' + LIMITE_CANTIDAD_PRODUCTO + ' unidades)'
                                                    : 'Agregar una unidad de ' + item.nombre}>
                                                <span className="material-symbols-rounded" aria-hidden="true">add</span>
                                            </button>
                                        </div>
                                        <strong>{formatearPrecio(item.precio * item.cantidad)}</strong>
                                    </li>
                                ))}
                            </ul>

                            <div className="carrito-total">
                                <span>Total</span>
                                <strong>{formatearPrecio(calcularTotal(carrito))}</strong>
                            </div>

                            <button type="button" className="boton boton-contorno-oscuro" onClick={vaciarCarrito}>
                                <span className="material-symbols-rounded icono" aria-hidden="true">delete</span>
                                Vaciar pedido
                            </button>

                            <Link to="/pedido" className="tarjeta-enlace carrito-seguir">
                                <span className="material-symbols-rounded icono" aria-hidden="true">add</span>
                                Agregar más productos
                            </Link>
                        </div>

                        <div className="panel panel-formulario">
                            <form className="formulario" onSubmit={enviarPedido} noValidate>
                                <h3 className="panel-titulo">
                                    <span className="material-symbols-rounded icono" aria-hidden="true">storefront</span>
                                    Datos para el retiro
                                </h3>
                                <p className="campo-ayuda">Retirás hoy en Bv. Elías Yofre 1243. Los campos marcados con
                                    * son obligatorios.</p>

                                <div className="campo">
                                    <label htmlFor="nombre-retiro">
                                        <span className="material-symbols-rounded icono" aria-hidden="true">person</span>
                                        Nombre de quien retira *
                                    </label>
                                    <input type="text" id="nombre-retiro" name="nombre" placeholder="Ej: María López"
                                        maxLength="40" value={datos.nombre} onChange={manejarCambio}
                                        aria-invalid={errores.nombre !== ''} aria-describedby="error-nombre-retiro"
                                        required />
                                    <p id="error-nombre-retiro" className="campo-error" role="alert">{errores.nombre}</p>
                                </div>

                                <div className="campo">
                                    <label htmlFor="telefono-retiro">
                                        <span className="material-symbols-rounded icono" aria-hidden="true">call</span>
                                        Teléfono *
                                    </label>
                                    <input type="tel" id="telefono-retiro" name="telefono" placeholder="Ej: 3511234567"
                                        maxLength="13" value={datos.telefono} onChange={manejarCambio}
                                        aria-invalid={errores.telefono !== ''}
                                        aria-describedby="ayuda-telefono error-telefono-retiro" required />
                                    <p id="ayuda-telefono" className="campo-ayuda">Solo números, sin espacios ni
                                        guiones.</p>
                                    <p id="error-telefono-retiro" className="campo-error"
                                        role="alert">{errores.telefono}</p>
                                </div>

                                <div className="campos-fila">
                                    <div className="campo">
                                        <label htmlFor="horario-retiro">
                                            <span className="material-symbols-rounded icono"
                                                aria-hidden="true">schedule</span>
                                            Horario de retiro *
                                        </label>
                                        <select id="horario-retiro" name="horario" value={datos.horario}
                                            onChange={manejarCambio} aria-invalid={errores.horario !== ''}
                                            aria-describedby="error-horario-retiro" required>
                                            <option value="">
                                                {horariosDisponibles.length > 0
                                                    ? 'Elegí un horario'
                                                    : 'Hoy ya no hay horarios disponibles'}
                                            </option>
                                            {horariosDisponibles.map((hora) => (
                                                <option key={hora} value={hora}>{hora} hs</option>
                                            ))}
                                        </select>
                                        <p id="error-horario-retiro" className="campo-error"
                                            role="alert">{errores.horario}</p>
                                    </div>

                                    <div className="campo">
                                        <label htmlFor="pago-retiro">
                                            <span className="material-symbols-rounded icono"
                                                aria-hidden="true">payments</span>
                                            Forma de pago *
                                        </label>
                                        <select id="pago-retiro" name="pago" value={datos.pago} onChange={manejarCambio}
                                            aria-invalid={errores.pago !== ''} aria-describedby="error-pago-retiro"
                                            required>
                                            <option value="">Elegí una opción</option>
                                            {FORMAS_DE_PAGO.map((forma) => (
                                                <option key={forma} value={forma}>{forma}</option>
                                            ))}
                                        </select>
                                        <p id="error-pago-retiro" className="campo-error" role="alert">{errores.pago}</p>
                                    </div>
                                </div>
                                <p className="campo-ayuda">Preparamos tu pedido con al menos 30 minutos de
                                    anticipación.</p>

                                <div className="campo">
                                    <label htmlFor="aclaraciones-retiro">
                                        <span className="material-symbols-rounded icono"
                                            aria-hidden="true">edit_note</span>
                                        Aclaraciones
                                    </label>
                                    <textarea id="aclaraciones-retiro" name="aclaraciones" rows="3" maxLength="150"
                                        placeholder="Ej: el latte sin azúcar" value={datos.aclaraciones}
                                        onChange={manejarCambio}></textarea>
                                </div>

                                <button type="submit" className="boton boton-primario formulario-boton">
                                    <span className="material-symbols-rounded icono" aria-hidden="true">chat</span>
                                    Enviar pedido por WhatsApp
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}

export default Carrito
