import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  findOne,
  createOne,
  updateOne,
} from '../../services/localidad.service';
import type { Localidad, CreateLocalidad } from '../../models/localidad.model';
import LocalidadForm from '../../components/Localidad/LocalidadForm.tsx';
import style from './CrearLocalidad.module.css';

export default function CrearLocalidad() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const editando = Boolean(id);

  const [localidadInicial, setLocalidadInicial] = useState<
    Localidad | undefined
  >(undefined);
  const [cargando, setCargando] = useState(editando);
  const [errorCarga, setErrorCarga] = useState<string | null>(null);

  useEffect(() => {
    if (!editando) return;
    let cancelado = false;

    async function cargarLocalidad() {
      try {
        const res = await findOne(Number(id));
        if (!cancelado) setLocalidadInicial(res.data);
      } catch (e) {
        if (!cancelado) {
          setErrorCarga(
            e instanceof Error ? e.message : 'Error al cargar la localidad.'
          );
        }
      } finally {
        if (!cancelado) setCargando(false);
      }
    }

    cargarLocalidad();
    return () => {
      cancelado = true;
    };
  }, [editando, id]);

  const guardarForm = async (datos: CreateLocalidad) => {
    if (editando && id) {
      await updateOne(Number(id), datos);
    } else {
      await createOne(datos);
    }
    navigate('/admin/localidades');
  };

  return (
    <main className={style.contenedor}>
      <div className={style.encabezado}>
        <div className={style.textos}>
          <h1 className={style.titulo}>
            {editando ? 'Editar localidad' : 'Crear localidad'}
          </h1>
          <p className={style.subtitulo}>
            {editando
              ? 'Modificá los datos de la localidad.'
              : 'Registrá una localidad para poder asignarle aeropuertos.'}
          </p>
        </div>
        <Link to="/admin/localidades" className={style.botonVolver}>
          ← Volver a gestión localidades
        </Link>
      </div>

      {cargando ? (
        <p className={style.mensaje}>Cargando localidad...</p>
      ) : errorCarga ? (
        <p className={style.error}>{errorCarga}</p>
      ) : (
        <LocalidadForm
          valoresIniciales={localidadInicial}
          textoBoton={editando ? 'Guardar cambios' : 'Registrar localidad'}
          onSubmit={guardarForm}
        />
      )}
    </main>
  );
}
