import { Link } from 'react-router-dom';
import InputField from '../ui/InputField';
import Button from '../ui/Button';
import style from './LoginForm.module.css';

export default function LoginForm() {
  return (
    <section className={style.card}>
      <h1 className={style.title}>Iniciar sesión</h1>

      <form
        className={style.form}
        onSubmit={() => {
          console.log('enviado');
        }}
      >
        <InputField
          label="Usuario (Correo electrónico)"
          type="email"
          name="user"
          placeholder="ejemplo@mail.com"
          required
        />
        <InputField
          label="Contraseña"
          type="password"
          name="password"
          placeholder="••••••••"
          required
        />

        <Button type="submit" variant="primary">
          Continuar
        </Button>

        <div className={style.registerPrompt}>
          <span>¿No tienes una cuenta? </span>
          <Link to="#" className={style.registerLink}>
            Registrarse
          </Link>
        </div>
      </form>
    </section>
  );
}
