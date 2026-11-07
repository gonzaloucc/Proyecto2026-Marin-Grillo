import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from '@components/Header.jsx'
import Footer from '@components/Footer.jsx'
import '@styles/Footer.scss'
import { contarProductos, guardarCarrito, LIMITE_CANTIDAD_PRODUCTO, obtenerCarritoGuardado } from '@utils/carrito.js'

const Layout = () => {
    const location = useLocation()
    // El carrito arranca con lo que haya guardado en el localStorage
    const [carrito, setCarrito] = useState(obtenerCarritoGuardado)

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

    // Cada vez que cambia el carrito se guarda en el localStorage
    useEffect(() => {
        guardarCarrito(carrito)
    }, [carrito])

    const agregarProducto = (producto) => {
        const item = carrito.find((itemCarrito) => itemCarrito.id === producto.id)

        if (item === undefined) {
            setCarrito([...carrito, { id: producto.id, nombre: producto.nombre, precio: producto.precio, cantidad: 1 }])
        } else if (item.cantidad < LIMITE_CANTIDAD_PRODUCTO) {
            setCarrito(carrito.map((itemCarrito) =>
                itemCarrito.id === producto.id ? { ...itemCarrito, cantidad: itemCarrito.cantidad + 1 } : itemCarrito
            ))
        }
    }

    // Resta una unidad y, si el producto queda en 0, lo saca del carrito
    const quitarProducto = (id) => {
        setCarrito(carrito
            .map((itemCarrito) => itemCarrito.id === id ? { ...itemCarrito, cantidad: itemCarrito.cantidad - 1 } : itemCarrito)
            .filter((itemCarrito) => itemCarrito.cantidad > 0))
    }

    return (
        <>
            <Header cantidadProductos={contarProductos(carrito)} />
            <main>
                {/* Las páginas reciben el carrito y sus funciones con useOutletContext */}
                <Outlet context={{ carrito, agregarProducto, quitarProducto }} />
            </main>
            <Footer />
        </>
    )
}

export default Layout
