import { useEffect, useState } from 'react'
import { Link, useOutletContext } from 'react-router-dom'
import '@styles/Carta.scss'
import '@styles/Pedido.scss'
import CategoriaCarta from '@components/CategoriaCarta.jsx'
import FiltrosCarta from '@components/FiltrosCarta.jsx'
import { getProductos } from '@api/productosApi.js'
import { categoriasCarta, filtrosCarta } from '@data/categoriasCarta.js'
import { filtrarProductos } from '@utils/carta.js'
import { calcularTotal, contarProductos } from '@utils/carrito.js'
import { formatearPrecio } from '@utils/formato.js'

// Las experiencias son solo para consumir en el local, así que no aparecen en el filtro del pedido
const filtrosPedido = filtrosCarta.filter((opcion) => opcion.valor !== 'experiencias')

const Pedido = () => {
    // El carrito vive en el Layout y llega con el context del Outlet
    const { carrito, agregarProducto, quitarProducto } = useOutletContext()

    const [productos, setProductos] = useState([])
    const [cargando, setCargando] = useState(true)
    const [error, setError] = useState(false)
    const [filtro, setFiltro] = useState('todo')
    const [busqueda, setBusqueda] = useState('')

    // Al entrar a la página trae los productos del servicio y se queda con los que son para llevar
    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const data = await getProductos()
                setProductos(data.filter((producto) => producto.paraLlevar))
            } catch (err) {
                console.log('Error al obtener el listado de productos: ' + err)
                setError(true)
            } finally {
                setCargando(false)
            }
        }

        fetchProductos()
    }, [])

    const productosFiltrados = filtrarProductos(productos, filtro, busqueda)
    const cantidadProductos = contarProductos(carrito)

    return (
        <section className="seccion seccion-arena carta-pagina">
            <div className="contenedor">
                <p className="antetitulo">Take away</p>
                <h2 className="titulo-seccion">Pedí para llevar</h2>
                <p className="texto-seccion">Elegí tus productos, completá tus datos y te armamos el pedido para que
                    lo retires hoy en el local. Nos llega directo a nuestro WhatsApp.</p>

                <ol className="pasos-pedido">
                    <li><span className="material-symbols-rounded icono" aria-hidden="true">shopping_bag</span>
                        Elegí tus productos</li>
                    <li><span className="material-symbols-rounded icono" aria-hidden="true">edit_note</span>
                        Completá tus datos</li>
                    <li><span className="material-symbols-rounded icono" aria-hidden="true">chat</span>
                        Enviá el pedido por WhatsApp</li>
                </ol>

                <FiltrosCarta opciones={filtrosPedido} filtro={filtro} onCambiarFiltro={setFiltro}
                    busqueda={busqueda} onCambiarBusqueda={setBusqueda} />

                <div aria-live="polite">
                    {cargando ? <p className="carta-mensaje">Cargando los productos...</p> : null}
                    {error ? <p className="carta-mensaje">No pudimos cargar los productos. Probá de nuevo en unos
                        minutos.</p> : null}
                    {!cargando && !error && productosFiltrados.length === 0 ? (
                        <p className="carta-mensaje">No encontramos productos con ese filtro. Probá con otra palabra
                            o categoría.</p>
                    ) : null}
                </div>

                {categoriasCarta.map((categoria) => (
                    <CategoriaCarta key={categoria.id} categoria={categoria}
                        productos={productosFiltrados.filter((producto) => producto.categoria === categoria.id)}
                        carrito={carrito} onAgregar={agregarProducto} onQuitar={quitarProducto} />
                ))}

                <p className="nota">Solo retiro en el local (Bv. Elías Yofre 1243) y para el mismo día. El pago se
                    hace al retirar.</p>

                {/* Barra con el resumen: aparece cuando hay al menos un producto en el pedido */}
                {cantidadProductos > 0 ? (
                    <div className="resumen-pedido">
                        <p>
                            <span className="material-symbols-rounded icono" aria-hidden="true">shopping_bag</span>
                            {cantidadProductos} {cantidadProductos === 1 ? 'producto' : 'productos'} ·
                            <strong>{formatearPrecio(calcularTotal(carrito))}</strong>
                        </p>
                        <Link to="/carrito" className="boton boton-claro">
                            Ver mi pedido
                            <span className="material-symbols-rounded icono" aria-hidden="true">arrow_forward</span>
                        </Link>
                    </div>
                ) : null}
            </div>
        </section>
    )
}

export default Pedido
