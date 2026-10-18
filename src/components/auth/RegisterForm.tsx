import { useState, type SubmitEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../ui/Button';
import InputField from '../ui/InputField';
import SelectField from '../ui/SelectField';
import style from './RegisterForm.module.css';
import { useAuth } from '../../contexts/auth.context';
import type { RegisterPayload } from '../../models/user.model';

interface FormError {
  profileName?: string;
  user?: string;
  country?: string;
  dateOfBirth?: string;
  identityType?: string;
  identity?: string;
  password?: string;
  confirmPassword?: string;
  rol?: string;
}

export default function RegisterForm() {
  const [formErrors, setFormErrors] = useState<FormError>({});
  const [errorServidor, setErrorServidor] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [rolSeleccionado, setRolSeleccionado] = useState('CLIENTE');

  const { registerUser } = useAuth();
  const navigate = useNavigate();

  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() - 18);
  const maxBirthDate = maxDate.toLocaleDateString('en-CA');

  const clearError = (fieldName: keyof FormError) => {
    setErrorServidor(null);
    if (formErrors[fieldName]) {
      setFormErrors((prev) => {
        const next = { ...prev };
        delete next[fieldName];
        return next;
      });
    }
  };

  const submitForm = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorServidor(null);

    const form = event.currentTarget;
    const formData = new FormData(form);

    const profileName = String(formData.get('profileName') ?? '').trim();
    const user = String(formData.get('user') ?? '').trim();
    const password = String(formData.get('password') ?? '');
    const confirmPassword = String(formData.get('confirmPassword') ?? '');
    const rol = String(formData.get('rol') ?? 'CLIENTE').trim();
    const identityType = String(formData.get('identityType') ?? '').trim();
    const identityStr = String(formData.get('identity') ?? '').trim();
    const country = String(formData.get('country') ?? '').trim();
    const dateOfBirth = String(formData.get('dateOfBirth') ?? '').trim();
    const identity = Number(identityStr);

    const errors: FormError = {};

    if (!identityStr || Number.isNaN(identity) || identity <= 0) {
      errors.identity = 'Se debe ingresar un número de documento válido';
    }
    if (password !== confirmPassword) {
      errors.confirmPassword = 'Las contraseñas deben coincidir';
    }
    if (password.length < 6) {
      errors.password = 'La contraseña debe tener al menos 6 caracteres.';
    }
    if (!dateOfBirth || dateOfBirth > maxBirthDate) {
      errors.dateOfBirth = 'Debes tener al menos 18 años para registrarte.';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});

    const payload: RegisterPayload = {
      nombre: profileName,
      nombreUsuario: user,
      pais: country,
      fechaNacimiento: dateOfBirth,
      tipoDocumento: identityType,
      documento: identity,
      contraseña: password,
      rol,
    };

    setIsLoading(true);
    try {
      await registerUser(payload);
      form.reset();
      navigate('/login', {
        state: {
          mensaje: '¡Cuenta creada con éxito!',
        },
      });
    } catch (error) {
      setErrorServidor(
        error instanceof Error ? error.message : 'Error al registrar el usuario'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className={style.card}>
      <h1 className={style.title}>
        {rolSeleccionado === 'PROVEEDOR'
          ? 'Registrarse como Proveedor'
          : 'Registrarse como Cliente'}
      </h1>

      <form className={style.form} onSubmit={submitForm}>
        {errorServidor && (
          <div className={style.errorAlert}>{errorServidor}</div>
        )}

        <h2 className={style.sectionTitle}>Datos de la Cuenta</h2>

        <InputField
          label="Tu Nombre"
          type="text"
          name="profileName"
          placeholder="Tu Nombre"
          error={formErrors.profileName}
          onChange={() => clearError('profileName')}
          required
        />
        <InputField
          label="Usuario"
          type="text"
          name="user"
          placeholder="Ingrese su nombre de usuario"
          error={formErrors.user}
          onChange={() => clearError('user')}
          required
        />
        <InputField
          label="Contraseña"
          type="password"
          name="password"
          placeholder="••••••••"
          error={formErrors.password}
          onChange={() => clearError('password')}
          required
        />
        <InputField
          label="Repetir Contraseña"
          type="password"
          name="confirmPassword"
          placeholder="••••••••"
          error={formErrors.confirmPassword}
          onChange={() => clearError('confirmPassword')}
          required
        />

        <section className={style.roleSection}>
          <h2 className={style.sectionTitle}>Selecciona tu rol</h2>
          <SelectField
            label="Quiero registrarme como"
            name="rol"
            defaultValue="CLIENTE"
            required
            onChange={(e) => {
              clearError('rol');
              setRolSeleccionado(e.target.value);
            }}
            options={[
              { value: 'CLIENTE', label: 'Cliente (quiero reservar vuelos)' },
              { value: 'PROVEEDOR', label: 'Proveedor (quiero publicar mis aeronaves)' },
            ]}
          />
        </section>

        <h2 className={style.sectionTitle}>Datos Personales</h2>

        <SelectField
          label="Tipo de documento"
          name="identityType"
          defaultValue=""
          error={formErrors.identityType}
          onChange={() => clearError('identityType')}
          required
          options={[
            { value: '', label: 'Selecciona una opción', disabled: true },
            { value: 'DNI', label: 'DNI' },
            { value: 'PASAPORTE', label: 'Pasaporte' },
            { value: 'CEDULA', label: 'Cédula de Identidad' },
          ]}
        />
        <InputField
          label="Número de documento"
          type="text"
          name="identity"
          placeholder="Número de documento"
          error={formErrors.identity}
          onChange={() => clearError('identity')}
          required
        />
        <InputField
          label="País"
          type="text"
          name="country"
          placeholder="Tu país de residencia"
          error={formErrors.country}
          onChange={() => clearError('country')}
          required
        />
        <InputField
          label="Fecha de nacimiento"
          type="date"
          name="dateOfBirth"
          max={maxBirthDate}
          error={formErrors.dateOfBirth}
          onChange={() => clearError('dateOfBirth')}
          required
        />

        <div className={style.submitButton}>
          <Button type="submit" variant="primary" isLoading={isLoading}>
            Continuar
          </Button>
        </div>

        <div className={style.loginPrompt}>
          <span>¿Ya tienes una cuenta? </span>
          <Link to="/login" className={style.loginLink}>
            Iniciar Sesión
          </Link>
        </div>
      </form>
    </section>
  );
}
