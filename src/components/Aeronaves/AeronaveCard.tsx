import type { Aeronave } from '../../models/aeronave.model';
import AeropuertoCard from '../Aeropuertos/AeropuertoCard';
import style from './AeronaveCard.module.css';

const BASE_URL = 'http://localhost:3000';

interface AeronaveCardProps {
  aeronave: Aeronave;
  imagen?: string;
  titulo?: string;
}

export default function AeronaveCard({
  aeronave,
  imagen,
  titulo = 'Aeronave',
}: AeronaveCardProps) {
  const imgSrc = imagen ? `${BASE_URL}/${imagen.replace(/^\/+/, '')}` : '';

  return (
    <article className={style.tarjeta}>
      <h2 className={style.tituloSeccion}>{titulo}</h2>

      {imgSrc && (
        <div className={style.contenedorImagen}>
          <img
            src={imgSrc}
            alt={aeronave.modelo || 'Aeronave'}
            className={style.imagen}
          />
        </div>
      )}

      <div className={style.datos}>
        <h3 className={style.modelo}>{aeronave.modelo}</h3>
        <p className={style.fabricante}>
          Fabricante: {aeronave.fabricante || 'No especificado'}
        </p>

        <div className={style.grillaEspecificaciones}>
          <div className={style.especificacion}>
            <span className={style.clave}>Capacidad</span>
            <span className={style.valor}>{aeronave.capacidad} pasajeros</span>
          </div>
          <div className={style.especificacion}>
            <span className={style.clave}>Autonomía</span>
            <span className={style.valor}>{aeronave.autonomia} km</span>
          </div>
          <div className={style.especificacion}>
            <span className={style.clave}>Velocidad</span>
            <span className={style.valor}>{aeronave.velocidadMaxima} km/h</span>
          </div>
        </div>

        {aeronave.ultimoAeropuerto && (
          <div className={style.bloqueOrigen}>
            <span className={style.clave}>Ubicación</span>
            <AeropuertoCard aeropuerto={aeronave.ultimoAeropuerto} />
          </div>
        )}
      </div>
    </article>
  );
}
