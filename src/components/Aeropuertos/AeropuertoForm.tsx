import { useEffect, useState, type SubmitEvent } from 'react';
import { findAll } from '../../services/localidad.service';
import type { Localidad } from '../../models/localidad.model';
import type {
  Aeropuerto,
  CreateAeropuerto,
} from '../../models/aeropuerto.model';
import InputField from '../ui/InputField';
import SelectField from '../ui/SelectField';
import Button from '../ui/Button';
import style from './AeropuertoForm.module.css';

interface AeropuertoFormProps {
  valoresIniciales?: Aeropuerto;
  textoBoton: string;
  onSubmit: (datos: CreateAeropuerto) => Promise<void>;
}

export default function AeropuertoForm({
  valoresIniciales,
  textoBoton,
  onSubmit,
}: AeropuertoFormProps) {
  const [localidades, setLocalidades] = useState<Localidad[]>([]);
  const [errores, setErrores] = useState<string[]>([]);
  const [errorServidor, setErrorServidor] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    const cargarLocalidades = async () => {
      try {
        const respuesta = await findAll();
        setLocalidades(respuesta.data);
      } catch (e) {
        setErrorServidor(
          e instanceof Error ? e.message : 'Error al cargar las localidades.'
        );
      }
    };
    cargarLocalidades();
  }, []);

  const submitForm = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const datos = new FormData(event.currentTarget);

    const nombre = String(datos.get('nombre') ?? '').trim();
    const codigo = String(datos.get('codigo') ?? '').trim();
    const localidadID = Number(datos.get('localidadID'));

    const nuevosErrores: string[] = [];
    if (!nombre) nuevosErrores.push('El nombre es obligatorio.');
    if (!codigo) nuevosErrores.push('El código es obligatorio.');
    if (!localidadID || Number.isNaN(localidadID)) {
      nuevosErrores.push('Debés seleccionar una localidad.');
    }

    setErrores(nuevosErrores);
    setErrorServidor(null);
    if (nuevosErrores.length > 0) return;

    setEnviando(true);
    try {
      await onSubmit({ nombre, codigo, localidadID });
    } catch (e) {
      setErrorServidor(
        e instanceof Error ? e.message : 'Error al guardar el aeropuerto.'
      );
    } finally {
      setEnviando(false);
    }
  };

  return (
    <form className={style.formulario} onSubmit={submitForm}>
      <InputField
        label="Nombre"
        type="text"
        name="nombre"
        placeholder="Ej: Aeropuerto Internacional Rosario"
        required
        defaultValue={valoresIniciales?.nombre}
      />

      <InputField
        label="Código"
        type="text"
        name="codigo"
        placeholder="Ej: ROS"
        required
        defaultValue={valoresIniciales?.codigo}
      />

      <SelectField
        key={localidades.length}
        label="Localidad"
        name="localidadID"
        required
        defaultValue={valoresIniciales?.localidadID.id ?? ''}
      >
        <option value="" disabled>
          Seleccioná una localidad
        </option>
        {localidades.map((localidad) => (
          <option key={localidad.id} value={localidad.id}>
            {localidad.nombre} - {localidad.provincia}, {localidad.pais}
          </option>
        ))}
      </SelectField>

      {errores.length > 0 && (
        <ul className={style.errores}>
          {errores.map((mensaje) => (
            <li key={mensaje}>{mensaje}</li>
          ))}
        </ul>
      )}
      {errorServidor && <p className={style.errorServidor}>{errorServidor}</p>}

      <Button type="submit" variant="primary" disabled={enviando}>
        {enviando ? 'Guardando...' : textoBoton}
      </Button>
    </form>
  );
}
