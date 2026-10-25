import { useState, type SubmitEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import InputField from '../ui/InputField';
import Button from '../ui/Button';
import style from './LoginForm.module.css';
import { useAuth } from '../../contexts/auth.context';

export default function LoginForm() {
  const { loginUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const infoMessage = (location.state as { mensaje?: string } | null)?.mensaje;

  const submitForm = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const user = String(formData.get('user') ?? '').trim();
    const password = String(formData.get('password') ?? '').trim();

    if (!user || !password) {
      setError('Todos los campos son obligatorios.');
      return;
    }

    setIsLoading(true);
    try {
      const usuario = await loginUser(user, password);
      form.reset();

      if (usuario.roles?.includes('PROVEEDOR')) {
        navigate('/proveedor', { replace: true });
      } else {
        navigate('/profile', { replace: true });
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Error al iniciar sesión. Inténtalo nuevamente.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className={style.card}>
      <h1 className={style.title}>Iniciar sesión</h1>

      <form className={style.form} onSubmit={submitForm}>
        {infoMessage && !error && (
          <div className={style.successAlert}>{infoMessage}</div>
        )}

        {error && <div className={style.errorAlert}>{error}</div>}

        <InputField
          label="Usuario"
          type="text"
          name="user"
          placeholder="ejemplo"
          onChange={() => setError(null)}
          required
        />
        <InputField
          label="Contraseña"
          type="password"
          name="password"
          placeholder="••••••••"
          onChange={() => setError(null)}
          required
        />

        <Button type="submit" variant="primary" isLoading={isLoading}>
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
