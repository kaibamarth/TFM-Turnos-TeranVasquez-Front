import React, { useState, useEffect, useCallback } from 'react';
import './turno.css';
import { solicitarTurno } from '../../services/turnosService';
import ErrorToast from '../../components/errorToast/ErrorToast';

const ESPECIALIDADES = {
  'Admisión': 30001,
  'Triage': 30002,
  'Consulta': 30003,
  'Imágenes': 30004,
  'Laboratorio': 30005,
};

const SolicitudTurno = () => {
  const [step, setStep] = useState(0);
  const [especialidad, setEspecialidad] = useState(null);
  const [documento, setDocumento] = useState('');
  const [prioridad, setPrioridad] = useState(1);
  const [confirmacion, setConfirmacion] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async () => {
    try {
      const response = await solicitarTurno({
        documentoPaciente: String(documento),
        prioridad: Number(prioridad),
        codigoServicio: Number(especialidad),
      });

      if (response.success) {
        setConfirmacion({
          codigo: response.data.codigo,
          nombres: response.data.paciente.nombres,
          apellidos: response.data.paciente.apellidos,
        });
        setStep(4); // paso final de confirmación
      } else {
        setErrorMessage('No se pudo generar el turno. Intente nuevamente.');
        resetForm();
      }
    } catch (error) {
      setErrorMessage('Error al procesar su solicitud.');
      resetForm();
    }
  };

  const resetForm = useCallback(() => {
    setStep(0);
    setEspecialidad(null);
    setDocumento('');
    setPrioridad(null);
    setConfirmacion(null);
  }, []);

  // Resetea todo tras 1 minuto
  useEffect(() => {
    const timer = setTimeout(() => {
      resetForm();
    }, 60000);
    return () => clearTimeout(timer);
  }, [step, especialidad, documento, prioridad, confirmacion, resetForm]);

  return (
    <div className="turno-container">
      {step === 0 && (
        <div className="btn-group">
          <button className="btn-main" onClick={() => setStep(1)}>
            Solicitar Turno (Paciente registrado)
          </button>
          <button className="btn-secondary" onClick={() => window.location.href = '/pacientes'}>
            Registrarte
          </button>
        </div>
      )}


      {step === 1 && (
        <div className="step">
          <h2>Seleccione la especialidad</h2>
          {Object.entries(ESPECIALIDADES).map(([nombre, codigo]) => (
            <button
              key={codigo}
              className="btn-option"
              onClick={() => {
                setEspecialidad(codigo);
                setStep(2);
              }}
            >
              {nombre}
            </button>
          ))}
        </div>
      )}

      {step === 2 && (
        <div className="step">
          <h2>Ingrese su número de documento</h2>
          <input
            type="number"
            className="input-big"
            value={documento}
            onChange={(e) => setDocumento(e.target.value)}
            placeholder="Número de documento"
          />
          <button className="btn-next" onClick={() => setStep(3)} disabled={!documento}>
            Siguiente
          </button>
        </div>
      )}

      {step === 3 && (
        <div className="step">
          <h2>Seleccione prioridad</h2>
          {[1, 2, 3, 4, 5].map((p) => (
            <button
              key={p}
              className={`btn-prioridad prioridad-${p}`}
              onClick={() => {
                setPrioridad(p);
                handleSubmit();
              }}
            >
              Prioridad {p}
            </button>
          ))}
        </div>
      )}

      {step === 4 && confirmacion && (
        <div className="step confirmacion-turno">
          <h2>¡Turno generado con éxito!</h2>
          <p className="mensaje-exito">
            Por favor aguarde a que su código de turno aparezca en pantalla.
            Su solicitud fue registrada correctamente y será atendida en breve.
          </p>
          <p className="datos-paciente">
            <strong>Paciente:</strong> {confirmacion.nombres} {confirmacion.apellidos}
          </p>
          <p className="codigo-turno">
            <strong>Código de Turno:</strong>{' '}
            <span className="codigo-destacado">{confirmacion.codigo}</span>
          </p>
          <p className="mensaje-final">
            Recuerde estar atento a su código en la pantalla de turnos.
            Si tiene dudas, puede acercarse a Admisión.
          </p>
        </div>
      )}
      {errorMessage && (
        <ErrorToast message={errorMessage} onClose={() => setErrorMessage(null)} />
      )}

    </div>
  );
};

export default SolicitudTurno;
