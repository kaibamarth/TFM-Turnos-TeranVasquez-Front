import React, { useState } from 'react';
import { useNavigate } from "react-router";
import './login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    let navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        // Aquí iría la lógica de autenticación
        console.log('Email:', email);
        console.log('Password:', password);
        // Redirigir al usuario al dashboard después de iniciar sesión
        navigate('/');
    };

    const handlePasswordRecovery = () => {
        // Aquí iría la lógica de recuperación de contraseña
        console.log('Recuperación de contraseña');
    };

    return (
        <div className="login-container">
            <img src="../assets/logo.png" alt="Logo" className="logo" />
            <h2>Iniciar Sesión</h2>
            <form onSubmit={handleLogin}>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Contraseña:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="login-button">Iniciar Sesión</button>
            </form>
            <button onClick={handlePasswordRecovery} className="recovery-button">Recuperar Contraseña</button>
        </div>
    );
};

export default Login;