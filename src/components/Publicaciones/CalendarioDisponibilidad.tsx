import { useMemo, useState } from 'react';
import style from './CalendarioDisponibilidad.module.css';

const NOMBRES_MESES = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
];

const DIAS_SEMANA = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

function formatDateKey(year: number, monthIndex: number, day: number): string {
  const m = String(monthIndex + 1).padStart(2, '0');
  const d = String(day).padStart(2, '0');
  return `${year}-${m}-${d}`;
}

export interface RangoFechas {
  inicio: string;
  fin: string;
}

interface CalendarioDisponibilidadProps {
  rangosOcupados: RangoFechas[];
}

export default function CalendarioDisponibilidad({
  rangosOcupados,
}: CalendarioDisponibilidadProps) {
  const hoy = useMemo(() => new Date(), []);
  const hoyKey = useMemo(
    () => formatDateKey(hoy.getFullYear(), hoy.getMonth(), hoy.getDate()),
    [hoy]
  );

  const [anioActual, setAnioActual] = useState<number>(() => hoy.getFullYear());
  const [mesActual, setMesActual] = useState<number>(() => hoy.getMonth());

  const celdasCalendario = useMemo(() => {
    const estaOcupado = (dateKey: string): boolean =>
      rangosOcupados.some(
        (rango) => dateKey >= rango.inicio && dateKey <= rango.fin
      );

    const primerDiaSemana = new Date(anioActual, mesActual, 1).getDay();
    // Ajusta para que lunes sea 0 y domingo 6
    const offsetLunes = (primerDiaSemana + 6) % 7;
    const totalDiasMes = new Date(anioActual, mesActual + 1, 0).getDate();

    const celdas: Array<{
      dia: number | null;
      dateKey: string | null;
      ocupado: boolean;
      esPasado: boolean;
      esHoy: boolean;
    }> = [];

    for (let i = 0; i < offsetLunes; i++) {
      celdas.push({
        dia: null,
        dateKey: null,
        ocupado: false,
        esPasado: false,
        esHoy: false,
      });
    }

    for (let dia = 1; dia <= totalDiasMes; dia++) {
      const dateKey = formatDateKey(anioActual, mesActual, dia);
      celdas.push({
        dia,
        dateKey,
        ocupado: estaOcupado(dateKey),
        esPasado: dateKey < hoyKey,
        esHoy: dateKey === hoyKey,
      });
    }

    return celdas;
  }, [anioActual, mesActual, rangosOcupados, hoyKey]);

  const irMesAnterior = () => {
    if (mesActual === 0) {
      setMesActual(11);
      setAnioActual((prev) => prev - 1);
    } else {
      setMesActual((prev) => prev - 1);
    }
  };

  const irMesSiguiente = () => {
    if (mesActual === 11) {
      setMesActual(0);
      setAnioActual((prev) => prev + 1);
    } else {
      setMesActual((prev) => prev + 1);
    }
  };

  const irMesHoy = () => {
    setAnioActual(hoy.getFullYear());
    setMesActual(hoy.getMonth());
  };

  return (
    <div className={style.panelCalendario}>
      <div className={style.controlesCalendario}>
        <button
          type="button"
          className={style.botonNavMes}
          onClick={irMesAnterior}
          aria-label="Mes anterior"
        >
          ‹ Anterior
        </button>

        <div className={style.tituloMesGrupo}>
          <h2 className={style.tituloMes}>
            {NOMBRES_MESES[mesActual]} {anioActual}
          </h2>
          <button type="button" className={style.botonHoy} onClick={irMesHoy}>
            Hoy
          </button>
        </div>

        <button
          type="button"
          className={style.botonNavMes}
          onClick={irMesSiguiente}
          aria-label="Mes siguiente"
        >
          Siguiente ›
        </button>
      </div>

      <div className={style.grillaSemana}>
        {DIAS_SEMANA.map((dia) => (
          <div key={dia} className={style.encabezadoDia}>
            {dia}
          </div>
        ))}
      </div>

      <div className={style.grillaDias}>
        {celdasCalendario.map((celda, idx) => {
          if (celda.dia === null) {
            return (
              <div
                key={`vacio-${idx}`}
                className={`${style.celdaDia} ${style.celdaVacia}`}
              />
            );
          }

          const clasesEstado = celda.ocupado
            ? style.celdaOcupada
            : celda.esPasado
              ? style.celdaPasada
              : style.celdaDisponible;

          return (
            <div
              key={celda.dateKey}
              className={`${style.celdaDia} ${clasesEstado} ${
                celda.esHoy ? style.celdaHoy : ''
              }`}
              title={
                celda.ocupado
                  ? 'No disponible'
                  : celda.esPasado
                    ? 'Fecha pasada'
                    : 'Disponible'
              }
            >
              <span className={style.numeroDia}>{celda.dia}</span>
              <span className={style.estadoTextoDia}>
                {celda.ocupado
                  ? 'Ocupado'
                  : celda.esPasado
                    ? 'Pasado'
                    : 'Libre'}
              </span>
            </div>
          );
        })}
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
