import { api } from './api.ts';
import type { Aeronave, CrearAeronaveInput } from '../models/aeronave.model.ts';

interface AeronavesResponse {
  mensaje: string;
  data: Aeronave[];
}

export async function getAeronavesByProveedor(): Promise<AeronavesResponse> {
  const response = await api(`/aeronaves/mis-aeronaves`);

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);

    throw new Error(errorData?.message || 'Error al obtener las aeronaves');
  }

  return response.json();
}

export async function createAeronave(data: CrearAeronaveInput) {
  const response = await api('/aeronaves', {
    method: 'POST',
    body: data,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);

    throw new Error(errorData?.message || 'Error al crear la aeronave');
  }

  return response.json();
}
