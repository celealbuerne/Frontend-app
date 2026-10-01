export type UserRole = 'ADMIN' | 'CLIENTE' | 'PROVEEDOR';

export interface User {
  id: number;
  fechaAlta: string;
  fechaModificacion: string;
  roles: UserRole[];
  estado: string;
  nombre: string;
  nombreUsuario: string;
  contacto: string[];
  pais: string;
  fechaNacimiento: string;
  tipoDocumento: string;
  documento: number;
}

export interface UserResponse {
  mensaje: string;
  data: User;
}

export interface RegisterPayload {
  nombre: string;
  nombreUsuario: string;
  pais: string;
  fechaNacimiento: string; // Formato "YYYY-MM-DD"
  tipoDocumento: string;
  documento: number; // Debe ser número en el JSON
  contraseña: string;
  rol?: string;
}
