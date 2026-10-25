import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getOnePublicacion } from '../../services/publicacion.service';
import type { Publicacion } from '../../models/publicacion.model';
import style from './PublicacionDetalle.module.css';

const BASE_URL = 'http://localhost:3000';

export default function PublicacionDetalle() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [publicacion, setPublicacion] = useState<Publicacion | null>(null);
  const [cargando, setCargando] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelado = false;

    async function cargarPublicacion() {
      if (!id || Number.isNaN(id)) {
        setError('El identificador de publicación no es válido.');
        setCargando(false);
        return;
      }

      setCargando(true);
      setError(null);

      try {
        const res = await getOnePublicacion(Number(id));
        if (!cancelado) {
          setPublicacion(res.data);
        }
      } catch (e) {
        if (!cancelado) {
          setError(
            e instanceof Error ? e.message : 'Error al cargar la publicación'
          );
        }
      } finally {
        if (!cancelado) {
          setCargando(false);
        }
      }
    }

    cargarPublicacion();

    return () => {
      cancelado = true;
    };
  }, [id]);

  const handleSolicitarReserva = () => {
    alert(
      `Has solicitado una reserva para ${publicacion?.aeronave?.modelo ?? 'esta aeronave'}.`
    );
  };

  if (cargando) {
    return (
      <main className={style.contenedor}>
        <p className={style.mensajeEstado}>
          Cargando detalles de la publicación...
        </p>
      </main>
    );
  }

  if (error || !publicacion) {
    return (
      <main className={style.contenedor}>
        <button
          type="button"
          className={style.botonVolver}
          onClick={() => navigate('/publicaciones')}
        >
          Volver a publicaciones
        </button>
        <div className={style.mensajeError}>
          <p>{error ?? 'No se encontró la publicación solicitada.'}</p>
        </div>
      </main>
    );
  }

  const { aeronave, descripcion, precioPorDia, imagen } = publicacion;
  const ultimoAeropuerto = aeronave?.ultimoAeropuerto;
  const imgSrc = imagen ? `${BASE_URL}/${imagen.replace(/^\/+/, '')}` : '';

  const anioAntiguedad = aeronave?.antiguedad
    ? new Date(aeronave.antiguedad).getFullYear()
    : null;

  return (
    <div className={style.paginaDetalle}>
      <main className={style.contenedor}>
        <button
          type="button"
          className={style.botonVolver}
          onClick={() => navigate('/publicaciones')}
        >
          Volver a publicaciones
        </button>

        <section className={style.seccionPrincipal}>
          <div className={style.cabeceraDetalle}>
            {ultimoAeropuerto && (
              <div className={style.badgeAeropuerto}>
                <span>
                  {ultimoAeropuerto.nombre}
                  {ultimoAeropuerto.codigo
                    ? ` (${ultimoAeropuerto.codigo})`
                    : ''}
                </span>
              </div>
            )}
            <h1 className={style.titulo}>{aeronave?.modelo ?? 'Aeronave'}</h1>
            {aeronave?.fabricante && (
              <p className={style.fabricante}>
                Fabricante: {aeronave.fabricante}
              </p>
            )}
          </div>

          {imgSrc && (
            <div className={style.contenedorImagen}>
              <img
                src={imgSrc}
                alt={`Aeronave ${aeronave?.modelo ?? ''}`}
                className={style.imagenAeronave}
              />
            </div>
          )}

          <div className={style.columnasDetalle}>
            {/* columna de descripciones */}
            <div className={style.columnaDescripciones}>
              <div className={style.bloqueInfo}>
                <h2 className={style.subtitulo}>Descripción del servicio</h2>
                <p className={style.descripcionTexto}>{descripcion}</p>
              </div>

              {aeronave?.descripcion &&
                aeronave.descripcion !== descripcion && (
                  <div className={style.bloqueInfo}>
                    <h2 className={style.subtitulo}>Sobre la aeronave</h2>
                    <p className={style.descripcionTexto}>
                      {aeronave.descripcion}
                    </p>
                  </div>
                )}
            </div>

            {/* Columna de especificaciones */}
            <div className={style.columnaInformacion}>
              <div className={style.bloqueInfo}>
                <h2 className={style.subtitulo}>Información de la aeronave</h2>
                <div className={style.rejillaDatos}>
                  <div className={style.tarjetaDato}>
                    <span className={style.etiquetaDato}>Capacidad</span>
                    <span className={style.valorDato}>
                      Hasta {aeronave?.capacidad ?? '-'} pasajeros
                    </span>
                  </div>

                  <div className={style.tarjetaDato}>
                    <span className={style.etiquetaDato}>Autonomía</span>
                    <span className={style.valorDato}>
                      {aeronave?.autonomia
                        ? `${aeronave.autonomia.toLocaleString()} km`
                        : '-'}
                    </span>
                  </div>

                  <div className={style.tarjetaDato}>
                    <span className={style.etiquetaDato}>Velocidad máxima</span>
                    <span className={style.valorDato}>
                      {aeronave?.velocidadMaxima
                        ? `${aeronave.velocidadMaxima} km/h`
                        : '-'}
                    </span>
                  </div>

                  {ultimoAeropuerto && (
                    <div className={style.tarjetaDato}>
                      <span className={style.etiquetaDato}>
                        Último aeropuerto
                      </span>
                      <span className={style.valorDato}>
                        {ultimoAeropuerto.nombre}
                        {ultimoAeropuerto.codigo
                          ? ` (${ultimoAeropuerto.codigo})`
                          : ''}
                      </span>
                    </div>
                  )}

                  {aeronave?.fabricante && (
                    <div className={style.tarjetaDato}>
                      <span className={style.etiquetaDato}>Fabricante</span>
                      <span className={style.valorDato}>
                        {aeronave.fabricante}
                      </span>
                    </div>
                  )}

                  {anioAntiguedad && !isNaN(anioAntiguedad) && (
                    <div className={style.tarjetaDato}>
                      <span className={style.etiquetaDato}>
                        Año de fabricación
                      </span>
                      <span className={style.valorDato}>{anioAntiguedad}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <aside className={style.barraInferior}>
        <div className={style.barraContenido}>
          <div className={style.grupoPrecio}>
            <span className={style.etiquetaPrecio}>Tarifa</span>
            <div className={style.valorPrecio}>
              ${precioPorDia}
              <span className={style.unidadPrecio}>USD por día</span>
            </div>
          </div>

          <button
            type="button"
            className={style.botonReserva}
            onClick={handleSolicitarReserva}
          >
            Solicitar reserva
          </button>
        </div>
      </aside>
    </div>
  );
}
