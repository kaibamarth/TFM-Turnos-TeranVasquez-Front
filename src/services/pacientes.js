export const crearPaciente = async ({nombres, apellidos, fechaNacimiento, telefono, identificacion, condicion = 20001}) => {
    const API_URL = process.env.REACT_APP_API_URL;
    try {
        const response = await fetch(`${API_URL}/pacientes/api/pacientes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                targetMethod: "POST",
                queryParams: null,
                body: { nombres, apellidos, fechaNacimiento, telefono, identificacion, condicion }
            }),
        });

        if (!response.ok) {
            throw new Error('Error al crear paciente');
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
}