// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function api(
  path: string,
  options: {
    headers?: Record<string, string>;
    method?: string;
    body?: any;
  } = {}
) {
  const baseUrl = 'http://localhost:3000/api';
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const token = localStorage.getItem('sessionToken');

  const isFormData = options.body instanceof FormData;

  return fetch(`${baseUrl}${normalizedPath}`, {
    headers: {
      ...(isFormData ? {} : { 'Content-Type': 'application/json' }), //si es FormData, no se agrega el header ContentType
      ...(token ? { Authorization: `Bearer ${token}` } : {}), //si no hay token, no se agrega el header Authorization
      ...options.headers,
    },
    method: options.method || 'GET',
    body: isFormData ? options.body : options.body ? JSON.stringify(options.body) : undefined, //si es FormData, se envia tal cual, si no se convierte a JSON
  });
}
