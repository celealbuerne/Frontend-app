import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/auth.context';
import { getAeronavesByProveedor } from '../../services/aeronave.service';
import type { Aeronave } from '../../models/aeronave.model';
import type { Publicacion } from '../../models/publicacion.model';
import InputField from '../ui/InputField';
import SelectField from '../ui/SelectField';
import Button from '../ui/Button';
import style from './PublicacionForm.module.css';

//revisar cuando se cree la parte de editar publicacion

interface PublicacionFormProps {
  valoresIniciales?: Publicacion; // solo al editar
  textoBoton: string;
  onSubmit: (datos: FormData) => Promise<void>;
}

export default function PublicacionForm({
  valoresIniciales,
  textoBoton,
  onSubmit,
}: PublicacionFormProps) {
  const { currentUser } = useAuth();
  const editando = valoresIniciales !== undefined;

  const [aeronaves, setAeronaves] = useState<Aeronave[]>([]);
  const [errores, setErrores] = useState<string[]>([]);
  const [errorServidor, setErrorServidor] = useState<string | null>(null);
  const [vistaPrevia, setVistaPrevia] = useState<string | null>(null); //guarda la URL temporal de la img elegida para mostrarla antes de enviarla al back

  const hoy = new Date().toLocaleDateString('en-CA');

  useEffect(() => {
    const cargarAeronaves = async () => {
      if (!currentUser) return;

      try {
        const respuesta = await getAeronavesByProveedor(currentUser.id);
        setAeronaves(respuesta.data);
      } catch (e) {
        setErrorServidor(
          e instanceof Error ? e.message : 'Error al cargar las aeronaves.'
        );
      }
    };
    cargarAeronaves();
  }, [currentUser]);

  const aFechaInput = (fecha?: Date | string) =>
    fecha ? new Date(fecha).toISOString().slice(0, 10) : undefined;

  useEffect(() => {
    return () => {
      if (vistaPrevia) URL.revokeObjectURL(vistaPrevia);
    };
  }, [vistaPrevia]);

  const elegirImagen = (event: React.ChangeEvent<HTMLInputElement>) => {
    const archivo = event.target.files?.[0];
    setVistaPrevia(archivo ? URL.createObjectURL(archivo) : null);
  };

  const submitForm = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const datos = new FormData(event.currentTarget);

    const inicio = String(datos.get('fechaInicioDisponibilidad'));
    const fin = String(datos.get('fechaFinDisponibilidad'));

    const nuevosErrores: string[] = [];
    if (fin <= inicio) {
      nuevosErrores.push(
        'La fecha de fin tiene que ser posterior a la de inicio.'
      );
    }

    setErrores(nuevosErrores);
    setErrorServidor(null);
    if (nuevosErrores.length > 0) return;

    try {
      await onSubmit(datos); // (crear o editar)
    } catch (e) {
      setErrorServidor(
        e instanceof Error ? e.message : 'Error al guardar la publicación.'
      );
    }
  };

  return (
    <form className={style.formulario} onSubmit={submitForm}>
      //para edicion hay que agregar que no se pueda modificar la aeronave
      <SelectField
        label="Aeronave"
        name="aeronaveID"
        required
        defaultValue={valoresIniciales?.laAeronave.id ?? ''}
      >
        <option value="">Seleccioná una aeronave</option>
        {aeronaves.map((aeronave) => (
          <option key={aeronave.id} value={aeronave.id}>
            {aeronave.modelo} - {aeronave.elAeropuerto.nombre}
          </option>
        ))}
      </SelectField>

      <label className={style.campo}>
        Descripción
        <textarea
          name="descripcion"
          rows={4}
          maxLength={200}
          required
          defaultValue={valoresIniciales?.descripcion}
        />
      </label>

      <InputField
        label="Precio por km (USD)"
        type="number"
        name="precioPorKM"
        min="1"
        step="any"
        required
        defaultValue={valoresIniciales?.precioPorKM}
      />

      <InputField
        label="Disponible desde"
        type="date"
        name="fechaInicioDisponibilidad"
        min={editando ? undefined : hoy}
        required
        defaultValue={aFechaInput(valoresIniciales?.fechaInicioDisponibilidad)}
      />

      <InputField
        label="Disponible hasta"
        type="date"
        name="fechaFinDisponibilidad"
        min={editando ? undefined : hoy}
        required
        defaultValue={aFechaInput(valoresIniciales?.fechaFinDisponibilidad)}
      />

      <InputField
        label="Imagen"
        type="file"
        name="imagen"
        accept="image/jpeg,image/png,image/webp"
        onChange={elegirImagen}
        required={!editando}
      />

      {vistaPrevia && (
        <img
          src={vistaPrevia}
          alt="Vista previa"
          className={style.vistaPrevia}
        />
      )}

      {errores.length > 0 && (
        <ul className={style.errores}>
          {errores.map((mensaje) => (
            <li key={mensaje}>{mensaje}</li>
          ))}
        </ul>
      )}
      {errorServidor && <p className={style.errorServidor}>{errorServidor}</p>}

      <Button type="submit" variant="primary">
        {textoBoton}
      </Button>
    </form>
  );
}
