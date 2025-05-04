const API_URL = process.env.REACT_APP_API_URL;

export const getAtenciones = async ({ codigoServicio, usuarioId }) => {
    
    try {
        const response = await fetch(`${API_URL}/turnos/api/turnos/atenciones`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            targetMethod: "GET",
            queryParams: {
                codigoServicio: [codigoServicio],
                usuarioId: [usuarioId]
            },
            body: null
        }),
        });
        if (!response.ok) {
        throw new Error('Error al obtener atenciones');
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
}

export const actionAtencion = async ({ idAtencion, usuarioId, abandonada, codigoServicio, prioridad }) => {
    try {

        let bodyParams = {
            usuarioId
        };
        if (abandonada) bodyParams.abandonada = abandonada;
        if (codigoServicio) bodyParams.codigoServicio = codigoServicio;
        if (prioridad) bodyParams.prioridad = prioridad;


        const response = await fetch(`${API_URL}/turnos/api/turnos/atenciones/`+idAtencion, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            targetMethod: "PATCH",
            queryParams: null,
            body: bodyParams
        }),
        });
        if (!response.ok) {
        throw new Error('Error al realizar la acción en la atención');
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
}
