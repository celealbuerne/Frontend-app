import { Link } from 'react-router-dom';
import style from './Navbar.module.css';
import { useAuth } from '../../contexts/auth.context.tsx';

const NAV_OPTIONS = [
  { key: 'Inicio', href: '/' },
  { key: 'Publicaciones', href: '#' },
  { key: 'Aeropuertos', href: '#' },
  { key: 'Proveedores', href: '#' },
  { key: 'Sobre nosotros', href: '#' },
];

export default function Navbar() {
  const { isLogged } = useAuth();

  return (
    <nav className={style.navbar}>
      <ul className={style.menu}>
        {NAV_OPTIONS.map((op) => {
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
