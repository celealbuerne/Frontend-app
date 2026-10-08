import Button from '../ui/Button';
import InputField from '../ui/InputField';
import SelectField from '../ui/SelectField';
import style from './RegisterForm.module.css';
import { useAuth } from '../../contexts/auth.context';
import { Link } from 'react-router-dom';
import type { RegisterPayload } from '../../models/user.model.ts';
import { useState } from 'react';

interface formError {
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
  const [formErrors, setFormErrors] = useState<formError>({});
  const { registerUser } = useAuth();

  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() - 18);
  const maxBirthDate = maxDate.toLocaleDateString('en-CA');

  const submitForm = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const errors: formError = {};

    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;
    const identity = Number(form.identity.value.trim());
    const dateOfBirth = form.dateOfBirth.value;

    if (Number.isNaN(identity)) {
      errors.identity = 'Se debe ingresar un número válido';
    }
    if (password !== confirmPassword) {
      errors.confirmPassword = 'Las contraseñas deben coincidir';
    }
    if (password.length < 6) {
      errors.password = 'La contraseña debe tener al menos 6 caracteres.';
    }
    if (dateOfBirth > maxBirthDate) {
      errors.dateOfBirth = 'La fecha no es válida.';
    }
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    const payload: RegisterPayload = {
      nombre: event.target.profileName.value.trim(),
      nombreUsuario: event.target.user.value.trim(),
      pais: event.target.country.value.trim(),
      fechaNacimiento: event.target.dateOfBirth.value.trim(),
      tipoDocumento: event.target.identityType.value.trim(),
      documento: Number(event.target.identity.value.trim()),
      contraseña: event.target.password.value.trim(),
      rol: event.target.rol.value.trim(),
    };

    try {
      await registerUser(payload);
      event.target.reset();
    } catch (error) {
      console.error(error);
    }
  };
  const clearError = (fieldName: keyof formError) => {
    if (formErrors[fieldName]) {
      setFormErrors((prev) => {
        const next = { ...prev };
        delete next[fieldName];
        return next;
      });
    }
  };

  return (
    <section className={style.card}>
      <h1 className={style.title}>Registrarse como Cliente</h1>

      <form className={style.form} onSubmit={submitForm}>
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
            options={[
            { value: 'CLIENTE', label: 'Cliente (quiero reservar vuelos)' },
            { value: 'PROVEEDOR', label: 'Proveedor (quiero publicar mis aeronaves)' },
            ]}
          ></SelectField>
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
          <Button type="submit" variant="primary">
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
