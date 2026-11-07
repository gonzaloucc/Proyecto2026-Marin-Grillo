import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import '@styles/Header.scss'

const Header = ({ cantidadProductos }) => {
    const [menuAbierto, setMenuAbierto] = useState(false)

    const cerrarMenu = () => {
        setMenuAbierto(false)
    }

    return (
        <header className="cabecera">
            <div className="contenedor cabecera-contenido">
                <Link to="/" className="marca" onClick={cerrarMenu}>
                    <img src="/LOGO.png" alt="Logo de La Pastelier" className="marca-logo" />
                    <h1 className="marca-nombre">La Pastelier</h1>
                </Link>

                <button type="button" className="menu-boton" aria-expanded={menuAbierto}
                    aria-controls="navegacion" onClick={() => setMenuAbierto(!menuAbierto)}>
                    <span className="material-symbols-rounded icono" aria-hidden="true">
                        {menuAbierto ? 'close' : 'menu'}
                    </span>
                    Menú
                </button>

                <nav id="navegacion" className={menuAbierto ? 'navegacion abierta' : 'navegacion'}>
                    <ul>
                        <li><NavLink to="/carta" onClick={cerrarMenu}>Carta</NavLink></li>
                        <li><Link to="/#reservas" onClick={cerrarMenu}>Reservas</Link></li>
                        <li><NavLink to="/pedido" onClick={cerrarMenu}>Take away</NavLink></li>
                        <li><Link to="/#atelier" onClick={cerrarMenu}>Tortas Atelier</Link></li>
                        <li><Link to="/#visitanos" onClick={cerrarMenu}>Visitanos</Link></li>
                    </ul>
                </nav>

                <div className="cabecera-acciones">
                    <Link to="/carrito" className="cabecera-carrito" onClick={cerrarMenu}
                        aria-label={'Ver mi pedido para llevar (' + cantidadProductos + ' productos)'}>
                        <span className="material-symbols-rounded" aria-hidden="true">shopping_bag</span>
                        {cantidadProductos > 0 ? <span className="contador">{cantidadProductos}</span> : null}
                    </Link>
                    <Link to="/#reservas" className="boton boton-primario cabecera-boton">
                        <span className="material-symbols-rounded icono" aria-hidden="true">calendar_month</span>
                        Reservar
                    </Link>
                </div>
            </div>
        </header>
    )
}

export default Header
