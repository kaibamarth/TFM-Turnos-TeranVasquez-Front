import React, { useEffect, useRef, useState } from 'react';
import './atencion.css';
import { getAtencionesAll } from '../../services/atenciones';

const ESPECIALIDADES = {
  30001: 'Admisión',
  30002: 'Triage',
  30003: 'Consulta',
  30004: 'Imágenes',
  30005: 'Laboratorio',
};

const Atencion = () => {
  const [turnos, setTurnos] = useState([]);
  const [ultimoTurno, setUltimoTurno] = useState(null);
  const turnoRef = useRef(null);
  const sonidoTurno = useRef(new Audio('/notificacion.mp3'));

  useEffect(() => {
    getAtencions();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      getAtencionesLoop();
    }, 2000);
    return () => clearInterval(interval);
  }, [ultimoTurno]);

  const getAtencions = async () => {
    getAtencionesAll()
      .then((response) => {
        if (response.success) {
          let aux = response.data.map((turno) => ({
            codigo: turno.codigoTurno,
            paciente: turno.paciente.nombres + " " + turno.paciente.apellidos,
            especialidad: ESPECIALIDADES[turno.servicio],
            doctor: turno.usuario.nombre + " " + turno.usuario.apellido,
            fechaAtencion: turno.fechaInicio,
          }));

          aux.sort((a, b) => new Date(b.fechaAtencion) - new Date(a.fechaAtencion));
          aux = aux.slice(0, 3);

          setTurnos(aux);
          setUltimoTurno(aux[0]);
        }
      })
      .catch(console.error);
  };

  const getAtencionesLoop = async () => {
    getAtencionesAll()
      .then((response) => {
        if (response.success) {
          let aux = response.data.map((turno) => ({
            codigo: turno.codigoTurno,
            paciente: turno.paciente.nombres + " " + turno.paciente.apellidos,
            especialidad: ESPECIALIDADES[turno.servicio],
            doctor: turno.usuario.nombre + " " + turno.usuario.apellido,
            fechaAtencion: turno.fechaInicio,
          }));

          aux.sort((a, b) => new Date(b.fechaAtencion) - new Date(a.fechaAtencion));
          aux = aux.slice(0, 3);

          setTurnos(aux);

          if (!ultimoTurno || aux[0].codigo !== ultimoTurno.codigo) {
            setUltimoTurno(aux[0]);
            sonidoTurno.current.play();

            if (turnoRef.current) {
              turnoRef.current.classList.add("flash");
              setTimeout(() => {
                turnoRef.current.classList.remove("flash");
              }, 1000);
            }
          }
        }
      })
      .catch(console.error);
  };

  return (
    <div className="vista-turnos-container vertical">
      {/* Último turno llamado */}
      <div ref={turnoRef} className="turno-actual resaltado-turno">
        <h2 className="turno-codigo">{ultimoTurno?.codigo}</h2>
        <h3 className="turno-paciente">{ultimoTurno?.paciente}</h3>
        <p><strong>Especialidad:</strong> {ultimoTurno?.especialidad}</p>
        <p><strong>Doctor:</strong> {ultimoTurno?.doctor}</p>
      </div>

      {/* Lista de turnos */}
      <div className="turnos-lista">
        <h3>Ultimos turnos</h3>
        <table className="tabla-turnos">
          <thead>
            <tr>
              <th>Turno</th>
              <th>Paciente</th>
              <th>Especialidad</th>
              <th>Doctor</th>
            </tr>
          </thead>
          <tbody>
            {turnos.map((t, index) => (
              <tr key={index}>
                <td><strong>{t.codigo}</strong></td>
                <td>{t.paciente}</td>
                <td>{t.especialidad}</td>
                <td>{t.doctor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Atencion;
