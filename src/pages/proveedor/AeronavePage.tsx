import { useEffect, useState } from 'react';
import { getAeronavesByProveedor } from '../../services/aeronave.service.ts';
import type { Aeronave } from '../../models/aeronave.model.ts';
import { useNavigate } from 'react-router-dom';
import AeronaveFlotaCard from '../../components/Aeronaves/AeronaveFlotaCard.tsx';
import Button from '../../components/ui/Button.tsx';
import style from './AeronavePage.module.css';

export default function AeronavePage() {
  const [aeronaves, setAeronaves] = useState<Aeronave[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

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

  return (
    <section className={style.pagina}>
      <div className={style.encabezado}>
        <div className={style.textos}>
          <h1 className={style.titulo}>Mi Flota</h1>
          <p className={style.subtitulo}>
            Desde acá podés revisar las características de las aeronaves y usarlas para crear publicaciones.
          </p>
        </div>
        <Button
          type="button"
          variant="primary"
          className={style.botonAgregar}
          onClick={() => navigate('/proveedor/crear-aeronave')}
        >
          Agregar aeronave
        </Button>
      </div>
      
      {isLoading && <p className={style.mensaje}>Cargando flota...</p>}

      {error && <p className={style.error}>{error}</p>}

      {!isLoading && !error && aeronaves.length === 0 && (
        <p className={style.mensaje}>Todavía no tenés ninguna aeronave.</p>
      )}

      {!isLoading && !error && aeronaves.length > 0 && (
        <>
        <span className={style.contador}>
          {aeronaves.length}{' '}
          {aeronaves.length === 1 ? 'aeronave' : 'aeronaves'}
        </span>

        <div className={style.grilla}>
          {aeronaves.map((aeronave) => (
            <AeronaveFlotaCard key={aeronave.id} aeronave={aeronave}/>
          ))}
        </div>
      </>
      )}
    </section>
  );
}