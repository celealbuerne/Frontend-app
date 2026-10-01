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

  return fetch(`${baseUrl}${normalizedPath}`, {
    headers: {
      'content-type': 'application/json',
      ...options.headers,
    },
    method: options.method || 'GET',
    body: options.body ? JSON.stringify(options.body) : undefined,
  });
}
