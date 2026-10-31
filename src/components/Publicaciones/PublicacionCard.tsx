import { useNavigate } from 'react-router-dom';
import style from './PublicacionCard.module.css';
import type { Publicacion } from '../../models/publicacion.model';

const BASE_URL = 'http://localhost:3000';

export default function PublicacionCard({
  publicacion,
}: {
  publicacion: Publicacion;
}) {
  const navigate = useNavigate();
  const { imagen, descripcion, precioPorDia, aeronave } = publicacion;
  const { modelo, capacidad, ultimoAeropuerto } = aeronave;

  const src = `${BASE_URL}/${imagen.replace(/^\/+/, '')}`;

  return (
    <article className={style.publi}>
      <img src={src} alt={`Aeronave ${modelo}`} />

      <div className={style.modeloPubli}>
        <h3>{modelo}</h3>
      </div>

      <div className={style.especificacionesPubli}>
        <p>{ultimoAeropuerto.nombre}</p>
        <p className={style.descripcionPubli} title={descripcion}>
          {descripcion}
        </p>
        <p>Hasta {capacidad} pasajeros</p>
      </div>

      <div className={style.precioPubli}>
        <p>{precioPorDia} USD/km</p>
      </div>

      <button
        type="button"
        onClick={() => navigate(`/publicaciones/${publicacion.id}`)}
      >
        Ver Más
      </button>
    </article>
  );
}
