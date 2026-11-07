import tortaAtelier from '@assets/home/pastelera-torta-atelier.jpg'
import { crearLinkWhatsApp } from '@utils/contacto.js'

const Atelier = () => {
    return (
        <section id="atelier" className="seccion seccion-vino">
            <div className="contenedor dos-columnas">
                <div className="atelier-imagen-marco">
                    <img src={tortaAtelier} alt="Pastelera de La Pastelier presentando una torta decorada con crema"
                        className="atelier-imagen" />
                </div>

                <div className="atelier-contenido">
                    <p className="antetitulo antetitulo-claro">La Pastelier Atelier</p>
                    <h2 className="titulo-seccion titulo-claro">Tortas hechas para tu historia.</h2>
                    <p className="atelier-texto">Creamos tortas a pedido para cumpleaños, bodas, eventos y todas esas
                        ocasiones que merecen una mesa inolvidable.</p>
                    <hr className="separador" />
                    <p className="atelier-nota">Contanos la fecha, cantidad de invitados e idea que tenés. Te
                        acompañamos a encontrar la torta ideal.</p>
                    <a href={crearLinkWhatsApp('Hola La Pastelier, quiero consultar por una torta del Atelier.')}
                        target="_blank" rel="noopener" className="boton boton-claro">
                        <span className="material-symbols-rounded icono" aria-hidden="true">chat</span>
                        Consultar por WhatsApp
                    </a>
                </div>
            </div>
        </section>
    )
}

export default Atelier
