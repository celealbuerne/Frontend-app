import type { Aeropuerto } from './aeropuerto.model';
import type { User } from './user.model';
//por el momento
export interface Aeronave {
  id: number;
  fechaAlta: string;
  fechaModificacion: string;
  modelo: string;
  fabricante: string;
  descripcion: string;
  capacidad: number;
  autonomia: number;
  velocidadMaxima: number;
  antiguedad: string;
  ultimoAeropuerto: Aeropuerto;
  proveedor: User;
}

export interface CrearAeronaveInput {
  modelo: string;
  fabricante: string;
  descripcion?: string;
  capacidad: number;
  autonomia: number;
  velocidadMaxima: number;
  antiguedad: string;
  ultimoAeropuerto: number;
}