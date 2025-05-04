import React, { useState } from 'react';
import './modalCloseAten.css';

const ESPECIALIDADES = {
  'Admisión': 30001,
  'Triage': 30002,
  'Consulta': 30003,
  'Imágenes': 30004,
  'Laboratorio': 30005,
};

const ModalCloseAten = ({ visible, onClose, onConfirm }) => {
  const [especialidad, setEspecialidad] = useState('');
  const [prioridad, setPrioridad] = useState('');

  const handleConfirm = () => {
    onConfirm({ especialidad: Number(especialidad), prioridad: Number(prioridad) });
    setEspecialidad('');
    setPrioridad('');
  };

  if (!visible) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>¿Cerrar turno?</h2>
        <p>¿Desea referir al paciente a otra especialidad? En caso negativo solo presione confirmar</p>

        <select value={especialidad} onChange={e => setEspecialidad(e.target.value)}>
          <option value="">Seleccione especialidad</option>
          {Object.entries(ESPECIALIDADES).map(([nombre, codigo]) => (
            <option key={codigo} value={codigo}>{nombre}</option>
          ))}
        </select>

        <select value={prioridad} onChange={e => setPrioridad(e.target.value)}>
          <option value="">Seleccione prioridad</option>
          {[1, 2, 3, 4, 5].map(p => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>

        <div className="modal-buttons">
          <button onClick={handleConfirm}>Confirmar</button>
          <button onClick={onClose}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default ModalCloseAten;
