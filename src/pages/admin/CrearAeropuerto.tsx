import { Link, useNavigate } from 'react-router-dom';
import { saveOne } from '../../services/aeropuerto.service';
import type { Aeropuerto } from '../../models/aeropuerto.model';
import AeropuertoForm from '../../components/Aeropuertos/AeropuertoForm';
import style from './CrearAeropuerto.module.css';

export default function CrearAeropuerto() {
  const navigate = useNavigate();

  const crearForm = async (datos: Omit<Aeropuerto, 'id'>) => {
    await saveOne(datos);
    navigate('/admin');
  };

  return (
    <main className={style.contenedor}>
      <div className={style.encabezado}>
        <h1 className={style.titulo}>Nuevo aeropuerto</h1>
        <Link to="/admin" className={style.botonVolver}>
          ← Volver al dashboard
        </Link>
      </div>

      <AeropuertoForm textoBoton="Registrar aeropuerto" onSubmit={crearForm} />
    </main>
  );
}

