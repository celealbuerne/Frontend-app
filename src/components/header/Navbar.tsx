import { Link } from 'react-router-dom';
import style from './Navbar.module.css';

const NAV_OPTIONS = [
  { key: 'Inicio', href: '/' },
  { key: 'Publicaciones', href: '#' },
  { key: 'Aeropuertos', href: '#' },
  { key: 'Proveedores', href: '#' },
  { key: 'Sobre nosotros', href: '#' },
];

export default function Navbar() {
  return (
    <nav className={style.navbar}>
      <ul className={style.menu}>
        {NAV_OPTIONS.map((op) => {
          return (
            <li>
              <Link key={op.key} to={op.href} className={style.menuOption}>
                {op.key}
              </Link>
            </li>
          );
        })}
      </ul>
      <Link to="/login" className={style.loginLink}>
        Ingresar
      </Link>
    </nav>
  );
}
