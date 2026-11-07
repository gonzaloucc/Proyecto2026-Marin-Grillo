import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import '@styles/Carta.scss'
import CategoriaCarta from '@components/CategoriaCarta.jsx'
import { getProductos } from '@api/productosApi.js'
import { categoriasCarta, filtrosCarta } from '@data/categoriasCarta.js'
import { crearLinkWhatsApp } from '@utils/contacto.js'

const Carta = () => {
    const location = useLocation()
    const filtroInicial = location.hash.replace('#', '')

    const [productos, setProductos] = useState([])
    const [cargando, setCargando] = useState(true)
    const [error, setError] = useState(false)
    // Si se llega desde una tarjeta del inicio (ej: /carta#bebidas), arranca con ese filtro
    const [filtro, setFiltro] = useState(
        filtrosCarta.some((opcion) => opcion.valor === filtroInicial) ? filtroInicial : 'todo'
    )
    const [busqueda, setBusqueda] = useState('')

    // Al entrar a la página trae los productos del servicio (json-server)
    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const data = await getProductos()
                setProductos(data)
            } catch (err) {
                console.log('Error al obtener el listado de productos: ' + err)
                setError(true)
            } finally {
                setCargando(false)
            }
        }

        fetchProductos()
    }, [])

    // Aplica el filtro de categoría y la palabra del buscador
    const filtrarProductos = () => {
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

    const productosFiltrados = filtrarProductos()

    return (
        <section className="seccion seccion-arena carta-pagina">
            <div className="contenedor">
                <p className="antetitulo">La Pastelier</p>
                <h2 className="titulo-seccion">Nuestra carta</h2>
                <p className="texto-seccion">Café de especialidad, pastelería de autor, cocina salada y experiencias
                    para compartir. Todo hecho en casa.</p>
                <p className="nota">Algunos productos pueden variar según la disponibilidad del día.</p>

                <div className="carta-filtros">
                    <fieldset className="filtro-grupo">
                        <legend className="filtro-titulo">Filtrar por categoría</legend>
                        {filtrosCarta.map((opcion) => (
                            <div key={opcion.valor}>
                                <input type="radio" id={'filtro-' + opcion.valor} name="filtro" value={opcion.valor}
                                    className="filtro-radio" checked={filtro === opcion.valor}
                                    onChange={(e) => setFiltro(e.target.value)} />
                                <label htmlFor={'filtro-' + opcion.valor} className="filtro-pastilla">
                                    <span className="material-symbols-rounded icono"
                                        aria-hidden="true">{opcion.icono}</span>
                                    {opcion.texto}
                                </label>
                            </div>
                        ))}
                    </fieldset>

                    <div className="buscador">
                        <label htmlFor="buscador" className="filtro-titulo">Buscar en la carta</label>
                        <div className="buscador-campo">
                            <span className="material-symbols-rounded icono" aria-hidden="true">search</span>
                            <input type="text" id="buscador" placeholder="Ej: pistacho, palta, brunch" maxLength="30"
                                value={busqueda} onChange={(e) => setBusqueda(e.target.value)} />
                        </div>
                    </div>
                </div>

                <div aria-live="polite">
                    {cargando ? <p className="carta-mensaje">Cargando la carta...</p> : null}
                    {error ? <p className="carta-mensaje">No pudimos cargar la carta. Probá de nuevo en unos
                        minutos.</p> : null}
                    {!cargando && !error && productosFiltrados.length === 0 ? (
                        <p className="carta-mensaje">No encontramos productos con ese filtro. Probá con otra palabra
                            o categoría.</p>
                    ) : null}
                </div>

                {categoriasCarta.map((categoria) => (
                    <CategoriaCarta key={categoria.id} categoria={categoria}
                        productos={productosFiltrados.filter((producto) => producto.categoria === categoria.id)} />
                ))}

                <div className="panel carta-atelier">
                    <div>
                        <h3 className="panel-titulo">
                            <span className="material-symbols-rounded icono" aria-hidden="true">cake</span>
                            ¿Buscás una torta entera?
                        </h3>
                        <p className="panel-texto">Nuestras tortas Atelier se hacen a pedido. Consultanos
                            disponibilidad y diseño por WhatsApp.</p>
                    </div>
                    <a href={crearLinkWhatsApp('Hola La Pastelier, quiero consultar por una torta del Atelier.')}
                        target="_blank" rel="noopener" className="boton boton-primario">
                        <span className="material-symbols-rounded icono" aria-hidden="true">chat</span>
                        Consultar por WhatsApp
                    </a>
                </div>

                <p className="nota">Precios en pesos argentinos. Pueden variar sin previo aviso.</p>

                <Link to="/#cartas" className="boton boton-contorno-oscuro carta-volver">
                    <span className="material-symbols-rounded icono" aria-hidden="true">arrow_back</span>
                    Volver al inicio
                </Link>
            </div>
        </section>
    )
}

export default Carta
