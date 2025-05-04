const API_URL = process.env.REACT_APP_API_URL;

export const solicitarTurno = async ({ documentoPaciente, prioridad, codigoServicio }) => {
  try {
    const response = await fetch(`${API_URL}/turnos/api/turnos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        targetMethod: "POST",
        queryParams: null,
        body: { documentoPaciente, prioridad, codigoServicio }
      }),
    });

    if (!response.ok) {
      throw new Error('Error al solicitar turno');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const obtenerTurnosByDate = async ({ antesDe, despuesDe }) => {
  try {
    const response = await fetch(`${API_URL}/turnos/api/turnos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        targetMethod: "GET",
        queryParams: {
          antesDe: [antesDe],
          despuesDe: [despuesDe]
        },
        body: null
      }),
    });

    if (!response.ok) {
      throw new Error('Error al obtener turnos');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
}
