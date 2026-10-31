import { useEffect, useState } from 'react';
import { getAeronavesByProveedor } from '../../services/aeronave.service.ts';
import type { Aeronave } from '../../models/aeronave.model.ts';
import AeronaveCard from '../../components/Aeronave/AeronaveCard.tsx';
import style from './AeronavePage.module.css';

export default function AeronavePage() {
  const [aeronaves, setAeronaves] = useState<Aeronave[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelado = false;

    async function cargarAeronaves() {
      try {
        const response = await getAeronavesByProveedor();
        if (!cancelado) setAeronaves(response.data);
      } catch (err) {
        if (!cancelado) {
          setError(err instanceof Error ? err.message : 'Error al cargar las aeronaves');
        }
      } finally {
        if (!cancelado) setIsLoading(false);
      }
    }

    cargarAeronaves();

    return () => {
      cancelado = true;
    };
  }, []);

  if (isLoading) return <p className={style.mensaje}>Cargando flota...</p>;

  return (
    <section className={style.pagina}>
      <div className={style.encabezado}>
        <div className={style.textos}>
          <h1 className={style.titulo}>Mi Flota</h1>
          <p className={style.subtitulo}>
            Estas son las aeronaves que tenés registradas. Desde acá podés revisar sus características y usarlas para crear publicaciones.
          </p>
        </div>
      </div>

  {!error && aeronaves.length > 0 && (
    <span className={style.contador}>
      {aeronaves.length} {aeronaves.length === 1 ? 'aeronave' : 'aeronaves'}
    </span>
  )}

      {error && <p className={style.error}>{error}</p>}

      {!error && aeronaves.length === 0 && (
        <p className={style.mensaje}>Todavía no tenés ninguna aeronave.</p>
      )}

      <div className={style.grilla}>
        {aeronaves.map((aeronave) => (
          <AeronaveCard key={aeronave.id} aeronave={aeronave}/>
        ))}
      </div>
    </section>
  );
}