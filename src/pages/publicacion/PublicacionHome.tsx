import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import PublicacionCard from '../../components/Publicaciones/PublicacionCard';
import { getAllPublicaciones } from '../../services/publicacion.service';
import type { Publicacion } from '../../models/publicacion.model';
import style from './PublicacionHome.module.css';
import InputField from '../../components/ui/InputField';
import Button from '../../components/ui/Button';

export default function PublicacionHome() {
  const [params, setParams] = useSearchParams();
  const [publicaciones, setPublicaciones] = useState<Publicacion[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const precioMin = params.get('precioMin') ?? '';
  const precioMax = params.get('precioMax') ?? '';

  useEffect(() => {
    let cancelado = false;
    setPublicaciones(null);
    setError(null);

    getAllPublicaciones({
      precioMin: precioMin !== '' ? Number(precioMin) : undefined,
      precioMax: precioMax !== '' ? Number(precioMax) : undefined,
    })
      .then((res) => {
        if (!cancelado) setPublicaciones(res.data);
      })
      .catch((e) => {
        if (cancelado) return;
        setPublicaciones([]);
        setError(e instanceof Error ? e.message : 'Error al cargar las publicaciones');
      });

    return () => {
      cancelado = true;
    };
  }, [precioMin, precioMax]);

  const aplicarFiltros = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const datos = new FormData(event.currentTarget);
    const min = String(datos.get('precioMin') ?? '');
    const max = String(datos.get('precioMax') ?? '');

    const esPrecioValido = (valor: string) =>
      valor === '' || (Number.isFinite(Number(valor)) && Number(valor) >= 0);

    if (!esPrecioValido(min) || !esPrecioValido(max)) {
      setError('Los precios deben ser números mayores o iguales a 0.');
      return;
    }

    if (min && max && Number(min) > Number(max)) {
      setError('El precio mínimo no puede ser mayor al máximo.');
      return;
    }

    setError(null);
    const nuevoParams = new URLSearchParams();
    if (min) nuevoParams.set('precioMin', min);
    if (max) nuevoParams.set('precioMax', max);
    setParams(nuevoParams);
  };

  return (
    <main className={style.contenedor}>
      <h1 className={style.titulo}>Publicaciones disponibles</h1>

      {/* key reinicia el formulario cuando cambia la URL (al limpiar) */}
      <form  key={params.toString()} className={style.filtros} onSubmit={aplicarFiltros}>
        <InputField
          label="Precio mín. (USD/km)"
          type="number"
          name="precioMin"
          min="0"
          step="any"
          defaultValue={precioMin}
        />
        <InputField
          label="Precio máx. (USD/km)"
          type="number"
          name="precioMax"
          min="0"
          step="any"
          defaultValue={precioMax}
        />

        <div className={style.acciones}>
          <Button type="submit" className={style.botonFiltrar}>
            Filtrar
          </Button>
          <Button
            type="button"
            variant='outline'
            className={style.botonLimpiar}
            onClick={() => setParams({})}
          >
            Limpiar
          </Button>
        </div>
      </form>

      {error && <p className={style.mensaje}>{error}</p>}
      {publicaciones === null && <p className={style.mensaje}>Cargando...</p>}
      {publicaciones?.length === 0 && !error && (
        <p className={style.mensaje}>
          No hay publicaciones en ese rango de precio.
        </p>
      )}

      <div className={style.listado}>
        {(publicaciones ?? []).map((publicacion) => (
          <PublicacionCard key={publicacion.id} publicacion={publicacion} />
        ))}
      </div>
    </main>
  );
}
