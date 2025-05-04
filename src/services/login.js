const API_URL = process.env.REACT_APP_API_URL;

export const loginUser = async ({ parametroBusqueda, password }) => {
  try {
    const response = await fetch(`${API_URL}/usuarios/api/usuarios/sesiones`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        targetMethod: "POST",
        queryParams: null,
        body: { parametroBusqueda, password }
      }),
    });

    if (!response.ok) {
      throw new Error('Error al iniciar sesión');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};
