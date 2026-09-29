import { useId, type InputHTMLAttributes } from 'react';
import style from './InputField.module.css';

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
}
export default function InputField({ label, name, ...rest }: InputFieldProps) {
  const generatedId = useId();
  const inputId = name || generatedId;

  return (
    <div className={style.inputContainer}>
      <label htmlFor={inputId} className={style.label}>
        {label}
      </label>
      <input id={inputId} className={style.inputField} {...rest} />
    </div>
  );
}
