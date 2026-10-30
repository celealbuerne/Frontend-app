import { Link } from 'react-router-dom';
import style from './AdminDashboard.module.css';

const OPCIONES_ADMIN = [
  { key: 'Ver proveedores', href: '#' },
  { key: 'Gestionar usuarios', href: '#' },
  { key: 'Gestionar aeropuertos', href: '/admin/crear-aeropuerto' },
  { key: 'Gestionar localidades', href: '#' },
];

export default function AdminDashboard() {
  return (
    <main className={style.contenedor}>
      <h1 className={style.titulo}>Dashboard Admin</h1>
      <ul className={style.listaTarjetas}>
        {OPCIONES_ADMIN.map((op) => (
          <li key={op.key} className={style.itemTarjeta}>
            <Link to={op.href} className={style.tarjeta}>
              {op.key}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}

