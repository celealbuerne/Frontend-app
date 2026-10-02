import { useId, type SelectHTMLAttributes, type ReactNode } from 'react';
import style from './InputField.module.css';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  name: string;
  options?: SelectOption[];
  children?: ReactNode;
  error?: string;
}

export default function SelectField({
  label,
  name,
  options,
  children,
  error,
  className = '',
  ...rest
}: SelectFieldProps) {
  const generatedId = useId();
  const inputId = name || generatedId;

  const selectClasses =
    `${style.inputField} ${error ? style.inputError : ''} ${className}`.trim();

  return (
    <div className={style.inputContainer}>
      <label htmlFor={inputId} className={style.label}>
        {label}
      </label>
      <select
        id={inputId}
        className={selectClasses}
        name={inputId}
        aria-invalid={!!error}
        {...rest}
      >
        {options
          ? options.map((opt) => (
              <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                {opt.label}
              </option>
            ))
          : children}
      </select>
      {error && <span className={style.errorMessage}>{error}</span>}
    </div>
  );
}
