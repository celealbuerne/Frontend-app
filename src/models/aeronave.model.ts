import type { Aeropuerto } from './aeropuerto.model';
//por el momento
export interface Aeronave {
  id: number;
  fechaAlta: Date;
  fechaModificacion: Date;
  modelo: string;
  fabricante: string;
  descripcion: string;
  capacidad: number;
  autonomia: number;
  velocidadMaxima: number;
  antiguedad: Date;
  elAeropuerto: Aeropuerto;
}
