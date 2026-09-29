import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import style from './MainFooter.module.css';

const CONTACT_OPTIONS = [
  { key: 'Linkedin', href: '#' },
  { key: 'X (Twitter)', href: '#' },
  { key: 'Instagram', href: '#' },
  { key: 'Facebook', href: '#' },
  { key: 'YouTube', href: '#' },
];

export default function MainFooter() {
  return (
    <div className={style.footerMenu}>
      <div className={style.generalInfo}>
        <Link to="/">
          <img id="logo" src={logo} alt="Logo" />
        </Link>
        <div>
          <p>AeroLux</p>
          <p>Todos los derechos reservados</p>
        </div>
      </div>

      <div className={style.socialMedia}>
        <span>Encontranos en:</span>

        <ul className={style.socialMediaOptions}>
          {CONTACT_OPTIONS.map((op) => {
            return (
              <li>
                <Link key={op.key} to={op.href}>
                  {op.key}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
