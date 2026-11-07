const Visitanos = () => {
    return (
        <section id="visitanos" className="seccion seccion-arena">
            <div className="contenedor">
                <div className="dos-columnas">
                    <div>
                        <p className="antetitulo">Te esperamos</p>
                        <h2 className="titulo-seccion">Pasá por La Pastelier</h2>
                        <p className="texto-seccion">Encontrá tu pausa favorita: una mesa, una taza rica y algo dulce
                            recién hecho. Consultanos por pedidos y disponibilidad.</p>
                    </div>

                    <div className="panel panel-visita">
                        <h3 className="panel-titulo">
                            <span className="material-symbols-rounded icono" aria-hidden="true">location_on</span>
                            Dónde estamos
                        </h3>
                        <p className="panel-texto">Bv. Elías Yofre 1243, Barrio Jardín, Córdoba.</p>
                        <a href="https://maps.app.goo.gl/PPMGWtvZG7nSE82K6" target="_blank" rel="noopener"
                            className="tarjeta-enlace">
                            Abrir en Google Maps
                            <span className="material-symbols-rounded icono" aria-hidden="true">open_in_new</span>
                        </a>

                        <hr className="separador separador-oscuro" />

                        <h3 className="panel-titulo">
                            <span className="material-symbols-rounded icono" aria-hidden="true">schedule</span>
                            Horario de atención
                        </h3>
                        <ul className="lista-horarios">
                            <li><span>Martes a domingo</span><span>8:30 a 14:00 · 16:00 a 21:00 hs</span></li>
                            <li><span>Lunes</span><span>16:00 a 21:00 hs</span></li>
                        </ul>
                    </div>
                </div>

                <div className="mapa">
                    <iframe
                        src="https://www.google.com/maps?q=Bv.+El%C3%ADas+Yofre+1243,+C%C3%B3rdoba,+Argentina&output=embed"
                        title="Mapa con la ubicación de La Pastelier" loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"></iframe>
                </div>
            </div>
        </section>
    )
}

export default Visitanos
