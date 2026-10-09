import style from './PublicacionCard.module.css';
import type { Publicacion } from '../../models/publicacion.model';



const BASE_URL = 'http://localhost:3000';

export default function PublicacionCard({ publicacion }: {publicacion: Publicacion}) {
  const { imagen, descripcion, precioPorKM, laAeronave } = publicacion;
  const {modelo, capacidad, elAeropuerto} = laAeronave;

  const src = `${BASE_URL}/${imagen.replace(/^\/+/, '')}`;

  return (
    <article className={style.publi}>
      <img
        src={src} alt={`Aeronave ${modelo}`}
      />

      <div className={style.modeloPubli}>
        <h3>{modelo}</h3>
      </div>

      <div className={style.especificacionesPubli}>
        <p>{elAeropuerto.nombre}</p>
        <p>{descripcion}</p>
        <p>Hasta {capacidad} pasajeros</p>
      </div>

      <div className={style.precioPubli}>
        <p>{precioPorKM} USD/km</p>
      </div>

      <button type="button">Ver Más</button>
    </article>
  );
}
