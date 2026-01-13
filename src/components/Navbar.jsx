import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

import './Navbar.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const { user, logout } = useAuth();


    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const isActive = (path) => {
        return location.pathname === path ? 'active' : '';
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    TECH<span className="logo-accent">SHOP</span>
                </Link>

                <div className="menu-icon" onClick={toggleMenu}>
                    <span className={isOpen ? 'bar open' : 'bar'}></span>
                    <span className={isOpen ? 'bar open' : 'bar'}></span>
                    <span className={isOpen ? 'bar open' : 'bar'}></span>
                </div>

                <ul className={isOpen ? 'nav-menu active' : 'nav-menu'}>
                    <li className="nav-item">
                        <Link to="/" className={`nav-link ${isActive('/')}`} onClick={toggleMenu}>
                            Inicio
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/catalog" className={`nav-link ${isActive('/catalog')}`} onClick={toggleMenu}>
                            Catálogo
                        </Link>
                    </li>

                    {user?.role === 'admin' && (
                        <li className="nav-item">
                            <Link to="/admin" className={`nav-link admin-link ${isActive('/admin')}`} onClick={toggleMenu}>
                                ⚡ Panel Admin
                            </Link>
                        </li>
                    )}

                    {user ? (
                        <li className="nav-item user-menu">
                            <span className="user-name">Hola, {user.name}</span>
                            <button onClick={logout} className="logout-btn">Salir</button>
                        </li>
                    ) : (
                        <li className="nav-item">
                            <Link to="/login" className="nav-link login-link" onClick={toggleMenu}>
                                Iniciar Sesión
                            </Link>
                        </li>
                    )}

                    <li className="nav-item cart-icon">
                        🛒 <span className="cart-badge">0</span>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
