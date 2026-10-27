import { useEffect, useState, useCallback } from 'react';
import { getOnePublicacion } from '../services/publicacion.service';
import type { Publicacion } from '../models/publicacion.model';

export function usePublicacion(id: string | number | undefined) {
  const [publicacion, setPublicacion] = useState<Publicacion | null>(null);
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
      const res = await getOnePublicacion(Number(id));
      setPublicacion(res.data);
    } catch (e) {
      setError(
        e instanceof Error ? e.message : 'Error al cargar la publicación'
      );
    } finally {
      setCargando(false);
    }
  }, [id]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    cargar();
  }, [cargar]);

  return {
    publicacion,
    cargando,
    error,
    recargar: cargar,
  };
}
