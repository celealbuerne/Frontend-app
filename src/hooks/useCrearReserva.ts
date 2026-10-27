import { useState } from 'react';
import { createReserva } from '../services/reserva.service';
import { type CrearReservaPayload } from '../models/reserva.model.ts';

export function useCrearReserva() {
  const [enviando, setEnviando] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [exito, setExito] = useState<boolean>(false);

  const crear = async (datos: CrearReservaPayload): Promise<boolean> => {
    setEnviando(true);
    setError(null);

    try {
      await createReserva(datos);
      setExito(true);
      return true;
    } catch (e) {
      setError(
        e instanceof Error
          ? e.message
          : 'Error al enviar la solicitud de reserva'
      );
      return false;
    } finally {
      setEnviando(false);
    }
  };

  const reset = () => {
    setError(null);
    setExito(false);
  };

  return {
    crear,
    enviando,
    error,
    exito,
    reset,
  };
}
