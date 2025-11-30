import {Link, useLocation} from 'react-router-dom';
import React from 'react'

export const Navbar = () => {

    const location = useLocation();
    const isActive = (path) => {
        return location.pathname === path ? 'active' : '';
    }

    return (
        <nav className='navbar'>
            <div className='container'>
                <Link to="/" className='nav-brand'>CreditSmart</Link>

                <ul className='nav-menu'>
                    <li>
                        <Link to="/" className={isActive('/')}>Inicio</Link>
                    </li>
                    <li>
                        <Link to="/simulator" className={isActive('/simulator')}>Simulador</Link>
                    </li>
                    <li>
                        <Link to="/credits" className={isActive('/credits')}>Créditos</Link>
                    </li>
                    <li>
                        <Link to="/about" className={isActive('/about')}>Nosotros</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}
