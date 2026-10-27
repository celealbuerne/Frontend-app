/**
 * Extrae la parte YYYY-MM-DD de una fecha (sea ISO o string plano)
 */
export function toDateKey(fecha: string): string {
  if (!fecha) return '';
  return fecha.slice(0, 10);
}

/**
 * Formatea una fecha YYYY-MM-DD a DD/MM/AAAA
 */
export function formatearFecha(fecha: string): string {
  if (!fecha) return '';
  const [y, m, d] = fecha.slice(0, 10).split('-');
  return `${d}/${m}/${y}`;
}

/**
 * Calcula la cantidad de días enteros entre dos fechas YYYY-MM-DD (inclusive)
 * se concatena 'T00:00:00' para que js interprete siempre la hora local
 */
export function calcularDias(inicio: string, fin: string): number {
  if (!inicio || !fin) return 0;
  const f1 = new Date(`${inicio}T00:00:00`);
  const f2 = new Date(`${fin}T00:00:00`);
  const diffMs = f2.getTime() - f1.getTime();
  return Math.round(diffMs / (1000 * 60 * 60 * 24)) + 1;
}
