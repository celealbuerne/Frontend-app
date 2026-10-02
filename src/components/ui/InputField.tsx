import { useId, type InputHTMLAttributes } from 'react';
import style from './InputField.module.css';

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  error?: string;
}

export default function InputField({
  label,
  name,
  error,
  className = '',
  ...rest
}: InputFieldProps) {
  const generatedId = useId();
  const inputId = name || generatedId;

  const inputClasses =
    `${style.inputField} ${error ? style.inputError : ''} ${className}`.trim();

  return (
    <div className={style.inputContainer}>
      <label htmlFor={inputId} className={style.label}>
        {label}
      </label>
      <input
        id={inputId}
        className={inputClasses}
        name={inputId}
        aria-invalid={!!error}
        {...rest}
      />
      {error && <span className={style.errorMessage}>{error}</span>}
    </div>
  );
}
