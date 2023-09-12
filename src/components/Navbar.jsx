import React from 'react';
import '../css/Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar bg-danger border-bottom border-body">
            <img src="pokemon-logo.svg"/>
            <h1>Bienvenidos a la PokeApp</h1>

        </nav>
    );
}

export default Navbar;
