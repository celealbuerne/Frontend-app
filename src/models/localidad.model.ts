export interface Localidad {
  id: number;
  fechaAlta: string;
  fechaModificacion: string;
  pais: string;
  provincia: string;
  nombre: string;
  codigoPostal: number;
}

export interface CreateLocalidad {
  pais: string;
  provincia: string;
  nombre: string;
  codigoPostal: number;
}

export interface BaseResponse {
  mensaje: string;
  data: unknown;
}

export interface LocalidadesResponse extends BaseResponse {
  data: Localidad[];
}

export interface LocalidadResponse extends BaseResponse {
  data: Localidad;
}
