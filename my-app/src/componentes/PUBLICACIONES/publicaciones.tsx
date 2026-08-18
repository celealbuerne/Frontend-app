import PublicacionesCard from "./publicacionCard"

export default function Publicaciones (){

    const publi= [
        {
        imagen: "/images/fondo.png",
        modelo: "Jett privado",
        origen: "Buenos Aires (EZE)",
        descripcion: "Modelo Restaurado con todas las amenities",
        capacidad:10,
        precio: 1200
        },
        {
        imagen: "/images/fondo.png",
        modelo: "Avion Comercial",
        origen: "Buenos Aires (EZE)",
        descripcion: "Modelo Restaurado con todas las amenities",
        capacidad:10,
        precio: 1200
        },        
        {
        imagen: "/images/fondo.png",
        modelo: "Avioneta",
        origen: "Buenos Aires (EZE)",
        descripcion: "Modelo Restaurado con todas las amenities",
        capacidad:10,
        precio: 1200
        },        
        {
        imagen: "/images/fondo.png",
        modelo: "Jett privado",
        origen: "Buenos Aires (EZE)",
        descripcion: "Modelo Restaurado con todas las amenities",
        capacidad:10,
        precio: 1200
        }
    ]

    return(
        <>
        <div className="titulo-publi">
            <h2>Publicaciones Recientes</h2>
        </div>

        <div className="boton-publi">
        <button type="button">Ver Todas las Publicaciones</button>
        </div>

        <div className="publicaciones-card">                
            {publi.map((publicacion, index) => {
                return (
                    <PublicacionesCard
                        key={index}
                        imagen={publicacion.imagen}
                        modelo={publicacion.modelo}
                        origen={publicacion.origen}
                        descripcion={publicacion.descripcion}
                        capacidad={publicacion.capacidad}
                        precio={publicacion.precio}
                    />
                 )
            })}
        </div>
        </>
    )
}