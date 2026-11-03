import { useState } from 'react';
import type { ChangeEvent, SubmitEvent } from 'react';
import InputField from '../ui/InputField';
import Button from '../ui/Button';
import type { Localidad, CreateLocalidad } from '../../models/localidad.model';
import style from './LocalidadForm.module.css';

interface LocalidadFormProps {
  valoresIniciales?: Localidad; // solo al editar
  textoBoton: string;
  onSubmit: (datos: CreateLocalidad) => Promise<void>;
}

export default function LocalidadForm({
  valoresIniciales,
  textoBoton,
  onSubmit,
}: LocalidadFormProps) {
  const [datos, setDatos] = useState({
    nombre: valoresIniciales?.nombre ?? '',
    provincia: valoresIniciales?.provincia ?? '',
    codigoPostal: valoresIniciales?.codigoPostal?.toString() ?? '',
  });

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setDatos((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await onSubmit({
        nombre: datos.nombre,
        pais: 'Argentina',
        provincia: datos.provincia,
        codigoPostal: Number(datos.codigoPostal),
      });
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Error al guardar la localidad'
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form className={style.formulario} onSubmit={handleSubmit}>
      <InputField label="País" name="pais" value="Argentina" disabled />

      <InputField
        label="Provincia"
        name="provincia"
        placeholder="Ej: Santa Fe"
        value={datos.provincia}
        onChange={handleChange}
        required
      />

      <InputField
        label="Nombre de la localidad"
        name="nombre"
        placeholder="Ej: Rosario"
        value={datos.nombre}
        onChange={handleChange}
        required
      />

      <InputField
        label="Código postal"
        type="number"
        name="codigoPostal"
        placeholder="Ingresá el código postal. Ej: 2000"
        min="1"
        value={datos.codigoPostal}
        onChange={handleChange}
        required
      />

      {error && <p className={style.error}>{error}</p>}

      <Button type="submit" variant="primary" disabled={isLoading}>
        {isLoading ? 'Guardando...' : textoBoton}
      </Button>
    </form>
  );
}
