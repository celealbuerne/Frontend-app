import { useEffect, useMemo, useState, useCallback } from 'react';
import { GetDisponibilidad } from '../services/publicacion.service';
import type { PeriodoOcupado } from '../models/publicacion.model';
import type { RangoFechas } from '../components/Publicaciones/CalendarioDisponibilidad';
import { toDateKey } from '../utils/date.utils';

export function useDisponibilidad(id: string | number | undefined) {
  const [periodosOcupados, setPeriodosOcupados] = useState<PeriodoOcupado[]>(
    []
  );
  const [cargando, setCargando] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const cargar = useCallback(async () => {
    if (!id || Number.isNaN(Number(id))) {
      setError('El identificador de publicación no es válido.');
      setCargando(false);
      return;
    }

    setCargando(true);
    setError(null);

    try {
      const res = await GetDisponibilidad(Number(id));
      const rawData = res.data as unknown;
      const lista: PeriodoOcupado[] = Array.isArray(rawData)
        ? rawData
        : rawData && typeof rawData === 'object'
          ? [rawData as PeriodoOcupado]
          : [];
      setPeriodosOcupados(lista);
    } catch (e) {
      setError(
        e instanceof Error
          ? e.message
          : 'Error al obtener la disponibilidad de la aeronave'
      );
    } finally {
      setCargando(false);
    }
  }, [id]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    cargar();
  }, [cargar]);

  const rangosOcupados = useMemo<RangoFechas[]>(() => {
    return periodosOcupados
      .map((p) => {
        const inicio = toDateKey(p.fechaInicio);
        const fin = toDateKey(p.fechaFin);
        if (!inicio || !fin) return null;
        return inicio <= fin ? { inicio, fin } : { inicio: fin, fin: inicio };
      })
      .filter((r): r is RangoFechas => r !== null)
      .sort((a, b) => a.inicio.localeCompare(b.inicio));
  }, [periodosOcupados]);

  return {
    rangosOcupados,
    cargando,
    error,
    recargar: cargar,
  };
}
