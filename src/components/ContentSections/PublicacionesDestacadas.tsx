import { Link } from 'react-router-dom';
import PublicacionCard from '../Publicaciones/PublicacionCard';
import style from './PublicacionesDestacadas.module.css';
import { getPublicacionesRecientes } from '../../services/publicacion.service';
import type { Publicacion } from '../../models/publicacion.model';
import { useState, useEffect } from 'react';

//lo cambie a publicaciones recientes por simplicidad de md
export default function Publicaciones() {

  const [publicaciones, setPublicaciones] = useState<Publicacion[] | null >(null)
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelado = false;

    async function cargar() {
      try {
        const response = await getPublicacionesRecientes();
        if (!cancelado) setPublicaciones(response.data);
      } catch (e) {
        if (!cancelado) {
          setPublicaciones([]);
          setError(e instanceof Error ? e.message : 'Error al cargar las publicaciones');
        }
      }
    }
    cargar();
    return () => {
      cancelado = true;
    };
  }, []);
  
  return (
    <>
      <div className={style.headMenu}>
        <h2 className={style.titulo}>Publicaciones Destacadas</h2>
        <Link to="/publicacion" className={style.botonMas}>
          Ver más
        </Link>
      </div>
      
      {error && <p className={style.mensaje}>{error}</p>}
      {publicaciones === null && <p className={style.mensaje}>Cargando...</p>}
      {publicaciones?.length === 0 && !error && <p className={style.mensaje}>Todavía no hay publicaciones.</p>}

      <div className={style.publicaciones}>
        {(publicaciones ?? []).map((publicacion) => {
          return (
            <PublicacionCard key={publicacion.id} publicacion={publicacion} />
          );
        })}
      </div>
    </>
  );
}
