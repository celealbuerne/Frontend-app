import { api } from './api.ts';

export async function login(user: string, password: string) {
  try {
    const payload = {
      nombreUsuario: user,
      contraseña: password,
    };

    const response = await api('/auth/login', {
      method: 'POST',
      body: payload,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || 'Error al iniciar sesión');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
