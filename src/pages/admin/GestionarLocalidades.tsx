import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { findAll } from '../../services/localidad.service';
import type { Localidad } from '../../models/localidad.model';
import Button from '../../components/ui/Button';
import style from './GestionarLocalidades.module.css';
import LocalidadCard from '../../components/Localidad/LocalidadCard';

export default function GestionarLocalidades() {
  const navigate = useNavigate();
  const [localidades, setLocalidades] = useState<Localidad[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelado = false;

    async function cargarLocalidades() {
      try {
        setError(null);
        const res = await findAll();
        if (!cancelado) setLocalidades(res.data);
      } catch (e) {
        if (!cancelado) {
          setLocalidades([]);
          setError(
            e instanceof Error ? e.message : 'Error al obtener las localidades'
          );
        }
      } finally {
        if (!cancelado) setCargando(false);
      }
    }

    cargarLocalidades();
    return () => {
      cancelado = true;
    };
  }, []);

  return (
    <main className={style.pagina}>
      <div className={style.contenedor}>
        <div className={style.encabezado}>
        <div>
          <h1 className={style.titulo}>Gestionar localidades</h1>
          <Link to="/admin" className={style.botonVolver}>
            Volver al dashboard
          </Link>
        </div>

        <Button
          type="button"
          variant="primary"
          className={style.botonNuevo}
          onClick={() => navigate('/admin/crear-localidad')}
        >
          Nueva localidad
        </Button>
      </div>

      {cargando && <p className={style.mensaje}>Cargando localidades...</p>}
      {error && <p className={style.error}>{error}</p>}

      {!cargando && !error && localidades.length === 0 && (
        <p className={style.mensaje}>No hay localidades registradas.</p>
      )}

      {!cargando && localidades.length > 0 && (
        <ul className={style.lista}>
          {localidades.map((localidad) => (
            <li key={localidad.id} className={style.item}>
              <div className={style.cardContenedor}>
                <LocalidadCard localidad={localidad} />
              </div>
              <Button
                type="button"
                variant="secondary"
                className={style.botonEditar}
                onClick={() =>
                  navigate(`/admin/editar-localidad/${localidad.id}`)
                }
              >
                Editar
              </Button>
            </li>
          ))}
        </ul>
      )}
      </div>
    </main>
  );
}
