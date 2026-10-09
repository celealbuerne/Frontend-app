import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createPublicacion } from '../../services/publicacion.service';
import { useAuth } from '../../contexts/auth.context';
import { getAeronavesByProveedor } from '../../services/aeronave.service';
import type { Aeronave } from '../../models/aeronave.model';
import style from './CrearPublicacion.module.css';
import InputField from '../../components/ui/InputField';
import SelectField from '../../components/ui/SelectField';
import Button from '../../components/ui/Button';

export default function CrearPublicacion() {
  const navigate = useNavigate();
  const {currentUser} = useAuth()
  
  const [aeronaves, setAeronaves] = useState<Aeronave[]>([]);
  const [errores, setErrores] = useState<string[]>([]); //errores de validacion del formulario
  const [errorServidor, setErrorServidor] = useState<string | null>(null);
  const [vistaPrevia, setVistaPrevia] = useState<string | null>(null); //guarda la URL temporal para mostrar la imagen antes de enviarla

  const hoy = new Date().toLocaleDateString('en-CA'); // AAAA-MM-DD

  useEffect(() => {
  const cargarAeronaves = async () => {
    if (!currentUser) return;
    try {

      const respuesta = await getAeronavesByProveedor(currentUser.id);
      setAeronaves(respuesta.data);

    } catch (e) {
      setErrorServidor(
        e instanceof Error ? e.message: 'Error al cargar las aeronaves.');
    } 
  };
  cargarAeronaves();
}, [currentUser]);

  // libera la URL temporal de la vista previa al cambiarla o al salir
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
      nuevosErrores.push('La fecha de fin tiene que ser posterior a la de inicio.');
    }

    setErrores(nuevosErrores);
    setErrorServidor(null);
    if (nuevosErrores.length > 0) return;

    try {
      await createPublicacion(datos);
      navigate('/proveedor');
    } catch (e) {
      setErrorServidor(e instanceof Error ? e.message : 'Error al crear la publicación.');
    } 
  };

  return (
    <main className={style.contenedor}>
      <div className={style.encabezado}>
        <h1 className={style.titulo}>Nueva publicación</h1>
        <Link to="/proveedor" className={style.botonVolver}>
          ← Volver a mis publicaciones
        </Link>
      </div>

      <form className={style.formulario} onSubmit={submitForm}>

        <SelectField label="Aeronave" name="aeronaveID" required>
          <option value="">Seleccioná una aeronave</option>
          {aeronaves.map((aeronave) => (
            <option key={aeronave.id} value={aeronave.id}>
              {aeronave.modelo} - {aeronave.elAeropuerto.nombre}
            </option>
          ))}
        </SelectField>

        <label className={style.campo}>
          Descripción
          <textarea name="descripcion" rows={4} maxLength={200} required />
        </label>

        <InputField label="Precio por km (USD)" type="number" name="precioPorKM" min="1" step="any" required />

        <InputField label="Disponible desde" type="date" name="fechaInicioDisponibilidad" min={hoy} required />

        <InputField label= "Disponible hasta" type="date" name="fechaFinDisponibilidad" min={hoy} required />

        <InputField
          label="Imagen"
          type="file"
          name="imagen"
          accept="image/jpeg,image/png,image/webp"
          onChange={elegirImagen}
          required
        />

        {vistaPrevia && (
          <img src={vistaPrevia} alt="Vista previa" className={style.vistaPrevia} />
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
          Publicar
        </Button>
      </form>
    </main>
  );
}