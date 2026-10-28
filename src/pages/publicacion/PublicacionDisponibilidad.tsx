import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CalendarioDisponibilidad, {
  type RangoFechas,
} from '../../components/Publicaciones/CalendarioDisponibilidad';
import PanelRangos from '../../components/Publicaciones/PanelRangos';
import { usePublicacion } from '../../hooks/usePublicacion';
import { useDisponibilidad } from '../../hooks/useDisponibilidad';
import { formatearFecha } from '../../utils/date.utils';
import style from './PublicacionDisponibilidad.module.css';

export default function PublicacionDisponibilidad() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [rangoSeleccionado, setRangoSeleccionado] =
    useState<RangoFechas | null>(null);

  const {
    publicacion,
    cargando: cargandoPub,
    error: errorPub,
  } = usePublicacion(id);

  const {
    rangosOcupados,
    cargando: cargandoDisp,
    error: errorDisp,
  } = useDisponibilidad(id);

  const cargando = cargandoPub || cargandoDisp;
  const error = errorPub || errorDisp;

  const handleContinuarReserva = () => {
    console.log('en construccion')
    /*
    if (!rangoSeleccionado || !id) return;
    // la pag va a tener que recibir id, fechaInicio y fechaFin (searchParams)
    navigate(
      `/publicaciones/${id}/reservar?inicio=${rangoSeleccionado.inicio}&fin=${rangoSeleccionado.fin}`
    );*/
  };

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
            <CalendarioDisponibilidad
              rangosOcupados={rangosOcupados}
              rangoSeleccionado={rangoSeleccionado}
              onSeleccionarRango={setRangoSeleccionado}
            />

            <PanelRangos rangos={rangosOcupados} variante="ocupado" />
          </div>
        </section>
      </main>

      <aside className={style.barraInferior}>
        <div className={style.barraContenido}>
          <div className={style.grupoPeriodo}>
            <span className={style.etiquetaPeriodo}>Período seleccionado</span>
            <div className={style.valorPeriodo}>
              {rangoSeleccionado
                ? `${formatearFecha(rangoSeleccionado.inicio)} al ${formatearFecha(rangoSeleccionado.fin)}`
                : 'Seleccioná un rango en el calendario'}
            </div>
          </div>

          <button
            type="button"
            className={style.botonReserva}
            disabled={!rangoSeleccionado}
            onClick={handleContinuarReserva}
          >
            Continuar reserva
          </button>
        </div>
      </aside>
    </div>
  );
}
