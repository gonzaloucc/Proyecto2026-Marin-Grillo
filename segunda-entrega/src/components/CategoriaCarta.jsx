import { formatearPrecio } from '@utils/formato.js'

/**
 * Muestra una categoría de la carta con sus productos agrupados por sección.
 * Si la categoría no tiene productos (por los filtros), no muestra nada.
 */
const CategoriaCarta = ({ categoria, productos }) => {
    if (productos.length === 0) {
        return null
    }

    // Secciones de la categoría sin repetir (ej: Café, Cafés fríos, Refrescantes...)
    const secciones = []
    productos.forEach((producto) => {
        if (!secciones.includes(producto.seccion)) {
            secciones.push(producto.seccion)
        }
    })

    return (
        <div id={'categoria-' + categoria.id} className="carta-categoria">
            <div className="carta-categoria-encabezado">
                <img src={categoria.imagen} alt={categoria.alt} className="carta-categoria-imagen" />
                <div>
                    <p className="antetitulo">{categoria.etiqueta}</p>
                    <h3 className="titulo-categoria">{categoria.titulo}</h3>
                    <p className="carta-categoria-texto">{categoria.texto}</p>
                </div>
            </div>

            <div className="carta-secciones">
                {secciones.map((seccion) => (
                    <article key={seccion} className="panel carta-seccion">
                        <h4 className="panel-titulo">{seccion}</h4>
                        <ul className="carta-lista">
                            {productos.filter((producto) => producto.seccion === seccion).map((producto) => (
                                <li key={producto.id} className="carta-item">
                                    <div className="carta-item-texto">
                                        <p className="carta-nombre">{producto.nombre}</p>
                                        <p className="carta-detalle">{producto.descripcion}</p>
                                    </div>
                                    <strong>{formatearPrecio(producto.precio)}</strong>
                                </li>
                            ))}
                        </ul>
                    </article>
                ))}
            </div>
        </div>
    )
}

export default CategoriaCarta
