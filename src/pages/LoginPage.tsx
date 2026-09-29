import { Link } from 'react-router-dom';
import LoginForm from '../components/auth/LoginForm';
import style from './LoginPage.module.css';

export default function LoginPage() {
  return (
    <main className={style.loginPage}>
      <LoginForm />

      <section className={style.helpSection}>
        <h2 className={style.helpTitle}>¿Problemas para iniciar sesión?</h2>
        <div className={style.helpLinks}>
          <Link to="#" className={style.helpLink}>
            Olvidé mi contraseña
          </Link>
          <span className={style.divider}>•</span>
          <Link to="#" className={style.helpLink}>
            Soporte
          </Link>
        </div>
      </section>
    </main>
  );
}
