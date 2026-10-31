import type { Aeropuerto } from './aeropuerto.model.ts';
import type { BaseResponse, Publicacion } from './publicacion.model';
import type { User } from './user.model';

export type EstadoReserva =
  'PENDIENTE' | 'CONFIRMADA' | 'CANCELADA' | 'RECHAZADA' | string;

export interface Reserva {
  id: number;
  fechaInicio: string;
  fechaFin: string;
  origen: number;
  destino: number;
  publicacion: number;
  cliente?: User;
  estado?: EstadoReserva;
  montoTotal?: number;
}

export interface CrearReservaPayload {
  destino: number;
  fechaInicio: string; // "YYYY-MM-DD"
  fechaFin: string;
  publicacion: number; // ID de la publicacion
}

export interface ReservaDetalle {
  id: number;
  fechaInicio: string;
  fechaFin: string;
  montoTotal: number;
  estado: EstadoReserva;
  origen: Aeropuerto;
  destino: Aeropuerto;
  cliente: User;
  publicacion: Publicacion;
}

export interface ReservaFiltros {
  //por el momento, despues agregar publicaciones
  estado?: EstadoReserva;
}

export interface ReservaResponse extends BaseResponse {
  data: Reserva;
}

export interface ReservasResponse extends BaseResponse {
  data: Reserva[];
}

export interface ReservasDetalleResponse extends BaseResponse {
  data: ReservaDetalle[];
}
