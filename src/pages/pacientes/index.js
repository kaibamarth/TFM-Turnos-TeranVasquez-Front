import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { crearPaciente } from '../../services/pacientes';
import ConfirmToast from '../../components/confirmToast/ConfirmToast';
import './pacientes.css';

const CrearPaciente = () => {
    const [nombres, setNombres] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const [telefono, setTelefono] = useState('');
    const [identificacion, setIdentificacion] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);
    const [showConfirm, setShowConfirm] = useState(false);
    const [confirmMessage, setConfirmMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const nuevoPaciente = {
            nombres,
            apellidos,
            fechaNacimiento,
            telefono,
            identificacion
        };

        
        crearPaciente(nuevoPaciente)
            .then(response => {
                if (response.success) {
                    console.log('Paciente creado exitosamente:', response.data);
                    setConfirmMessage('Paciente creado exitosamente.');
                    setShowConfirm(true);
                    navigate('/turno'); 
                } else {
                    setErrorMessage('Error al crear el paciente.');   
                }
            })
            .catch(error => {
                console.error('Error al crear el paciente:', error);
                setErrorMessage('Error al crear el paciente. Por favor, intente nuevamente.');
            }

        );

    };

    return (
        <div className="login-container">
            <h2>Crear Paciente</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="nombres">Nombres:</label>
                    <input
                        type="text"
                        id="nombres"
                        value={nombres}
                        onChange={(e) => setNombres(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="apellidos">Apellidos:</label>
                    <input
                        type="text"
                        id="apellidos"
                        value={apellidos}
                        onChange={(e) => setApellidos(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="fechaNacimiento">Fecha de Nacimiento:</label>
                    <input
                        type="date"
                        id="fechaNacimiento"
                        value={fechaNacimiento}
                        onChange={(e) => setFechaNacimiento(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="telefono">Teléfono:</label>
                    <input
                        type="text"
                        id="telefono"
                        value={telefono}
                        onChange={(e) => setTelefono(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="identificacion">Identificación:</label>
                    <input
                        type="text"
                        id="identificacion"
                        value={identificacion}
                        onChange={(e) => setIdentificacion(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="login-button">Guardar Paciente</button>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                {showConfirm && <ConfirmToast message={confirmMessage} onClose={() => setShowConfirm(false)} />}
            </form>
        </div>
    );
};

export default CrearPaciente;
