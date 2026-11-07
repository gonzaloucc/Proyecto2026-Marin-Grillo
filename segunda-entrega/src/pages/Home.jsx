import portada from '@assets/home/portada-local.png'

const Home = () => {
    return (
        <>
            <section className="seccion">
                <div className="contenedor">
                    <img src={portada} alt="Interior del local de La Pastelier" />
                </div>
            </section>
            <section id="reservas" className="seccion">
                <div className="contenedor">
                    <h2 className="titulo-seccion">Hacé tu reserva.</h2>
                </div>
            </section>
            <section id="atelier" className="seccion">
                <div className="contenedor">
                    <h2 className="titulo-seccion">Tortas hechas para tu historia.</h2>
                </div>
            </section>
            <section id="visitanos" className="seccion">
                <div className="contenedor">
                    <h2 className="titulo-seccion">Pasá por La Pastelier</h2>
                </div>
            </section>
        </>
    )
}

export default Home
