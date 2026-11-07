/**
 * Filtro por categoría (pastillas) y buscador de la carta. Se usa en la Carta y en el Pedido.
 */
const FiltrosCarta = ({ opciones, filtro, onCambiarFiltro, busqueda, onCambiarBusqueda }) => {
    return (
        <div className="carta-filtros">
            <fieldset className="filtro-grupo">
                <legend className="filtro-titulo">Filtrar por categoría</legend>
                {opciones.map((opcion) => (
                    <div key={opcion.valor}>
                        <input type="radio" id={'filtro-' + opcion.valor} name="filtro" value={opcion.valor}
                            className="filtro-radio" checked={filtro === opcion.valor}
                            onChange={(e) => onCambiarFiltro(e.target.value)} />
                        <label htmlFor={'filtro-' + opcion.valor} className="filtro-pastilla">
                            <span className="material-symbols-rounded icono" aria-hidden="true">{opcion.icono}</span>
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
                        value={busqueda} onChange={(e) => onCambiarBusqueda(e.target.value)} />
                </div>
            </div>
        </div>
    )
}

export default FiltrosCarta
