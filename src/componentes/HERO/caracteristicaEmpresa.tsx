export class CaracteristicaData {
    imagen!: string
    titulo!: string
    descripcion!: string
}

export default function CaracteristicaEmpresa({ imagen,titulo,descripcion }:CaracteristicaData) {
    return(
        <>
        <div className="item">
            <img src={imagen} alt="Icono de seguridad" />
            <h3>{titulo}</h3>
            <p>{descripcion}</p>                
        </div>
        </>
    )
}
