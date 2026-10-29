import style from './ResumenCostos.module.css';

interface ResumenCostosProps {
  precioPorDia: number;
  totalDias: number;
}

export default function ResumenCostos({
  precioPorDia,
  totalDias,
}: ResumenCostosProps) {
  const total = precioPorDia * totalDias;
  const etiquetaDias = totalDias === 1 ? 'día' : 'días';

  return (
    <div className={style.desglose}>
      <div className={style.filaCalculo}>
        <span>
          ${precioPorDia} USD × {totalDias} {etiquetaDias}
        </span>
        <span>${total} USD</span>
      </div>
      <hr className={style.separador} />
      <div className={style.filaTotal}>
        <span>Total estimado:</span>
        <span className={style.montoTotal}>${total} USD</span>
      </div>
    </div>
  );
}
