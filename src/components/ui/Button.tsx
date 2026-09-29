import type { ButtonHTMLAttributes, ReactNode } from 'react';
import style from './Button.module.css';

export type ButtonVariant = 'primary' | 'secondary' | 'outline';

// comiilas invertidas: ``

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  isLoading?: boolean;
}

/*
este componente admite cambiarle las clases del CSS
desde la prop -variant- para clases predefinidas
y desde -className- para clases personalizadas
de la forma className={style.clasePersonalizada}
pero esa clase debe estar en el modulo de css del componente padre
o en su defecto un string con el nombre de una clase global de App.css
*/
export default function Button({
  children,
  variant = 'primary',
  isLoading = false,
  className = '',
  disabled,
  ...rest
}: ButtonProps) {
  const combinedClasses =
    `${style.button} ${style[variant]} ${className}`.trim();

  return (
    <button
      className={combinedClasses}
      disabled={disabled || isLoading}
      {...rest}
    >
      {isLoading ? 'Cargando...' : children}
    </button>
  );
}
