import { api } from './api';
import type {
  CrearReservaPayload,
  ReservaResponse,
  ReservasDetalleResponse,
  ReservaFiltros,
} from '../models/reserva.model';

export async function createReserva(
  datos: CrearReservaPayload
): Promise<ReservaResponse> {
  const payload: CrearReservaPayload = {
    destino: datos.destino ?? 1, // hardcodeado en 1 de momento
    fechaInicio: datos.fechaInicio,
    fechaFin: datos.fechaFin,
    publicacion: datos.publicacion,
  };

  const response = await api('/reservas', {
    method: 'POST',
    body: payload,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(
      errorData?.message || 'Error al crear la solicitud de reserva'
    );
  }

  return response.json();
}

export async function getAllReservas(filtros: ReservaFiltros = {}): Promise<ReservasDetalleResponse> {
  const params = new URLSearchParams();

  if (filtros.estado !== undefined) {
    params.set('estado', filtros.estado);
  }

  const query = params.toString();
  const response = await api(`/reservas${query ? `?${query}` : ''}`);

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message || 'Error mostrar las reservas');
  }

  return response.json();
}