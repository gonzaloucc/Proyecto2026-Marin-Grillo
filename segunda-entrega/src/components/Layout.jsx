import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from '@components/Header.jsx'
import Footer from '@components/Footer.jsx'
import '@styles/Footer.scss'

const Layout = () => {
    const location = useLocation()

    // Al cambiar de ruta: si hay un #seccion en la URL baja hasta ella, si no vuelve arriba
    useEffect(() => {
        if (location.hash) {
            const seccion = document.getElementById(location.hash.replace('#', ''))
            if (seccion !== null) {
                seccion.scrollIntoView()
                return
            }
        }
        window.scrollTo(0, 0)
    }, [location])

    return (
        <>
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    )
}

export default Layout
