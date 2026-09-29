import style from './PublicacionCard.module.css';

export interface publicacionData {
  imagen: string;
  modelo: string;
  origen: string;
  descripcion: string;
  capacidad: number;
  precio: number;
}

export default function PublicacionCard({
  imagen,
  modelo,
  origen,
  descripcion,
  capacidad,
  precio,
}: publicacionData) {
  return (
    <article className={style.publi}>
      <img src={imagen} alt="imagenPublicacion" />

      <div className={style.modeloPubli}>
        <h3>{modelo}</h3>
      </div>

      <div className={style.especificacionesPubli}>
        <p>{origen}</p>
        <p>{descripcion}</p>
        <p>Hasta {capacidad} pasajeros</p>
      </div>

      <div className={style.precioPubli}>
        <p>{precio} USD/km</p>
      </div>

      <button type="button">Ver Más</button>
    </article>
  );
}
