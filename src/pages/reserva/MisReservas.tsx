import { useEffect, useState } from 'react';
import style from './MisReservas.module.css';
import { useAuth } from '../../contexts/auth.context';
import { getAllReservas } from '../../services/reserva.service';
import type { ReservaDetalle } from '../../models/reserva.model';
import ReservaCard from '../../components/Reservas/ReservaCard';

export default function MisReservas() {
  const { currentUser } = useAuth();
  const [reservas, setReservas] = useState<ReservaDetalle[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const esProveedor = currentUser?.roles?.includes('PROVEEDOR') ?? false;

  useEffect(() => {
    let cancelado = false;
    async function cargarReservas() {
      try {
        const res = await getAllReservas({ estado: 'PENDIENTE' });
        if (!cancelado) {
          setReservas(res.data);
        }
      } catch (err) {
        if (!cancelado) {
          setError(
            err instanceof Error ? err.message : 'Error al cargar las reservas'
          );
        }
      } finally {
        if (!cancelado) {
          setIsLoading(false);
        }
      }
    }

    cargarReservas();
    return () => {
      cancelado = true;
    };
  }, []);

  if (isLoading) return <p className={style.mensaje}>Cargando reservas...</p>;
  if (error) return <p className={style.mensaje}>{error}</p>;

  return (
    <section className={style.contenedor}>
      <h2>Mis reservas</h2>

      {reservas.length === 0 ? (
        <p className={style.mensaje}>No tenés ninguna reserva.</p>
      ) : (
        <div className={style.lista}>
          {reservas.map((reserva) => (
            <ReservaCard
              key={reserva.id}
              reserva={reserva}
              esProveedor={esProveedor}
            />
          ))}
        </div>
      )}
    </section>
  );
}
