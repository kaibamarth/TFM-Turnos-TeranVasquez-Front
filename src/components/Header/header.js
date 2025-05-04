import React from 'react';
import './Header.css';

const Header = ({ userName = "Dr. Admin", onLogout }) => {
  return (
    <div className="header">
      <div className="user-info">
        Bienvenido, <strong>{userName}</strong>
      </div>
      <button className="logout-button" onClick={onLogout}>
        Cerrar sesión
      </button>
    </div>
  );
};

export default Header;
