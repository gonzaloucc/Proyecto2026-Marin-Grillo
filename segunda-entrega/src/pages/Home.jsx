import portada from '@assets/home/portada-local.png'

const Home = () => {
    return (
        <section>
            <img src={portada} alt="Interior del local de La Pastelier" />
            <h1>La Pastelier</h1>
            <p>Segunda entrega en React: proyecto base listo.</p>
        </section>
    )
}

export default Home
