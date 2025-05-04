import React from 'react';
import './Table.css';

const Table = ({ data, onAction, onFilterChange, onSort }) => {
  const especialidades = {
    30001: 'Admisión',
    30002: 'Triage',
    30003: 'Consulta',
    30004: 'Imágenes',
    30005: 'Laboratorio',
  };

  const estados = {
    31001: 'Abierto',
    31002: 'En Progreso',
    31003: 'Cerrado',
    31004: 'Abandonado'
  };

  return (
    <div className="table-container">

      <table className="table">
        <thead>
          <tr>
            <th>Código</th>
            <th onClick={() => onSort('nombre')}>Nombre</th>
            <th onClick={() => onSort('apellido')}>Apellido</th>
            <th>Estado</th>
            <th onClick={() => onSort('prioridad')}>Prioridad</th>
            <th>Documento</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map((turno, i) => (
            <tr key={i}>
              <td>{turno.codigo}</td>
              <td>{turno.nombre}</td>
              <td>{turno.apellido}</td>
              <td>{turno.estado}</td>
              <td>{turno.prioridad}</td>
              <td>{turno.documento}</td>
              <td>
                {turno.estado === 'Pendiente' && (
                  <button
                    className="action-button abrir"
                    onClick={() => onAction('abrir', turno)}
                  >
                    Abrir
                  </button>
                )}
                {turno.estado === 'En Atención' && (
                  <button
                    className="action-button cerrar"
                    onClick={() => onAction('cerrar', turno)}
                  >
                    Cerrar
                  </button>
                )}
                {turno.estado === 'En Atención' && (
                  <button
                    className="action-button abandono"
                    onClick={() => onAction('abandono', turno)}
                  >
                    Abandono
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
