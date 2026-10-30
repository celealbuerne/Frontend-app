import { useNavigate } from 'react-router-dom';
import { formatearFecha } from '../../utils/date.utils';
import Button from '../ui/Button';
import style from './ReservaExitosa.module.css';

interface ReservaExitosaProps {
  fechaInicio: string;
  fechaFin: string;
}

export default function ReservaExitosa({
  fechaInicio,
  fechaFin,
}: ReservaExitosaProps) {
  const navigate = useNavigate();

  return (
    <main className={style.contenedor}>
      <div className={style.tarjeta}>
        <div className={style.icono}>✓</div>
        <h2 className={style.titulo}>
          ¡Solicitud de reserva enviada con éxito!
        </h2>
        <p className={style.descripcion}>
          Solicitud registrada para el período del{' '}
          <strong>{formatearFecha(fechaInicio)}</strong> al{' '}
          <strong>{formatearFecha(fechaFin)}</strong>.
        </p>
        <Button
          type="button"
          variant="primary"
          onClick={() => navigate('/publicaciones')}
        >
          Ver más aeronaves
        </Button>
      </div>
    </main>
  );
}
