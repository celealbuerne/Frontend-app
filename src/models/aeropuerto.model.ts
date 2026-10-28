export interface Aeropuerto {
  id: number;
  nombre: string;
  codigo: string;
}

export interface AeropuertoFiltros {
  nombre?: string;
  localidadID?: number;
  localidadNombre?: string;
  codigo?: string;
}
