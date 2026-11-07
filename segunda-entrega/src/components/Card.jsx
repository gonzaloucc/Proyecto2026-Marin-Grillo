import '@styles/Card.scss'

const Card = ({ imagen, alt, etiqueta, titulo, children }) => {
    return (
        <article className="tarjeta">
            {imagen ? <img src={imagen} alt={alt} className="tarjeta-imagen" /> : null}
            <div className="tarjeta-cuerpo">
                {etiqueta ? <p className="tarjeta-numero">{etiqueta}</p> : null}
                <h3 className="tarjeta-titulo">{titulo}</h3>
                {children}
            </div>
        </article>
    )
}

export default Card
