import React, { useState } from 'react';
import { useNavigate } from "react-router";
import './login.css';
import { loginUser } from '../../services/login';
import ErrorToast from '../../components/errorToast/ErrorToast';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);
    let navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        console.log('Iniciando sesión con:', email, password);
        
        loginUser({parametroBusqueda: email, password})
            .then(response => {
                if (response.success) {
                    // Guardar el token en el localStorage o en un contexto global
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('fullname', response.data.nombres + ' ' + response.data.apellidos);
                    localStorage.setItem('usuarioId', response.data.usuarioId);
                    localStorage.setItem('rol', response.data.codigoRol);
                    localStorage.setItem('servicios', response.data.servicios);
                    navigate('/dashboard'); // Redirigir al dashboard
                } else {
                    setErrorMessage('Usuario o contraseña incorrectos.');   
                }
            })
            .catch(error => {
                setErrorMessage('Error al iniciar sesión. Por favor, intente nuevamente.');
            });
    };

    const handlePasswordRecovery = () => {
        // Aquí iría la lógica de recuperación de contraseña
        console.log('Recuperación de contraseña');
    };

    return (
        <div className="login-container">
            <img src="../../assets/logo.png" alt="Logo" className="logo" />
            <h2>Iniciar Sesión</h2>
            <form onSubmit={handleLogin}>
                <div className="form-group">
                    <label htmlFor="email">Usuario:</label>
                    <input
                        type="text"
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
                {errorMessage && <ErrorToast message={errorMessage} onClose={() => setErrorMessage(null)} />}
            </form>
            <button onClick={handlePasswordRecovery} className="recovery-button">Recuperar Contraseña</button>
        </div>
    );
};

export default Login;