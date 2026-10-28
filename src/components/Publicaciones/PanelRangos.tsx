import { useState } from 'react';
import type { RangoFechas } from './CalendarioDisponibilidad';
import { formatearFecha } from '../../utils/date.utils';
import style from './PanelRangos.module.css';

export type VarianteRango = 'ocupado' | 'solicitado';

interface PanelRangosProps {
  rangos: RangoFechas[];
  variante?: VarianteRango;
  titulo?: string;
}

export default function PanelRangos({
  rangos,
  variante = 'ocupado',
  titulo,
}: PanelRangosProps) {
  const [mostrar, setMostrar] = useState<boolean>(true);

  const esSolicitado = variante === 'solicitado';
  const tituloFinal =
    titulo ?? (esSolicitado ? 'Período solicitado' : 'Períodos ocupados');
  const textoBadge = esSolicitado ? 'Solicitado' : 'Ocupado';
  const textoVacio = esSolicitado
    ? 'No se registra un período solicitado.'
    : 'No se registran períodos ocupados.';

  return (
    <aside className={style.panel}>
      <div className={style.cabecera}>
        <h3 className={style.titulo}>{tituloFinal}</h3>
        <button
          type="button"
          className={style.botonToggle}
          onClick={() => setMostrar((prev) => !prev)}
        >
          {mostrar ? 'Ocultar' : 'Mostrar'}
        </button>
      </div>

      {mostrar &&
        (rangos.length === 0 ? (
          <div className={style.vacio}>
            <p>{textoVacio}</p>
          </div>
        ) : (
          <ul className={style.lista}>
            {rangos.map((rango, index) => (
              <li
                key={`${rango.inicio}-${rango.fin}-${index}`}
                className={`${style.item} ${esSolicitado ? style.itemSolicitado : style.itemOcupado}`}
              >
                <span
                  className={`${style.badge} ${esSolicitado ? style.badgeSolicitado : style.badgeOcupado}`}
                >
                  {textoBadge}
                </span>
                <div className={style.fechas}>
                  <span>
                    <strong>Desde:</strong> {formatearFecha(rango.inicio)}
                  </span>
                  <span>
                    <strong>Hasta:</strong> {formatearFecha(rango.fin)}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        ))}
    </aside>
  );
}
