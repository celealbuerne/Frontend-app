export class publicacionData {
    imagen!:string;
    modelo!:string;
    origen!: string;
    descripcion!: string;
    capacidad!: number;
    precio!: number;



}
export default function PublicacionesCard ({
    imagen,
    modelo,
    origen,
    descripcion,
    capacidad,
    precio
}: publicacionData){

    return (
        <article className="publi">
            <img src={imagen} alt="imagenPublicacion" />
            
            <div className="modelo-publi">
                <h3>{modelo}</h3>
            </div>

            <div className="especificaciones-publi">
                <p>{origen}</p>
                <p>{descripcion}</p>
                <p>Hasta {capacidad} pasajeros</p>
            </div>

            <div className="precio-publi">
                <p>{precio} USD/km</p>
            </div>

            <button type="button">Ver Publicación</button>
        </article>
        
    )
}