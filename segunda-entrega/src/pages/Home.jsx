import { Link } from 'react-router-dom'
import '@styles/Home.scss'
import Portada from '@components/Portada.jsx'
import Card from '@components/Card.jsx'
import Atelier from '@components/Atelier.jsx'
import Visitanos from '@components/Visitanos.jsx'
import { cartasInicio } from '@data/cartasInicio.js'

const Home = () => {
    return (
        <>
            <Portada />

            <section id="cartas" className="seccion seccion-arena">
                <div className="contenedor">
                    <p className="antetitulo">Para cada antojo</p>
                    <h2 className="titulo-seccion">La carta de la casa</h2>
                    <p className="texto-seccion">Una selección pensada para hacer una pausa, compartir y disfrutar de lo
                        hecho a mano.</p>

                    <div className="tarjetas">
                        {cartasInicio.map((carta) => (
                            <Card key={carta.id} imagen={carta.imagen} alt={carta.alt} etiqueta={carta.etiqueta}
                                titulo={carta.titulo}>
                                <p className="tarjeta-texto">{carta.texto}</p>
                                <Link to={carta.enlace} className="tarjeta-enlace">
                                    {carta.textoEnlace}
                                    <span className="material-symbols-rounded icono" aria-hidden="true">arrow_forward</span>
                                </Link>
                            </Card>
                        ))}
                    </div>

                    <Link to="/carta" className="boton boton-primario cartas-boton">
                        <span className="material-symbols-rounded icono" aria-hidden="true">menu_book</span>
                        Ver la carta completa
                    </Link>
                </div>
            </section>

            <section id="reservas" className="seccion seccion-crema">
                <div className="contenedor">
                    <p className="antetitulo">Tu mesa te espera</p>
                    <h2 className="titulo-seccion">Hacé tu reserva.</h2>
                    <p className="texto-seccion">Elegí el día, el horario y cuántas personas vienen. Nosotros nos
                        encargamos de tener todo listo para tu pausa.</p>
                </div>
            </section>

            <Atelier />
            <Visitanos />
        </>
    )
}

export default Home
