import { api } from './api.ts';
import type {
  Aeropuerto,
  AeropuertoFiltros,
} from '../models/aeropuerto.model.ts';

interface AeropuertosResponse {
  mensaje: string;
  data: {
    localidad: unknown;
    aeropuertos: Aeropuerto[];
  };
}

export async function getAllAeropuertos(
  filtros: AeropuertoFiltros = {}
): Promise<AeropuertosResponse> {
  const params = new URLSearchParams();

  if (filtros.localidadNombre) {
    params.set('localidadNombre', filtros.localidadNombre.trim());
  }
  if (filtros.codigo) {
    params.set('codigo', filtros.codigo.trim());
  }
  if (Number.isInteger(filtros.localidadID)) {
    params.set('localidadID', String(filtros.localidadID));
  }
  if (filtros.nombre) {
    params.set('nombre', filtros.nombre.trim());
  }

  const query = params.toString();
  const response = await api(`/aeropuertos${query ? `?${query}` : ''}`);

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);

    throw new Error(errorData?.message || 'Error al obtener los aeropuertos');
  }

  return response.json();
}

export async function getOne(id: number): Promise<AeropuertosResponse> {
  const response = await api(`/aeropuertos/${id}`);
  if (!response.ok) {
    const errorData = await response.json().catch(() => null);

    throw new Error(errorData?.message || 'Error al obtener el aeropuerto');
  }

  return response.json();
}

export async function saveOne(data: Omit<Aeropuerto, 'id'>) {
   const response = await api('aeropuertos', {
    method: 'POST',
    body: data,
   }) 

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);

    throw new Error(errorData?.message || 'Error al registrar el aeropuerto');
  }

  return response.json();
}