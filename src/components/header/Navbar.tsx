import { Link } from 'react-router-dom';
import style from './Navbar.module.css';
import { useAuth } from '../../contexts/auth.context.tsx';

const NAV_VISITANTE = [
  { key: 'Inicio', href: '/' },
  { key: 'Publicaciones', href: '/publicaciones' },
  { key: 'Aeropuertos', href: '#' },
  { key: 'Proveedores', href: '#' },
  { key: 'Sobre nosotros', href: '#' },
];

//A definir estos .... flota=aeronaves(?)
const NAV_PROVEEDOR = [
  { key: 'Inicio', href: '/' },
  { key: 'Mis Publicaciones', href: '/proveedor' },
  { key: 'Mi Flota', href: '/crear-publicacion' }, 
  { key: 'Aeropuertos', href: '#' },
  { key: 'Sobre nosotros', href: '#' },
]

const NAV_CLIENTE = [
  { key: 'Inicio', href: '/' },
  { key: 'Publicaciones', href: '/publicaciones' },
  { key: 'Mis Reservas', href: '#' },
  { key: 'Aeropuertos', href: '#' },
  { key: 'Sobre nosotros', href: '#' },
]

function obtenerOpciones (roles?:string[]){
  if (roles?.includes('PROVEEDOR')) return NAV_PROVEEDOR;
  if (roles?.includes('CLIENTE')) return NAV_CLIENTE;
  return NAV_VISITANTE;
}
  
export default function Navbar() {
  const { isLogged, currentUser } = useAuth();

  const opciones = obtenerOpciones (isLogged ? currentUser?.roles : undefined);

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
