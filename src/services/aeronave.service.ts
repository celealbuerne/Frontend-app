import { api } from './api.ts';
import type { Aeronave } from '../models/aeronave.model.ts';

interface AeronavesResponse {
  mensaje: string;
  data: Aeronave[];
}
//revisar el lo del id y cambiar
export async function getAeronavesByProveedor(
  proveedorID: number
): Promise<AeronavesResponse> {
  const response = await api(`/aeronaves/proveedor/${proveedorID}`);

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);

    throw new Error(errorData?.message || 'Error al obtener las aeronaves');
  }

  return response.json();
}

export async function createAeronave(data: {
  modelo: string;
  fabricante: string;
  descripcion: string;
  capacidad: number;
  autonomia: number;
  velocidadMaxima: number;
  antiguedad: string;
  proveedor: number;
  ultimoAeropuerto: number;
}) {
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
