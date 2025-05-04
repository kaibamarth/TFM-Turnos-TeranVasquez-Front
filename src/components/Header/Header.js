import React from 'react';
import './Header.css';

const Header = ({ userName, onLogout }) => (
  <header className="header">
    <div className="user-info">
      Bienvenido, <strong>{userName}</strong>
    </div>
    <button onClick={onLogout} className="logout-btn">Cerrar sesión</button>
  </header>
);

export default Header;