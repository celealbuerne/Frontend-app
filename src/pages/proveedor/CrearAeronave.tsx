import { useEffect, useState } from 'react';
import type { ChangeEvent, SubmitEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import InputField from '../../components/ui/InputField.tsx';
import Button from '../../components/ui/Button.tsx';
import { createAeronave } from '../../services/aeronave.service.ts';
import { getAllAeropuertos } from '../../services/aeropuerto.service.ts';
import type { Aeropuerto } from '../../models/aeropuerto.model.ts';
import style from './CrearAeronave.module.css';

const datosIniciales = {
  modelo: '',
  fabricante: '',
  descripcion: '',
  capacidad: '',
  autonomia: '',
  velocidadMaxima: '',
  antiguedad: '',
  ultimoAeropuerto: '',
};

export default function CrearAeronave() {
  const navigate = useNavigate();
  const [datos, setDatos] = useState(datosIniciales);
  const [aeropuertos, setAeropuertos] = useState<Aeropuerto[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let cancelado = false;

    async function cargarAeropuertos() {
      try {
        const response = await getAllAeropuertos();
        if (!cancelado) setAeropuertos(response.data);
      } catch (err) {
        if (!cancelado) {
          setError(
            err instanceof Error
              ? err.message
              : 'Error al cargar los aeropuertos'
          );
        }
      }
    }

    cargarAeropuertos();

    return () => {
      cancelado = true;
    };
  }, []);

  // [name] como clave permite usar un solo handler para todos los campos
  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setDatos((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await createAeronave({
        ...datos,
        ultimoAeropuerto: Number(datos.ultimoAeropuerto),
        capacidad: Number(datos.capacidad),
        autonomia: Number(datos.autonomia),
        velocidadMaxima: Number(datos.velocidadMaxima),
      });
      navigate('/proveedor/aeronaves');
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Error al crear la aeronave'
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className={style.pagina}>
      <div className={style.encabezado}>
        <div className={style.textos}>
          <h1 className={style.titulo}>Agregar aeronave</h1>
          <p className={style.subtitulo}>
            Completá los datos de tu aeronave para sumarla a tu flota. Después
            vas a poder usarla para crear una publicación y recibir reservas.
          </p>
        </div>
        <Link to="/proveedor/aeronaves" className={style.botonVolver}>
          ← Volver a Mi Flota
        </Link>
      </div>

      <form className={style.formulario} onSubmit={handleSubmit}>

        <InputField
          label="Modelo"
          name="modelo"
          value={datos.modelo}
          onChange={handleChange}
          required
        />
        <InputField
          label="Fabricante"
          name="fabricante"
          value={datos.fabricante}
          onChange={handleChange}
          required
        />

        <label className={style.campo}>
          Descripción (opcional)
          <textarea
            className={style.textarea}
            name="descripcion"
            value={datos.descripcion}
            onChange={handleChange}
            rows={3}
            maxLength={200}
          />
          <small className={style.contador}>
            {datos.descripcion.length}/200
          </small>
        </label>

        <div className={style.fila}>
          <InputField
            label="Capacidad (pasajeros)"
            name="capacidad"
            type="number"
            min={1}
            value={datos.capacidad}
            onChange={handleChange}
            required
          />
          <InputField
            label="Autonomía (km)"
            name="autonomia"
            type="number"
            min={1}
            value={datos.autonomia}
            onChange={handleChange}
            required
          />
          <InputField
            label="Velocidad máx. (km/h)"
            name="velocidadMaxima"
            type="number"
            min={1}
            value={datos.velocidadMaxima}
            onChange={handleChange}
            required
          />
          <InputField
            label="Antigüedad"
            name="antiguedad"
            type="date"
            value={datos.antiguedad}
            max={new Date().toISOString().split('T')[0]}
            onChange={handleChange}
            required
          />
        </div>

        <label className={style.campo}>
          Último aeropuerto
          <select
            className={style.select}
            name="ultimoAeropuerto"
            value={datos.ultimoAeropuerto}
            onChange={handleChange}
            required
          >
            <option value="">Seleccioná un aeropuerto</option>
            {aeropuertos.map((aeropuerto) => (
              <option key={aeropuerto.id} value={aeropuerto.id}>
                {aeropuerto.nombre}
              </option>
            ))}
          </select>
        </label>

        {error && <p className={style.error}>{error}</p>}

        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Guardando...' : 'Guardar aeronave'}
        </Button>
      </form>
    </main>
  );
}
