import type { Aeronave } from '../../models/aeronave.model.ts';
import { formatearFecha } from '../../utils/date.utils.ts';
import style from './AeronaveFlotaCard.module.css';

type AeronaveCardProps = {
  aeronave: Aeronave;
};

export default function AeronaveCard({ aeronave }: AeronaveCardProps) {
  return (
    <article className={style.tarjeta}>
      <div className={style.encabezado}>
        <h2 className={style.modelo}>{aeronave.modelo}</h2>
        <span className={style.fabricante}>{aeronave.fabricante}</span>
      </div>

      <p className={style.descripcion}>{aeronave.descripcion}</p>

      <dl className={style.datos}>
        <div className={style.dato}>
          <dt>Capacidad</dt>
          <dd>{aeronave.capacidad} pasajeros</dd>
        </div>
        <div className={style.dato}>
          <dt>Autonomía</dt>
          <dd>{aeronave.autonomia} km</dd>
        </div>
        <div className={style.dato}>
          <dt>Velocidad máx.</dt>
          <dd>{aeronave.velocidadMaxima} km/h</dd>
        </div>
        <div className={style.dato}>
          <dt>Antigüedad</dt>
          <dd>{formatearFecha(aeronave.antiguedad)}</dd>
        </div>
      </dl>
    </article>
  );
}