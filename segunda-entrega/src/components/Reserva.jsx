import { useState } from 'react'
import '@styles/Reserva.scss'
import { HORARIOS, obtenerLimitesFecha, validarCampo } from '@utils/reserva.js'

const reservaVacia = { nombre: '', personas: '', fecha: '', horario: '' }

const Reserva = () => {
    const [datos, setDatos] = useState(reservaVacia)
    const [errores, setErrores] = useState(reservaVacia)
    const [resultado, setResultado] = useState('Completá los datos para confirmar tu mesa.')
    const { minima, maxima } = obtenerLimitesFecha()

    // Se ejecuta cada vez que cambia un campo: guarda el valor y lo valida en el momento
    const manejarCambio = (e) => {
        const { name, value } = e.target
        const nuevosDatos = { ...datos, [name]: value }
        const nuevosErrores = { ...errores, [name]: validarCampo(name, nuevosDatos) }

        // Si cambia la fecha, el horario elegido puede dejar de servir (por ejemplo, los lunes)
        if (name === 'fecha' && nuevosDatos.horario !== '') {
            nuevosErrores.horario = validarCampo('horario', nuevosDatos)
        }

        setDatos(nuevosDatos)
        setErrores(nuevosErrores)
    }

    const manejarReserva = (e) => {
        e.preventDefault()

        const nuevosErrores = {
            nombre: validarCampo('nombre', datos),
            personas: validarCampo('personas', datos),
            fecha: validarCampo('fecha', datos),
            horario: validarCampo('horario', datos)
        }
        setErrores(nuevosErrores)

        // Si hay algún error, se lleva el cursor al primer campo incorrecto
        const primerError = Object.keys(nuevosErrores).find((campo) => nuevosErrores[campo] !== '')
        if (primerError) {
            document.getElementById(primerError).focus()
            return
        }

        const cantidad = Number(datos.personas)
        const textoPersonas = cantidad === 1 ? 'persona' : 'personas'
        const fechaFormateada = new Date(datos.fecha + 'T00:00:00').toLocaleDateString('es-AR')

        setResultado('¡Listo, ' + datos.nombre.trim() + '! Reservamos una mesa para ' + cantidad + ' ' +
            textoPersonas + ' el ' + fechaFormateada + ' a las ' + datos.horario + ' hs.')
        setDatos(reservaVacia)
    }

    return (
        <section id="reservas" className="seccion seccion-crema">
            <div className="contenedor dos-columnas">
                <div>
                    <p className="antetitulo">Tu mesa te espera</p>
                    <h2 className="titulo-seccion">Hacé tu reserva.</h2>
                    <p className="texto-seccion">Elegí el día, el horario y cuántas personas vienen. Nosotros nos
                        encargamos de tener todo listo para tu pausa.</p>
                    <p className="nota">Podés reservar con hasta 14 días de anticipación. Las reservas se confirman
                        según disponibilidad.</p>
                </div>

                <div className="panel panel-formulario">
                    <form className="formulario" onSubmit={manejarReserva} noValidate>
                        <p className="campo-ayuda">Los campos marcados con * son obligatorios.</p>

                        <div className="campo">
                            <label htmlFor="nombre">
                                <span className="material-symbols-rounded icono" aria-hidden="true">person</span>
                                Nombre *
                            </label>
                            <input type="text" id="nombre" name="nombre" placeholder="Ej: María López" maxLength="40"
                                value={datos.nombre} onChange={manejarCambio} aria-invalid={errores.nombre !== ''}
                                aria-describedby="error-nombre" required />
                            <p id="error-nombre" className="campo-error" role="alert">{errores.nombre}</p>
                        </div>

                        <div className="campos-fila">
                            <div className="campo">
                                <label htmlFor="personas">
                                    <span className="material-symbols-rounded icono" aria-hidden="true">group</span>
                                    Personas *
                                </label>
                                <input type="number" id="personas" name="personas" placeholder="Ej: 4" min="1"
                                    max="20" value={datos.personas} onChange={manejarCambio}
                                    aria-invalid={errores.personas !== ''}
                                    aria-describedby="ayuda-personas error-personas" required />
                                <p id="ayuda-personas" className="campo-ayuda">Entre 1 y 20 personas.</p>
                                <p id="error-personas" className="campo-error" role="alert">{errores.personas}</p>
                            </div>

                            <div className="campo">
                                <label htmlFor="fecha">
                                    <span className="material-symbols-rounded icono"
                                        aria-hidden="true">calendar_today</span>
                                    Fecha *
                                </label>
                                <input type="date" id="fecha" name="fecha" min={minima} max={maxima}
                                    value={datos.fecha} onChange={manejarCambio} aria-invalid={errores.fecha !== ''}
                                    aria-describedby="ayuda-fecha error-fecha" required />
                                <p id="ayuda-fecha" className="campo-ayuda">Hasta 14 días desde hoy.</p>
                                <p id="error-fecha" className="campo-error" role="alert">{errores.fecha}</p>
                            </div>
                        </div>

                        <div className="campo">
                            <label htmlFor="horario">
                                <span className="material-symbols-rounded icono" aria-hidden="true">schedule</span>
                                Horario *
                            </label>
                            <select id="horario" name="horario" value={datos.horario} onChange={manejarCambio}
                                aria-invalid={errores.horario !== ''} aria-describedby="ayuda-horario error-horario"
                                required>
                                <option value="">Elegí un horario</option>
                                {HORARIOS.map((horario) => (
                                    <option key={horario} value={horario}>{horario} hs</option>
                                ))}
                            </select>
                            <p id="ayuda-horario" className="campo-ayuda">Los lunes atendemos solo de 16:00 a 21:00
                                hs.</p>
                            <p id="error-horario" className="campo-error" role="alert">{errores.horario}</p>
                        </div>

                        <button type="submit" className="boton boton-primario formulario-boton">
                            <span className="material-symbols-rounded icono" aria-hidden="true">event_available</span>
                            Reservar
                        </button>
                    </form>

                    <div className="panel-resultado" aria-live="polite">
                        <p className="antetitulo">Tu reserva</p>
                        <p className="resultado-texto">{resultado}</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Reserva
