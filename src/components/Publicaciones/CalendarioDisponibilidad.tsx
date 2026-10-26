import { useMemo, useState } from 'react';
import { DayPicker, type DateRange } from 'react-day-picker';
import { es } from 'react-day-picker/locale';
import 'react-day-picker/style.css';
import style from './CalendarioDisponibilidad.module.css';

export interface RangoFechas {
  inicio: string;
  fin: string;
}

interface CalendarioDisponibilidadProps {
  rangosOcupados: RangoFechas[];
  rangoSeleccionado?: RangoFechas | null;
  onSeleccionarRango?: (rango: RangoFechas | null) => void;
}

function parseDateKey(dateKey: string): Date {
  const [y, m, d] = dateKey.split('-').map(Number);
  return new Date(y, m - 1, d);
}

function formatDateKey(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export default function CalendarioDisponibilidad({
  rangosOcupados,
  rangoSeleccionado,
  onSeleccionarRango,
}: CalendarioDisponibilidadProps) {
  const hoy = useMemo(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate());
  }, []);

  const [rangoInterno, setRangoInterno] = useState<DateRange | undefined>(() =>
    rangoSeleccionado
      ? {
          from: parseDateKey(rangoSeleccionado.inicio),
          to: parseDateKey(rangoSeleccionado.fin),
        }
      : undefined
  );

  const intervalosOcupados = useMemo(
    () =>
      rangosOcupados.map((r) => ({
        from: parseDateKey(r.inicio),
        to: parseDateKey(r.fin),
      })),
    [rangosOcupados]
  );

  const handleSelect = (range: DateRange | undefined) => {
    setRangoInterno(range);

    if (range?.from && range?.to) {
      onSeleccionarRango?.({
        inicio: formatDateKey(range.from),
        fin: formatDateKey(range.to),
      });
    } else {
      onSeleccionarRango?.(null);
    }
  };

  const limpiarSeleccion = () => {
    setRangoInterno(undefined);
    onSeleccionarRango?.(null);
  };

  return (
    <div className={style.panelCalendario}>
      <div className={style.barraInstruccion}>
        <span className={style.textoInstruccion}>
          {!rangoInterno?.from
            ? 'Ingresar los días de inicio y fin en el calendario'
            : !rangoInterno?.to
              ? `Inicio: ${formatDateKey(rangoInterno.from)} — Seleccionar fecha de fin`
              : `Desde: ${formatDateKey(rangoInterno.from)} || Hasta: ${formatDateKey(rangoInterno.to)}`}
        </span>
        {rangoInterno?.from && (
          <button
            type="button"
            className={style.botonLimpiar}
            onClick={limpiarSeleccion}
          >
            Limpiar
          </button>
        )}
      </div>

      <div className={style.contenedorDayPicker}>
        <DayPicker
          mode="range"
          locale={es}
          selected={rangoInterno}
          onSelect={handleSelect}
          disabled={[{ before: hoy }, ...intervalosOcupados]}
          excludeDisabled
          resetOnSelect
          modifiers={{
            /* esto es para replicar los estilos de mi calendario artesanal */
            ocupado: intervalosOcupados,
            pasado: { before: hoy },
          }}
          modifiersClassNames={{
            ocupado: style.diaOcupado,
            pasado: style.diaPasado,
          }}
          className={style.calendarioRdp}
        />
      </div>

      <div className={style.leyenda}>
        <div className={style.itemLeyenda}>
          <span
            className={`${style.indicadorColor} ${style.indicadorDisponible}`}
          />
          <span>Disponible</span>
        </div>
        <div className={style.itemLeyenda}>
          <span
            className={`${style.indicadorColor} ${style.indicadorSeleccionado}`}
          />
          <span>Seleccionado</span>
        </div>
        <div className={style.itemLeyenda}>
          <span
            className={`${style.indicadorColor} ${style.indicadorOcupado}`}
          />
          <span>No Disponible</span>
        </div>
        <div className={style.itemLeyenda}>
          <span
            className={`${style.indicadorColor} ${style.indicadorPasado}`}
          />
          <span>Fecha pasada</span>
        </div>
      </div>
    </div>
  );
}
