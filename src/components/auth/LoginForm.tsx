import { Link, useNavigate } from 'react-router-dom';
import InputField from '../ui/InputField';
import Button from '../ui/Button';
import style from './LoginForm.module.css';
import { useAuth } from '../../contexts/auth.context';

export default function LoginForm() {
  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const submitForm = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const user = event.target.user.value.trim();
    const password = event.target.password.value.trim();

    try {
      await loginUser(user, password);
      event.target.reset();
      navigate('/profile', { replace: true });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className={style.card}>
      <h1 className={style.title}>Iniciar sesión</h1>

      <form className={style.form} onSubmit={submitForm}>
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
          <Link to="/register" className={style.registerLink}>
            Registrarse
          </Link>
        </div>
      </form>
    </section>
  );
}
