import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getOne, saveOne, updateOne } from '../../services/aeropuerto.service';
import type {
  Aeropuerto,
  CreateAeropuerto,
} from '../../models/aeropuerto.model';
import AeropuertoForm from '../../components/Aeropuertos/AeropuertoForm';
import style from './CrearAeropuerto.module.css';
import { useAuth } from '../../contexts/auth.context.tsx';

export default function CrearAeropuerto() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const editando = Boolean(id) && currentUser?.roles.includes('ADMIN');

  const [aeropuertoInicial, setAeropuertoInicial] = useState<
    Aeropuerto | undefined
  >(undefined);
  const [cargando, setCargando] = useState(editando);
  const [errorCarga, setErrorCarga] = useState<string | null>(null);

  useEffect(() => {
    if (!editando) return;

    let cancelado = false;
    async function cargarAeropuerto() {
      try {
        setCargando(true);
        const res = await getOne(Number(id));
        if (!cancelado) setAeropuertoInicial(res.data);
      } catch (e) {
        if (!cancelado) {
          setErrorCarga(
            e instanceof Error ? e.message : 'Error al cargar el aeropuerto.'
          );
        }
      } finally {
        if (!cancelado) setCargando(false);
      }
    }

    cargarAeropuerto();
    return () => {
      cancelado = true;
    };
  }, [editando, id]);

  const guardarForm = async (datos: CreateAeropuerto) => {
    if (editando && id) {
      await updateOne(Number(id), datos);
    } else {
      await saveOne(datos);
    }
    navigate('/admin/aeropuertos');
  };

  return (
    <main className={style.contenedor}>
      <div className={style.encabezado}>
        <h1 className={style.titulo}>
          {editando ? 'Editar aeropuerto' : 'Nuevo aeropuerto'}
        </h1>
        <Link to="/admin/aeropuertos" className={style.botonVolver}>
          Volver a aeropuertos
        </Link>
      </div>

      {cargando ? (
        <p className={style.mensaje}>Cargando aeropuerto...</p>
      ) : errorCarga ? (
        <p className={style.error}>{errorCarga}</p>
      ) : (
        <AeropuertoForm
          valoresIniciales={aeropuertoInicial}
          textoBoton={editando ? 'Guardar cambios' : 'Registrar aeropuerto'}
          onSubmit={guardarForm}
        />
      )}
    </main>
  );
}
