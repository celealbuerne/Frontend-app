import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import PublicacionCard from '../../components/Publicaciones/PublicacionCard';
import PublicacionFiltros from '../../components/Publicaciones/PublicacionFiltros';
import { getAllPublicaciones } from '../../services/publicacion.service';
import type { Publicacion } from '../../models/publicacion.model';
import style from './PublicacionHome.module.css';

export default function PublicacionHome() {
  const [params, setParams] = useSearchParams();
  const [publicaciones, setPublicaciones] = useState<Publicacion[] | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  const precioMin = params.get('precioMin') ?? '';
  const precioMax = params.get('precioMax') ?? '';

  useEffect(() => {
    let cancelado = false;

    async function cargarPublicaciones() {
      setPublicaciones(null);
      setError(null);

      const minNum =
        precioMin.trim() !== '' &&
        Number.isFinite(Number(precioMin)) &&
        Number(precioMin) >= 0
          ? Number(precioMin)
          : undefined;

      const maxNum =
        precioMax.trim() !== '' &&
        Number.isFinite(Number(precioMax)) &&
        Number(precioMax) >= 0
          ? Number(precioMax)
          : undefined;

      try {
        const res = await getAllPublicaciones({
          precioMin: minNum,
          precioMax: maxNum,
        });
        if (!cancelado) {
          setPublicaciones(res.data);
        }
      } catch (e) {
        if (!cancelado) {
          setPublicaciones([]);
          setError(
            e instanceof Error ? e.message : 'Error al cargar las publicaciones'
          );
        }
      }
    }

    cargarPublicaciones();

    return () => {
      cancelado = true;
    };
  }, [precioMin, precioMax]);

  const handleFiltrar = ({
    precioMin: min,
    precioMax: max,
  }: {
    precioMin: string;
    precioMax: string;
  }) => {
    const nuevoParams = new URLSearchParams();
    if (min) nuevoParams.set('precioMin', min);
    if (max) nuevoParams.set('precioMax', max);
    setParams(nuevoParams);
  };

  const handleLimpiar = () => {
    setParams({});
  };

  return (
    <main className={style.contenedor}>
      <div className={style.cabecera}>
        <h1 className={style.titulo}>Publicaciones disponibles</h1>
      </div>

      <div className={style.contenidoPrincipal}>
        <aside className={style.lateralFiltros}>
          <PublicacionFiltros
            precioMin={precioMin}
            precioMax={precioMax}
            onFiltrar={handleFiltrar}
            onLimpiar={handleLimpiar}
          />
        </aside>

        <section className={style.seccionPublicaciones}>
          <div className={style.seccionCabecera}>
            <h2 className={style.seccionTitulo}>Resultados</h2>
            {publicaciones && (
              <span className={style.contador}>
                {publicaciones.length}{' '}
                {publicaciones.length === 1
                  ? 'publicación disponible'
                  : 'publicaciones disponibles'}
              </span>
            )}
          </div>

          {error && <p className={style.mensajeError}>{error}</p>}

          {publicaciones === null && (
            <div className={style.estado}>
              <p>Cargando publicaciones...</p>
            </div>
          )}

          {publicaciones?.length === 0 && !error && (
            <div className={style.estado}>
              <p>No se encontraron publicaciones en ese rango de precio.</p>
            </div>
          )}

          <div className={style.listado}>
            {(publicaciones ?? []).map((publicacion) => (
              <PublicacionCard key={publicacion.id} publicacion={publicacion} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
