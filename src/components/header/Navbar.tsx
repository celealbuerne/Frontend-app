import { Link } from 'react-router-dom';
import style from './Navbar.module.css';
import { useAuth } from '../../contexts/auth.context.tsx';

const NAV_VISITANTE = [
  { key: 'Inicio', href: '/' },
  { key: 'Publicaciones', href: '/publicaciones' },
  { key: 'Aeropuertos', href: '#' },
  { key: 'Sobre nosotros', href: '#' },
];

const NAV_PROVEEDOR = [
  { key: 'Inicio', href: '/' },
  { key: 'Publicaciones', href: '/publicaciones' },
  { key: 'Mis Publicaciones', href: '/proveedor' },
  { key: 'Reservas', href: '/mis-reservas' },
  // { key: 'Crear Publicación', href: '/proveedor/crear-publicacion' }, va por el boton de la pag anterior
  { key: 'Mi Flota', href: '/proveedor/aeronaves' },
  { key: 'Aeropuertos', href: '#' },
];

const NAV_CLIENTE = [
  { key: 'Inicio', href: '/' },
  { key: 'Publicaciones', href: '/publicaciones' },
  { key: 'Mis Reservas', href: '/mis-reservas' },
  { key: 'Aeropuertos', href: '#' },
];

const NAV_ADMIN = [
  { key: 'Inicio', href: '/' },
  { key: 'Publicaciones', href: '/publicaciones' },
  { key: 'Aeropuertos', href: '/crear-aeropuerto' },
  { key: 'Dashboard Administrador', href: '/admin' },
];

function obtenerOpciones(roles?: string[]) {
  if (roles?.includes('PROVEEDOR')) return NAV_PROVEEDOR;
  if (roles?.includes('CLIENTE')) return NAV_CLIENTE;
  if (roles?.includes('ADMIN')) return NAV_ADMIN;
  return NAV_VISITANTE;
}

export default function Navbar() {
  const { isLogged, currentUser } = useAuth();

  const opciones = obtenerOpciones(isLogged ? currentUser?.roles : undefined);

  return (
    <nav className={style.navbar}>
      <ul className={style.menu}>
        {opciones.map((op) => {
          return (
            <li key={op.key}>
              <Link to={op.href} className={style.menuOption}>
                {op.key}
              </Link>
            </li>
          );
        })}
      </ul>
      {isLogged ? (
        <Link to="/profile" className={style.loginLink}>
          Mi Perfil
        </Link>
      ) : (
        <Link to="/login" className={style.loginLink}>
          Ingresar
        </Link>
      )}
    </nav>
  );
}
