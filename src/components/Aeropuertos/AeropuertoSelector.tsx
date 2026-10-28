import { useState, type SubmitEvent } from 'react';
import { getAllAeropuertos } from '../../services/aeropuerto.service';
import type { Aeropuerto } from '../../models/aeropuerto.model';
import InputField from '../ui/InputField';
import SelectField from '../ui/SelectField';
import Button from '../ui/Button';
import AeropuertoCard from './AeropuertoCard';
import style from './AeropuertoSelector.module.css';

interface AeropuertoSelectorProps {
  aeropuertoSeleccionado?: Aeropuerto | null;
  onSeleccionar: (aeropuerto: Aeropuerto) => void;
}

export default function AeropuertoSelector({
  aeropuertoSeleccionado,
  onSeleccionar,
}: AeropuertoSelectorProps) {
  const [criterio, setCriterio] = useState<'localidadNombre' | 'codigo'>(
    'localidadNombre'
  );
  const [aeropuertos, setAeropuertos] = useState<Aeropuerto[] | null>(null);
  const [cargando, setCargando] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleBuscar = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const datos = new FormData(event.currentTarget);
    const valor = String(datos.get('valorBusqueda') ?? '').trim();

    if (!valor) {
      setError('Ingresá un valor para buscar.');
      return;
    }

    setCargando(true);
    setError(null);

    try {
      const res = await getAllAeropuertos({ [criterio]: valor });
      const lista = Array.isArray(res.data)
        ? res.data
        : (res.data?.aeropuertos ?? []);
      setAeropuertos(lista);
    } catch (e) {
      setAeropuertos([]);
      setError(e instanceof Error ? e.message : 'Error al buscar aeropuertos.');
    } finally {
      setCargando(false);
    }
  };

  return (
    <section className={style.contenedor}>
      <h3 className={style.titulo}>Aeropuerto de destino</h3>

      <form className={style.formulario} onSubmit={handleBuscar}>
        <div className={style.campos}>
          <SelectField
            label="Buscar por"
            name="criterio"
            value={criterio}
            onChange={(e) =>
              setCriterio(e.target.value as 'localidadNombre' | 'codigo')
            }
          >
            <option value="localidadNombre">Localidad</option>
            <option value="codigo">Código</option>
          </SelectField>

          <InputField
            label={
              criterio === 'localidadNombre'
                ? 'Nombre de la localidad'
                : 'Código'
            }
            name="valorBusqueda"
            placeholder={
              criterio === 'localidadNombre' ? 'Ej: Rosario' : 'Ej: 2000'
            }
          />
        </div>

        <Button type="submit" isLoading={cargando}>
          Buscar aeropuertos
        </Button>
      </form>

      {error && <p className={style.error}>{error}</p>}

      {aeropuertos !== null && !error && aeropuertos.length === 0 && (
        <p className={style.sinResultados}>
          No se encontraron aeropuertos para esa búsqueda.
        </p>
      )}

      {aeropuertos && aeropuertos.length > 0 && (
        <div className={style.listaResultados}>
          {aeropuertos.map((aero) => (
            <AeropuertoCard
              key={aero.id}
              aeropuerto={aero}
              seleccionado={aeropuertoSeleccionado?.id === aero.id}
              onSelect={onSeleccionar}
            />
          ))}
        </div>
      )}
    </section>
  );
}
