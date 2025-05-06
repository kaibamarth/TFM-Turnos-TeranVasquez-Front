import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/header';
import Table from '../../components/Table/Table';
import ConfirmToast from '../../components/confirmToast/ConfirmToast';
import { getAtenciones, actionAtencion } from '../../services/atenciones';
import ModalCloseAten from '../../components/modalCloseAten/ModalCloseAten';
import './Dashboard.css';

const DashboardPage = () => {
  const [turnos, setTurnos] = useState([]);
  const [filter, setFilter] = useState('');
  const [sortKey, setSortKey] = useState(null);
  const [userName, setUserName] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState('');
  const [showRedirectModal, setShowRedirectModal] = useState(false);
  const [selectedAtencionId, setSelectedAtencionId] = useState(null);


  useEffect(() => {
    const fullname = localStorage.getItem('fullname');
    if (fullname) setUserName(fullname);

    fetchAtenciones(); 

  }, []);

  // Fetch turnos from the API each 60 seconds
    useEffect(() => {
    const interval = setInterval(() => {
      fetchAtenciones();    
    }, 60000); // 60 seconds
    return () => clearInterval(interval); // Clear interval on component unmount
    }, []);

  const fetchAtenciones = async () => {
    let servicio = localStorage.getItem('servicios').length > 0 ? JSON.parse(localStorage.getItem('servicios'))[0] : 30001;
    try {
      const response = await getAtenciones({
        codigoServicio: servicio,
        usuarioId: localStorage.getItem('usuarioId'),
      });
      if (response.success) {
        let aux = response.data.map(turno => {
          return {
            codigo: turno.codigoTurno,
            nombre: turno.paciente.nombres,
            apellido: turno.paciente.apellidos,
            estado: !turno.fechaInicio ? "Pendiente" : (turno.fechaFin ? "Finalizado" : "En Atención"),
            prioridad: turno.prioridad,
            documento: turno.paciente.identificacion,
            idAtencion: turno.idAtencion,
          };
        }
        );
        setTurnos(aux);
      } else {
        console.error('Error fetching atenciones:', response.message);
      }
    
    } catch (error) {
      console.error('Error fetching turnos:', error);
    }
  }

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  const handleAction = (action, turno) => {
    if (action === 'abrir') {
      // Logic to open the turno
      console.log('Abrir turno:', turno);
      actionAtencion({
        idAtencion: turno.idAtencion,
        usuarioId: localStorage.getItem('usuarioId'),
      })
      .then(response => {
        if (response.success) {
          console.log('Turno abierto:', response.data);
          setConfirmMessage('Turno abierto exitosamente');
          setShowConfirm(true);
          fetchAtenciones(); // Refresh the list after action

        } else {
          console.error('Error opening turno:', response.message);
        }
      })
      .catch(error => {
        console.error('Error opening turno:', error);
      });
    }
    else if (action === 'cerrar') {
      setSelectedAtencionId(turno.idAtencion);
      setShowRedirectModal(true);
    }
    else if (action === 'abandono') {
      actionAtencion({
        idAtencion: turno.idAtencion,
        usuarioId: localStorage.getItem('usuarioId'),
        abandonada: true,
      })
      .then(response => {
        if (response.success) {
          console.log('Turno marcado como abandono:', response.data);
          setConfirmMessage('Turno marcado como abandono exitosamente');
          setShowConfirm(true);
          fetchAtenciones(); // Refresh the list after action

        } else {
          console.error('Error marking turno as abandono:', response.message);
        }
      })
      .catch(error => {
        console.error('Error marking turno as abandono:', error);
      });
    }
  };

  const handleFilterChange = (value) => setFilter(value);

  const handleSort = (key) => setSortKey(key);

  const handleRedirectConfirm = ({ especialidad, prioridad }) => {
    console.log(`Redireccionar a ${especialidad} con prioridad ${prioridad}`);
    

    let requestBody = {
      idAtencion: selectedAtencionId,
      usuarioId: localStorage.getItem('usuarioId'),
    };

    if (especialidad) requestBody.codigoServicio = especialidad;
    if (prioridad) requestBody.prioridad = prioridad;

    actionAtencion(requestBody)
      .then(response => {
        if (response.success) {
          console.log('Turno cerrado y redireccionado:', response.data);
          setConfirmMessage('Turno cerrado de forma exitosa');

          setShowRedirectModal(false);
          setSelectedAtencionId(null);
          setShowConfirm(true);
          fetchAtenciones();

        } else {
          console.error('Error closing and redirecting turno:', response.message);
        }
      })
      .catch(error => {
        console.error('Error closing and redirecting turno:', error);
      });


  
    // Aquí iría tu llamada al backend si aplica
  
    
  };

  const filteredTurnos = turnos
    .filter(t => !filter || t.especialidad === Number(filter))
    .sort((a, b) => {
      if (!sortKey) return 0;
      if (sortKey === 'prioridad') return a.prioridad - b.prioridad;
      return a[sortKey].localeCompare(b[sortKey]);
    });

  return (
    <div className="dashboard">
      <Header userName={userName} onLogout={handleLogout} />
      <div className="main-content">
        <Table
          data={filteredTurnos}
          onAction={handleAction}
          onFilterChange={handleFilterChange}
          onSort={handleSort}
        />
      </div>
      {showConfirm && (
        <ConfirmToast
          message={confirmMessage}
          onClose={() => setShowConfirm(false)}
        />
      )}
      <ModalCloseAten
        visible={showRedirectModal}
        onClose={() => setShowRedirectModal(false)}
        onConfirm={handleRedirectConfirm}
      />
    </div>
  );
};

export default DashboardPage;
