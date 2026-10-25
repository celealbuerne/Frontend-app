import { useState, type SubmitEvent } from 'react';
import InputField from '../ui/InputField';
import Button from '../ui/Button';
import style from './PublicacionFiltros.module.css';

interface PublicacionFiltrosProps {
  precioMin: string;
  precioMax: string;
  onFiltrar: (filtros: { precioMin: string; precioMax: string }) => void;
  onLimpiar: () => void;
}

export default function PublicacionFiltros({
  precioMin,
  precioMax,
  onFiltrar,
  onLimpiar,
}: PublicacionFiltrosProps) {
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const datos = new FormData(event.currentTarget);
    const min = String(datos.get('precioMin') ?? '');
    const max = String(datos.get('precioMax') ?? '');

    const esPrecioValido = (valor: string) =>
      valor === '' || (Number.isFinite(Number(valor)) && Number(valor) >= 0);

    if (!esPrecioValido(min) || !esPrecioValido(max)) {
      setError('Los precios deben ser números mayores o iguales a 0.');
      return;
    }

    if (min && max && Number(min) > Number(max)) {
      setError('El precio mínimo no puede ser mayor al máximo.');
      return;
    }

    setError(null);
    onFiltrar({ precioMin: min, precioMax: max });
  };

  const handleLimpiar = () => {
    setError(null);
    onLimpiar();
  };

  return (
    <form
      key={`${precioMin}-${precioMax}`}
      className={style.filtros}
      onSubmit={handleSubmit}
    >
      <div className={style.cabeceraFiltro}>
        <h3 className={style.tituloFiltro}>Filtros</h3>
      </div>

      <div className={style.campos}>
        <InputField
          label="Precio mín. (USD/km)"
          type="number"
          name="precioMin"
          min="0"
          step="any"
          placeholder="Ej: 50"
          defaultValue={precioMin}
        />
        <InputField
          label="Precio máx. (USD/km)"
          type="number"
          name="precioMax"
          min="0"
          step="any"
          placeholder="Ej: 500"
          defaultValue={precioMax}
        />
      </div>

      {error && <p className={style.error}>{error}</p>}

      <div className={style.acciones}>
        <Button type="submit">Aplicar filtros</Button>
        <Button
          type="button"
          variant="outline"
          className={style.botonLimpiar}
          onClick={handleLimpiar}
        >
          Limpiar
        </Button>
      </div>
    </form>
  );
}
