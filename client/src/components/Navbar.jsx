import React from 'react';
import '../styles/Navbar.css';

function Navbar() {
    return (
        <nav className="navbar sticky">
            <div className="navbar__logo">
                <i className="fas fa-info-circle"></i>
                <h2>SmartInfo</h2>
            </div>
            <ul className="navbar__links">
                <li><a href="#">Inicio</a></li>
                <li><a href="#">Acerca de</a></li>
                <li><a href="#">Servicios</a></li>
                <li><a href="#">Contacto</a></li>
            </ul>
        </nav>
    );
}

export default Navbar;
