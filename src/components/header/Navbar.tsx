import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import style from './Navbar.module.css';
import { useAuth } from '../../contexts/auth.context.tsx';

const NAV_VISITANTE = [
  { key: 'Inicio', href: '/' },
  { key: 'Publicaciones', href: '/publicaciones' },
  { key: 'Aeropuertos', href: '/aeropuertos' },
  { key: 'Sobre nosotros', href: '#' },
];

const NAV_PROVEEDOR = [
  { key: 'Inicio', href: '/' },
  { key: 'Publicaciones', href: '/publicaciones' },
  { key: 'Mis Publicaciones', href: '/proveedor' },
  { key: 'Reservas', href: '/mis-reservas' },
  { key: 'Mi Flota', href: '/proveedor/aeronaves' },
  { key: 'Aeropuertos', href: '/aeropuertos' },
];

const NAV_CLIENTE = [
  { key: 'Inicio', href: '/' },
  { key: 'Publicaciones', href: '/publicaciones' },
  { key: 'Mis Reservas', href: '/mis-reservas' },
  { key: 'Aeropuertos', href: '/aeropuertos' },
];

const NAV_ADMIN = [
  { key: 'Inicio', href: '/' },
  { key: 'Publicaciones', href: '/publicaciones' },
  { key: 'Aeropuertos', href: '/aeropuertos' },
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
  const [isOpen, setIsOpen] = useState(false);

  const opciones = obtenerOpciones(isLogged ? currentUser?.roles : undefined);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className={style.navbar}>
      <Button
        type="button"
        variant="outline"
        className={style.hamburger}
        onClick={toggleMenu}
        aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
        aria-expanded={isOpen}
      >
        {isOpen ? '✕' : '☰'}
      </Button>

      <div className={`${style.navContainer} ${isOpen ? style.navOpen : ''}`}>
        <ul className={style.menu}>
          {opciones.map((op) => (
            <li key={op.key}>
              <Link to={op.href} className={style.menuOption} onClick={closeMenu}>
                {op.key}
              </Link>
            </li>
          ))}
        </ul>

        {isLogged ? (
          <Link to="/profile" className={style.loginLink} onClick={closeMenu}>
            Mi Perfil
          </Link>
        ) : (
          <Link to="/login" className={style.loginLink} onClick={closeMenu}>
            Ingresar
          </Link>
        )}
      </div>
    </nav>
  );
}
