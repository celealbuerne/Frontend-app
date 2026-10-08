import type { Aeronave } from './aeronave.model.ts';

export interface Publicacion {
  id: number;
  fechaAlta: Date;
  fechaModificacion: Date;
  fechaInicioDisponibilidad: Date;
  fechaFinDisponibilidad: Date;
  descripcion: string;
  precioPorKM: number;
  imagen: string; //solo el nombre del archivo que guardo multer
  laAeronave: Aeronave;
}

export interface PublicacionesResponse {
  mensaje: string;
  data: Publicacion[];
}

export interface PublicacionResponse {
  mensaje: string;
  data: Publicacion;
}

export interface PublicacionFiltros {
  precioMin?: number;
  precioMax?: number;
}
