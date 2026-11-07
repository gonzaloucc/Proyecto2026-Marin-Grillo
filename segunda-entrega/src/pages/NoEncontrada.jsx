import { useNavigate } from 'react-router-dom'

const NoEncontrada = () => {
    const navigate = useNavigate()

    return (
        <section className="seccion">
            <div className="contenedor">
                <h2 className="titulo-seccion">No encontramos esta página</h2>
                <p>Puede que el enlace esté mal escrito o que la página ya no exista.</p>
                <button type="button" className="boton boton-primario" onClick={() => navigate('/')}>
                    <span className="material-symbols-rounded icono" aria-hidden="true">home</span>
                    Volver al inicio
                </button>
            </div>
        </section>
    )
}

export default NoEncontrada
