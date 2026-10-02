import { Link } from 'react-router-dom';
import style from './LoginPage.module.css'; // no vale la pena crear otro, es igual
import RegisterForm from '../components/auth/RegisterForm';

export default function RegisterPage() {
  return (
    <main className={style.loginPage}>
      <RegisterForm />

      <section className={style.helpSection}>
        <h2>¿Problemas para crear la cuenta? </h2>
        <Link to="#" className={style.helpLink}>
          Soporte
        </Link>
      </section>
    </main>
  );
}
