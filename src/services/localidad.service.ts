import { api } from './api';
import type {
  CreateLocalidad,
  LocalidadResponse,
  LocalidadesResponse,
} from '../models/localidad.model';

export async function findAll(): Promise<LocalidadesResponse> {
  const response = await api(`/localidades`);

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message || 'Error al obtener las localidades');
  }

  return response.json();
}

export async function findOne(
  aeropuertoID: number
): Promise<LocalidadResponse> {
  const response = await api(`/localidades/${aeropuertoID}`);

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message || 'Error al buscar la localidad');
  }

  return response.json();
}

export async function createOne(input: CreateLocalidad) {
  const response = await api(`/localidades`, {
    method: 'POST',
    body: input,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message || 'Error al crear la localidad');
  }

  return response.json();
}

export async function updateOne(
  idLocalidad: number,
  cambios: Partial<CreateLocalidad>
): Promise<LocalidadResponse> {
  const response = await api(`/localidades/${idLocalidad}`, {
    method: 'PATCH',
    body: cambios,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message || 'Error al modificar la localidad');
  }

  return response.json();
}
