import type { Localidad } from './localidad.model';

export interface Aeropuerto {
  id: number;
  fechaAlta: string;
  fechaModificacion: string;
  nombre: string;
  codigo: string;
  localidadID: Localidad;
}

export interface CreateAeropuerto {
  nombre: string;
  codigo: string;
  localidadID: number;
}

export interface AeropuertoFiltros {
  nombre?: string;
  localidadID?: number;
  localidadNombre?: string;
  codigo?: string;
}
