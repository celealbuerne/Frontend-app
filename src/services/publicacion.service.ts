import { api } from './api.ts';
import type {PublicacionesResponse, PublicacionResponse, PublicacionFiltros, Publicacion} from '../models/publicacion.model.ts';

export async function getAllPublicaciones(filtros: PublicacionFiltros = {}): Promise<PublicacionesResponse> {
  const params = new URLSearchParams();

  if (filtros.precioMin !== undefined) {
    params.set('precioMin', filtros.precioMin.toString()); //guarda en params el valor de filtros.precioMin como parámetro de URL
  }
  if (filtros.precioMax !== undefined) {
    params.set('precioMax', filtros.precioMax.toString());
  }
  const query = params.toString();
  const response = await api(`/publicaciones${query ? `?${query}` : ''}`);

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message || 'Error al obtener las publicaciones');
  }

  return response.json();
}

export async function getOnePublicacion(id: number): Promise<PublicacionResponse> {
  const response = await api(`/publicaciones/${id}`);
  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message || 'Error al obtener la publicación');
  }
  return response.json();
}

export async function createPublicacion(data: FormData){
  const response = await api('/publicaciones', {
    method: 'POST',
    body: data,
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message || 'Error al crear la publicación');
  }
  return response.json();
}

export async function getMisPublicaciones(proveedorId: number): Promise<PublicacionesResponse> {
  const response = await api(`/publicaciones/MisPublicaciones/${proveedorId}`);
  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message || 'Error al obtener las publicaciones');
  }
  return response.json();
}

export async function getPublicacionesRecientes() {
  const res = await api(`/publicaciones/recientes`);
  if (!res.ok) throw new Error('Error al cargar las publicaciones');
  return res.json() as Promise<{ data: Publicacion[] }>;
}
