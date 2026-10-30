import style from './ReservaCard.module.css';
import type { ReservaDetalle } from '../../models/reserva.model';

interface ReservaCardProps {
  reserva: ReservaDetalle;
  esProveedor: boolean;
}

const formatearDia = (fecha: string) =>
  new Date(fecha).toLocaleDateString('es-AR');

export default function ReservaCard({
  reserva,
  esProveedor,
}: ReservaCardProps) {
  const { origen, destino, cliente, publicacion, fechaInicio, fechaFin } =
    reserva;

  const contraparte = esProveedor ? cliente : publicacion.proveedor;

  return (
    <article className={style.reserva}>
      <div className={style.encabezado}>
        <h3>{publicacion.aeronave.modelo}</h3>
        <span className={style.estado}>{reserva.estado}</span>
      </div>

      <dl className={style.detalle}>
        <div className={style.fila}>
          <dt>Origen</dt>
          <dd>{origen.nombre}</dd>
        </div>
        <div className={style.fila}>
          <dt>Destino</dt>
          <dd>{destino.nombre}</dd>
        </div>
        <div className={style.fila}>
          <dt>Desde</dt>
          <dd>{formatearDia(fechaInicio)}</dd>
        </div>
        <div className={style.fila}>
          <dt>Hasta</dt>
          <dd>{formatearDia(fechaFin)}</dd>
        </div>
        <div className={style.fila}>
          <dt>{esProveedor ? 'Cliente' : 'Proveedor'}</dt>
          <dd>{contraparte.nombre}</dd>
        </div>
      </dl>

      <div className={style.total}>
        <span>Monto total</span>
        <strong>USD {reserva.montoTotal}</strong>
      </div>
    </article>
  );
}
