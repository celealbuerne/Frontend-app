import { Link, useNavigate } from 'react-router-dom';
import { createPublicacion } from '../../services/publicacion.service';
import PublicacionForm from '../../components/Publicaciones/PublicacionForm';
import style from './CrearPublicacion.module.css';

export default function CrearPublicacion() {
  const navigate = useNavigate();

  const crearForm = async (datos: FormData) =>{
    const response= await createPublicacion(datos);
    if (!response.ok){
      const body = await response.json().catch(() => null);
      throw new Error(body?.mensaje ?? 'No se pudo crear la publicación');
    }
    navigate('/proveedor')
  }

  return (
    <main className={style.contenedor}>
      <div className={style.encabezado}>
        <h1 className={style.titulo}>Nueva publicación</h1>
        <Link to="/proveedor" className={style.botonVolver}>
          ← Volver a mis publicaciones
        </Link>
      </div>

      <PublicacionForm textoBoton='Publicar' onSubmit={crearForm}/>
    </main>
  );
}