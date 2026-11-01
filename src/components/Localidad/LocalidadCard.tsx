import type { Localidad } from '../../models/localidad.model';
import style from './LocalidadCard.module.css';

interface LocalidadCardProps {
  localidad: Localidad;
}

export default function LocalidadCard({ localidad }: LocalidadCardProps) {
  return (
    <article className={style.card}>
      <h2 className={style.nombre}>{localidad.nombre}</h2>
      <p className={style.detalle}>
        {localidad.provincia}, {localidad.pais}
      </p>
      <p className={style.detalle}>Código postal: {localidad.codigoPostal}</p>
    </article>
  );
}