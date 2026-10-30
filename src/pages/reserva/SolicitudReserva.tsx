import { useMemo, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { usePublicacion } from '../../hooks/usePublicacion';
import { useCrearReserva } from '../../hooks/useCrearReserva';
import { useAuth } from '../../contexts/auth.context';
import { calcularDias } from '../../utils/date.utils';
import type { Aeropuerto } from '../../models/aeropuerto.model';
import AeronaveCard from '../../components/Aeronaves/AeronaveCard';
import AeropuertoSelector from '../../components/Aeropuertos/AeropuertoSelector';
import AeropuertoCard from '../../components/Aeropuertos/AeropuertoCard';
import PanelRangos from '../../components/Publicaciones/PanelRangos';
import ResumenCostos from '../../components/Reservas/ResumenCostos';
import ReservaExitosa from '../../components/Reservas/ReservaExitosa';
import Button from '../../components/ui/Button';
import style from './SolicitudReserva.module.css';

export default function SolicitudReserva() {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { isLogged } = useAuth();

  const fechaInicio = searchParams.get('inicio') || '';
  const fechaFin = searchParams.get('fin') || '';

  const [aeropuertoDestino, setAeropuertoDestino] = useState<Aeropuerto | null>(
    null
  );

  const { publicacion, cargando, error: errorPublicacion } = usePublicacion(id);
  const { crear, enviando, error: errorReserva, exito } = useCrearReserva();

  const totalDias = useMemo(() => {
    return calcularDias(fechaInicio, fechaFin);
  }, [fechaInicio, fechaFin]);

  const handleConfirmarReserva = async () => {
    if (!isLogged) {
      navigate('/login');
      return;
    }

    if (!id || !fechaInicio || !fechaFin || !aeropuertoDestino) return;

    await crear({
      publicacion: Number(id),
      fechaInicio,
      fechaFin,
      destino: aeropuertoDestino.id,
    });
  };

  if (cargando) {
    return (
      <main className={style.contenedor}>
        <p className={style.mensajeEstado}>Cargando datos de la reserva...</p>
      </main>
    );
  }

  if (errorPublicacion || !publicacion) {
    return (
      <main className={style.contenedor}>
        <Button
          type="button"
          className={style.botonVolver}
          onClick={() => navigate(`/publicaciones/${id}/disponibilidad`)}
        >
          Volver a disponibilidad
        </Button>
        <div className={style.mensajeError}>
          <p>{errorPublicacion ?? 'No se encontró la publicación.'}</p>
        </div>
      </main>
    );
  }

  if (exito) {
    return <ReservaExitosa fechaInicio={fechaInicio} fechaFin={fechaFin} />;
  }

  return (
    <div className={style.paginaReserva}>
      <main className={style.contenedor}>
        <Button
          type="button"
          className={style.botonVolver}
          onClick={() => navigate(`/publicaciones/${id}/disponibilidad`)}
        >
          Volver a disponibilidad
        </Button>

        <section className={style.seccionPrincipal}>
          <div className={style.cabecera}>
            <span className={style.etiquetaSuperior}>Confirmación</span>
            <h1 className={style.titulo}>Solicitud de Reserva</h1>
            <p className={style.subtitulo}>
              Revisa los detalles y selecciona tu destino antes de enviar la
              solicitud.
            </p>
          </div>

          {errorReserva && (
            <div className={style.alertaError}>
              <span>{errorReserva}</span>
            </div>
          )}

          <div className={style.layoutGrid}>
            {/* a la izquierda va la aeronave el input de aeropuerto */}
            <div className={style.columnaIzquierda}>
              <AeronaveCard
                aeronave={publicacion.aeronave}
                imagen={publicacion.imagen}
              />

              <AeropuertoSelector
                aeropuertoSeleccionado={aeropuertoDestino}
                onSeleccionar={setAeropuertoDestino}
              />
            </div>

            {/* a la derecha va solo el resumen */}
            <div className={style.columnaDerecha}>
              <div className={style.tarjetaResumen}>
                <h2 className={style.tituloSeccion}>Resumen de la solicitud</h2>
                <PanelRangos
                  rangos={[{ inicio: fechaInicio, fin: fechaFin }]}
                  variante="solicitado"
                />
                {aeropuertoDestino ? (
                  <div className={style.bloqueDestino}>
                    <span className={style.etiquetaDestino}>Destino</span>
                    <AeropuertoCard aeropuerto={aeropuertoDestino} />
                  </div>
                ) : (
                  <p className={style.avisoDestino}>
                    Seleccioná un aeropuerto de destino en el buscador.
                  </p>
                )}

                <ResumenCostos
                  precioPorDia={publicacion.precioPorDia}
                  totalDias={totalDias}
                />

                {!isLogged && (
                  <div className={style.alertaAuth}>
                    <span>Debes iniciar sesión para completar la reserva.</span>
                  </div>
                )}

                {aeropuertoDestino && (
                  <Button
                    type="button"
                    className={style.botonConfirmar}
                    onClick={handleConfirmarReserva}
                    isLoading={enviando}
                  >
                    {isLogged
                      ? 'Confirmar Solicitud de Reserva'
                      : 'Iniciar Sesión para Reservar'}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
