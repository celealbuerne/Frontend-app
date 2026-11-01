import { Link } from 'react-router-dom';
import PublicacionCard from '../Publicaciones/PublicacionCard';
import style from './PublicacionesDestacadas.module.css';
import { getPublicacionesRecientes } from '../../services/publicacion.service';
import type { Publicacion } from '../../models/publicacion.model';
import { useState, useEffect, useRef } from 'react';

export default function Publicaciones() {
  const [publicaciones, setPublicaciones] = useState<Publicacion[] | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const carruselRef = useRef<HTMLDivElement>(null); // Guarda una referencia al div que se desliza; arranca en null hasta que React lo dibuja

  useEffect(() => {
    let cancelado = false;

    async function cargar() {
      try {
        const response = await getPublicacionesRecientes();
        if (!cancelado) setPublicaciones(response.data);
      } catch (e) {
        if (!cancelado) {
          setPublicaciones([]);
          setError(
            e instanceof Error ? e.message : 'Error al cargar las publicaciones'
          );
        }
      }
    }
    cargar();
    return () => {
      cancelado = true;
    };
  }, []);

  function moverCarrusel(direccion: number) {
    if (carruselRef.current) {
      carruselRef.current.scrollBy({
        left: direccion * carruselRef.current.clientWidth,
        behavior: 'smooth',
      });
    }
  }

  return (
    <>
      <div className={style.headMenu}>
        <h2 className={style.titulo}>Publicaciones recientes</h2>
        <Link to="/publicaciones" className={style.botonMas}>
          Ver más
        </Link>
      </div>

      {error && <p className={style.mensaje}>{error}</p>}
      {publicaciones === null && <p className={style.mensaje}>Cargando...</p>}
      {publicaciones?.length === 0 && !error && (
        <p className={style.mensaje}>Todavía no hay publicaciones.</p>
      )}

      {publicaciones && publicaciones.length > 0 && (
        <div className={style.carrusel}>
          <button
            type="button"
            className={style.flecha}
            onClick={() => moverCarrusel(-1)}
          >
            &#10094; {/*simbolo de la flecha izquierda*/}
          </button>

          <div className={style.publicaciones} ref={carruselRef}>
            {publicaciones.map((publicacion) => (
              <div className={style.tarjeta} key={publicacion.id}>
                <PublicacionCard publicacion={publicacion} />
              </div>
            ))}
          </div>

          <button
            type="button"
            className={style.flecha}
            onClick={() => moverCarrusel(1)}
          >
            &#10095;
          </button>
        </div>
      )}
    </>
  );
}

