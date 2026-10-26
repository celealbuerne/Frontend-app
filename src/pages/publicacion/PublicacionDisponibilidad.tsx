import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CalendarioDisponibilidad from '../../components/Publicaciones/CalendarioDisponibilidad';
import {
  GetDisponibilidad,
  getOnePublicacion,
} from '../../services/publicacion.service';
import type {
  PeriodoOcupado,
  Publicacion,
} from '../../models/publicacion.model';
import style from './PublicacionDisponibilidad.module.css';

function toDateKey(input: string): string {
  const trimmed = input.trim();
  if (/^\d{4}-\d{2}-\d{2}/.test(trimmed)) {
    return trimmed.slice(0, 10);
  }
  const parsed = new Date(trimmed);
  if (Number.isNaN(parsed.getTime())) {
    return '';
  }
  const y = parsed.getFullYear();
  const m = String(parsed.getMonth() + 1).padStart(2, '0');
  const d = String(parsed.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function formatearFechaHumana(dateKey: string): string {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateKey)) return dateKey;
  const [y, m, d] = dateKey.split('-').map(Number);
  return `${String(d).padStart(2, '0')}/${String(m).padStart(2, '0')}/${y}`;
}

export default function PublicacionDisponibilidad() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [publicacion, setPublicacion] = useState<Publicacion | null>(null);
  const [periodosOcupados, setPeriodosOcupados] = useState<PeriodoOcupado[]>(
    []
  );
  const [cargando, setCargando] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelado = false;

    async function cargarAgenda() {
      if (!id || Number.isNaN(Number(id))) {
        setError('El identificador de publicación no es válido.');
        setCargando(false);
        return;
      }

      setCargando(true);
      setError(null);

      try {
        const pId = Number(id);
        const [dispRes, pubRes] = await Promise.all([
          GetDisponibilidad(pId),
          getOnePublicacion(pId), //es por si se accede directo mediante URL
        ]);

        if (!cancelado) {
          const rawData = dispRes.data as unknown;
          const lista: PeriodoOcupado[] = Array.isArray(rawData)
            ? rawData
            : rawData && typeof rawData === 'object'
              ? [rawData as PeriodoOcupado]
              : [];
          setPeriodosOcupados(lista);
          if (pubRes?.data) {
            setPublicacion(pubRes.data);
          }
        }
      } catch (e) {
        if (!cancelado) {
          setError(
            e instanceof Error
              ? e.message
              : 'Error al obtener la disponibilidad de la aeronave'
          );
        }
      } finally {
        if (!cancelado) {
          setCargando(false);
        }
      }
    }

    cargarAgenda();

    return () => {
      cancelado = true;
    };
  }, [id]);

  const rangosNormalizados = useMemo(() => {
    return periodosOcupados
      .map((p) => {
        const inicio = toDateKey(p.fechaInicio);
        const fin = toDateKey(p.fechaFin);
        if (!inicio || !fin) return null;
        return inicio <= fin ? { inicio, fin } : { inicio: fin, fin: inicio };
      })
      .filter((r): r is { inicio: string; fin: string } => r !== null)
      .sort((a, b) => a.inicio.localeCompare(b.inicio));
  }, [periodosOcupados]);

  if (cargando) {
    return (
      <main className={style.contenedor}>
        <p className={style.mensajeEstado}>Cargando agenda...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className={style.contenedor}>
        <button
          type="button"
          className={style.botonVolver}
          onClick={() => navigate(`/publicaciones/${id}`)}
        >
          Volver a la publicación
        </button>
        <div className={style.mensajeError}>
          <p>{error}</p>
        </div>
      </main>
    );
  }

  return (
    <div className={style.paginaDisponibilidad}>
      <main className={style.contenedor}>
        <button
          type="button"
          className={style.botonVolver}
          onClick={() => navigate(`/publicaciones/${id}`)}
        >
          Volver a la publicación
        </button>

        <section className={style.seccionPrincipal}>
          <div className={style.cabecera}>
            <div>
              <span className={style.etiquetaSuperior}>
                Agenda y Disponibilidad
              </span>
              <h1 className={style.titulo}>
                {publicacion?.aeronave?.modelo
                  ? `${publicacion.aeronave.modelo}`
                  : 'Calendario de disponibilidad'}
              </h1>
              {publicacion?.aeronave?.fabricante && (
                <p className={style.subtitulo}>
                  Fabricante: {publicacion.aeronave.fabricante}
                </p>
              )}
            </div>

            {publicacion?.precioPorDia !== undefined && (
              <div className={style.tarjetaPrecio}>
                <span className={style.etiquetaPrecio}>Tarifa</span>
                <span className={style.valorPrecio}>
                  ${publicacion.precioPorDia}{' '}
                  <small className={style.unidadPrecio}>USD / día</small>
                </span>
              </div>
            )}
          </div>

          <div className={style.layoutContenido}>
            <CalendarioDisponibilidad rangosOcupados={rangosNormalizados} />

            {/* resumen de períodos ocupados */}
            <aside className={style.panelPeriodos}>
              <h3 className={style.tituloPanel}>Períodos ocupados</h3>
              {rangosNormalizados.length === 0 ? (
                <div className={style.sinOcupacion}>
                  <p>No se registran períodos ocupados.</p>
                </div>
              ) : (
                <ul className={style.listaPeriodos}>
                  {rangosNormalizados.map((rango, index) => (
                    <li
                      key={`${rango.inicio}-${rango.fin}-${index}`}
                      className={style.itemPeriodo}
                    >
                      <span className={style.badgeOcupado}>Ocupado</span>
                      <div className={style.fechasPeriodo}>
                        <span>
                          <strong>Desde:</strong>{' '}
                          {formatearFechaHumana(rango.inicio)}
                        </span>
                        <span>
                          <strong>Hasta:</strong>{' '}
                          {formatearFechaHumana(rango.fin)}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </aside>
          </div>
        </section>
      </main>
    </div>
  );
}
