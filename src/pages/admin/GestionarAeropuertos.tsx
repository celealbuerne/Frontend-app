import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAllAeropuertos } from '../../services/aeropuerto.service';
import type { Aeropuerto } from '../../models/aeropuerto.model';
import { useAuth } from '../../contexts/auth.context';
import { deleteAeropuerto } from '../../services/aeronave.service';
import AeropuertoCard from '../../components/Aeropuertos/AeropuertoCard';
import Button from '../../components/ui/Button';
import style from './GestionarAeropuertos.module.css';

export default function GestionarAeropuertos() {
  const navigate = useNavigate();
  const { isLogged, currentUser } = useAuth();
  const esAdmin = Boolean(isLogged && currentUser?.roles.includes('ADMIN'));

  const [aeropuertos, setAeropuertos] = useState<Aeropuerto[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [exito, setExito] = useState<string | null>(null);

  const handleEliminar = async (id: number) => {
    try {
      setError(null);
      setExito(null);
      await deleteAeropuerto(id);
      setAeropuertos((prev) =>
        prev.filter((aeropuerto) => aeropuerto.id !== id)
      );
      setExito('Aeropuerto eliminado correctamente.');
    } catch (e) {
      setError(
        e instanceof Error ? e.message : 'Error al eliminar el aeropuerto'
      );
    }
  };

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
          <h1 className={style.titulo}>
            {esAdmin ? 'Gestionar aeropuertos' : 'Aeropuertos Disponibles'}
          </h1>
          {esAdmin && (
            <Link to="/admin" className={style.botonVolver}>
              Volver al dashboard
            </Link>
          )}
        </div>

        {esAdmin && (
          <Button
            type="button"
            variant="primary"
            className={style.botonNuevo}
            onClick={() => navigate('/admin/crear-aeropuerto')}
          >
            Nuevo aeropuerto
          </Button>
        )}
      </div>

      {cargando && <p className={style.mensaje}>Cargando aeropuertos...</p>}
      {error && <p className={style.error}>{error}</p>}
      {exito && <p className={style.exito}>{exito}</p>}

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
              {esAdmin && (
                <div className={style.botonesAdmin}>
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

                  <Button
                    type="button"
                    variant="danger"
                    className={style.botonEliminar}
                    onClick={() => handleEliminar(aeropuerto.id)}
                  >
                    Eliminar
                  </Button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
