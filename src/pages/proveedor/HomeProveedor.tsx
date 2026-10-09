import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/auth.context';
import { getMisPublicaciones } from '../../services/publicacion.service';
import type { Publicacion } from '../../models/publicacion.model';
import PublicacionCard from '../../components/Publicaciones/PublicacionCard';
import style from './HomeProveedor.module.css';
import Button from '../../components/ui/Button';


export default function HomeProveedor() {
  const { currentUser } = useAuth();
  const navigate = useNavigate()

  // null = todavia no llego la respuesta, [] no hay publicaciones
  const [publicaciones, setPublicaciones] = useState<Publicacion[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!currentUser) return;
    let cancelado = false;

    async function cargarPublicaciones(proveedorID: number) {
      try {
        setError(null); //limia cualquier error
        const response = await getMisPublicaciones(proveedorID);
        if (!cancelado) setPublicaciones(response.data);
      } catch (e) {
        if (!cancelado) {  //cancelado es false-> el efecto todavia no fue cancelado
          setPublicaciones([]);
          setError(e instanceof Error ? e.message : 'Error al cargar las publicaciones');
        }
      }
    }

    cargarPublicaciones(currentUser.id);
    return () => {
      cancelado = true;
    };
  }, [currentUser]); // el efecto depende de currentUser

  if (!currentUser) {
    return <p>Usuario no autenticado.</p>;
  }

  return (
    <main className={style.contenedor}>
      <div className={style.encabezado}>
        <h1 className={style.titulo}>Mis publicaciones</h1>
        <Button
          type='button'
          variant='primary'
          className={style.botonNueva}
          onClick={() => navigate('/proveedor/crear-publicacion')}
        >
          Crear Publicación
        </Button>
      </div>
      
      <section className={style.contenedorPublicaciones}>
        {error && <p className={style.error}>{error}</p>}

        {publicaciones !== null && !error && publicaciones.length === 0 && (
          <p className={style.vacio}>Todavía no tenés publicaciones.</p>
        )}

        <section className={style.listado}>
          {(publicaciones ?? []).map((publicacion) => (
            <PublicacionCard key={publicacion.id} publicacion={publicacion} />
          ))}
        </section>
      </section>
    </main>
  );
}