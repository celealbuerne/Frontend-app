import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAllAeropuertos } from '../../services/aeropuerto.service';
import type { Aeropuerto } from '../../models/aeropuerto.model';
import AeropuertoCard from '../../components/Aeropuertos/AeropuertoCard';
import Button from '../../components/ui/Button';
import style from './GestionarAeropuertos.module.css';

export default function GestionarAeropuertos() {
  const navigate = useNavigate();
  const [aeropuertos, setAeropuertos] = useState<Aeropuerto[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelado = false;

    async function cargarAeropuertos() {
      try {
        setError(null);
        const res = await getAllAeropuertos();
        const lista = Array.isArray(res.data)
          ? res.data
          : (res.data?.aeropuertos ?? []);
        if (!cancelado) setAeropuertos(lista);
      } catch (e) {
        if (!cancelado) {
          setAeropuertos([]);
          setError(
            e instanceof Error ? e.message : 'Error al obtener los aeropuertos'
          );
        }
      } finally {
        if (!cancelado) setCargando(false);
      }
    }

    cargarAeropuertos();
    return () => {
      cancelado = true;
    };
  }, []);

  return (
    <main className={style.contenedor}>
      <div className={style.encabezado}>
        <div>
          <h1 className={style.titulo}>Gestionar aeropuertos</h1>
          <Link to="/admin" className={style.botonVolver}>
            Volver al dashboard
          </Link>
        </div>

        <Button
          type="button"
          variant="primary"
          className={style.botonNuevo}
          onClick={() => navigate('/admin/crear-aeropuerto')}
        >
          Nuevo aeropuerto
        </Button>
      </div>

      {cargando && <p className={style.mensaje}>Cargando aeropuertos...</p>}
      {error && <p className={style.error}>{error}</p>}

      {!cargando && !error && aeropuertos.length === 0 && (
        <p className={style.mensaje}>No hay aeropuertos registrados.</p>
      )}

      {!cargando && aeropuertos.length > 0 && (
        <ul className={style.listaTarjetas}>
          {aeropuertos.map((aeropuerto) => (
            <li key={aeropuerto.id} className={style.itemTarjeta}>
              <div className={style.cardContenedor}>
                <AeropuertoCard aeropuerto={aeropuerto} />
              </div>
              <Button
                type="button"
                variant="secondary"
                className={style.botonEditar}
                onClick={() =>
                  navigate(`/admin/editar-aeropuerto/${aeropuerto.id}`)
                }
              >
                Editar
              </Button>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
