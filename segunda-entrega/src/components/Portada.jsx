import { Link } from 'react-router-dom'

const Portada = () => {
    return (
        <section id="inicio" className="portada">
            <div className="contenedor portada-contenido">
                <p className="antetitulo antetitulo-claro">Café · Patisserie · Momentos</p>
                <h2 className="portada-titulo">Un rincón para saborear despacio.</h2>
                <p className="portada-texto">Café de especialidad, pastelería artesanal y tortas creadas para celebrar
                    tus momentos más lindos.</p>
                <div className="portada-botones">
                    <Link to="/#cartas" className="boton boton-claro">
                        <span className="material-symbols-rounded icono" aria-hidden="true">menu_book</span>
                        Ver las cartas
                    </Link>
                    <Link to="/#reservas" className="boton boton-contorno">
                        <span className="material-symbols-rounded icono" aria-hidden="true">event_available</span>
                        Hacer una reserva
                    </Link>
                    <Link to="/pedido" className="boton boton-contorno">
                        <span className="material-symbols-rounded icono" aria-hidden="true">shopping_bag</span>
                        Pedí para llevar
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default Portada
