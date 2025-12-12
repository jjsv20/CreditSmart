import {Link, useLocation} from 'react-router-dom';
import React from 'react'

export const Navbar = () => {

    const location = useLocation();
    const isActive = (path) => {
        return location.pathname === path || location.pathname.startsWith(path + '/') ? 'active' : '';
    }

    return (
        <nav className='navbar'>
            <div className='container'>
                <Link to="/" className='nav-brand'>
                    <img src="/public/logo.png" alt="creditsmart-logo" className='logo'/>
                    CreditSmart
                </Link>

                <ul className='nav-menu'>
                    <li>
                        <Link to="/" className={isActive('/')}>Inicio</Link>
                    </li>
                    <li>
                        <Link to="/simulador" className={isActive('/simulador')}>Simulador</Link>
                    </li>
                    <li>
                        <Link to="/solicitar" className={isActive('/solicitar')}>Solicitar</Link>
                    </li>
                    <li>
                        <Link to="/solicitudes" className={isActive('/solicitudes')}>Solicitudes</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}
