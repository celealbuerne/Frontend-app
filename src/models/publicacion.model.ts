import type { Aeronave } from './aeronave.model.ts';
import type { User } from './user.model.ts';

export interface Publicacion {
  id: number;
  fechaAlta: Date;
  fechaModificacion: Date;
  descripcion: string;
  precioPorDia: number;
  imagen: string; //solo el nombre del archivo que guardo multer
  aeronave: Aeronave;
  proveedor: User;
}

export interface PublicacionFiltros {
  precioMin?: number;
  precioMax?: number;
}

export interface BaseResponse {
  mensaje: string;
  data: unknown;
}

export interface PublicacionesResponse extends BaseResponse {
  data: Publicacion[];
}

export interface PublicacionResponse extends BaseResponse {
  data: Publicacion;
}

export interface PeriodoOcupado {
  fechaInicio: string;
  fechaFin: string;
}

export interface DisponibilidadResponse extends BaseResponse {
  data: PeriodoOcupado[];
}
