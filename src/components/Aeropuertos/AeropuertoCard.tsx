import type { Aeropuerto } from '../../models/aeropuerto.model';
import style from './AeropuertoCard.module.css';

interface AeropuertoCardProps {
  aeropuerto: Aeropuerto;
  seleccionado?: boolean;
  onSelect?: (aeropuerto: Aeropuerto) => void;
}

export default function AeropuertoCard({
  aeropuerto,
  seleccionado = false,
  onSelect,
}: AeropuertoCardProps) {
  const clases = [
    style.card,
    onSelect ? style.seleccionable : '',
    seleccionado ? style.seleccionada : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <article
      className={clases}
      onClick={onSelect ? () => onSelect(aeropuerto) : undefined}
    >
      <div className={style.info}>
        <span className={style.nombre}>{aeropuerto.nombre}</span>
      </div>
      <span className={style.codigo}>{aeropuerto.codigo}</span>
    </article>
  );
}
