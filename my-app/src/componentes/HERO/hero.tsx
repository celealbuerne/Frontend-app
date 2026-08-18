import CaracteristicaEmpresa from "./caracteristicaEmpresa"
import Cotizacion from './cotizacion'



export default function Hero() {
    const caracteristicas = [
        {
            imagen: "images/avion.png",
            titulo: "Variedad de Aeronaves",
            descripcion: "Seguridad y Confianza"
        },
        {
            imagen: "images/soporte.jpg",
            titulo: "Servicio Personalizado",
            descripcion: "Soporte 24/7"
        },
        {
            imagen: "images/peso.png",
            titulo: "Mejores Precios",
            descripcion: "Cotiza y compara"
        }
    ]
  
    return (
    
        <section className="hero" id="inicio">
            <div className="hero-izquierda">
                <div className="hero-content">
                    <h1>Alquila tu avión de lujo para tu próximo vuelo</h1>
                    <p>Explora nuestra selección de aeronaves disponibles y vuela sin límites.</p>
                </div>

                <div className="caracteristicasEmpresa">
                    {caracteristicas.map((caracteristica, index) => {
                    return (
                        <CaracteristicaEmpresa
                        key={index}
                        imagen={caracteristica.imagen}
                        titulo={caracteristica.titulo}
                        descripcion={caracteristica.descripcion}
                        />
                    )
                })}
                </div>
            </div>

            <div className="hero-derecha">
                <div className="cotizacion">
                    <Cotizacion/>
                </div>
            </div>
        </section>
  )  
}
