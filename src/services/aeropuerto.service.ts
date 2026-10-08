import { api } from './api.ts';
import type { Aeropuerto } from '../models/aeropuerto.model.ts';

interface AeropuertosResponse {
  mensaje: string;
  data: {
    localidad: unknown;
    aeropuertos: Aeropuerto[];
  };
}

export async function getAllAeropuertos(): Promise<AeropuertosResponse> {
  const response = await api('/aeropuertos');

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);

    throw new Error(
      errorData?.message || 'Error al obtener los aeropuertos'
    );
  }

  return response.json();
}