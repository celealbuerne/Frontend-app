import { Link, useNavigate } from 'react-router-dom';
import { createPublicacion } from '../../services/publicacion.service';
import PublicacionForm from '../../components/Publicaciones/PublicacionForm';
import style from './CrearPublicacion.module.css';

export default function CrearPublicacion() {
  const navigate = useNavigate();

  const crearForm = async (datos: FormData) => {
    await createPublicacion(datos);
    navigate('/proveedor');
  };

  return (
    <main className={style.contenedor}>
      <div className={style.encabezado}>
        <div className={style.textos}>
          <h1 className={style.titulo}>Nueva publicación</h1>
          <p className={style.subtitulo}>
            Elegí una de tus aeronaves e ingresá los datos necesarios para que
            los clientes puedan reservarla. Cada aeronave solo puede tener una
            publicación.
          </p>
        </div>
        <Link to="/proveedor" className={style.botonVolver}>
          ← Volver a mis publicaciones
        </Link>
      </div>

      <PublicacionForm textoBoton="Publicar" onSubmit={crearForm} />
    </main>
  );
}
