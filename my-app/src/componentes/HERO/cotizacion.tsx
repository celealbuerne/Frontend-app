export default function Hero() {
    return(
        <>
        <h2>Cotiza tu vuelo</h2>
        <form action="cotizacion.html" method="get">

            <label htmlFor="aeropuerto-origen">Aeropuerto de origen:</label>
            <input id="aeropuerto-origen" type="text" name="origen" placeholder="Origen" required/>

            <label htmlFor="aeropuerto-destino">Aeropuerto de destino:</label>
            <input id="aeropuerto-destino" type="text" name="destino" placeholder="Destino" required/>

            <label htmlFor="fecha">Fecha de viaje:</label>
            <input id="fecha" type="date" name="fecha" required/>

            <label htmlFor="pasajeros">Número de pasajeros:</label>
            <input id="pasajeros" type="number" name="pasajeros" placeholder="Número de pasajeros" min="1" required/>

            <label htmlFor="avion">Tipo de aeronave:</label>
            <select id="avion" name="avion" required>
                <option value="">Seleccione un tipo de aeronave</option>
                <option value="jet">Jet Privado</option>
                <option value="helicoptero">Helicóptero</option>
                <option value="avionComercial">Avión Comercial</option>
            </select>

             <button type="submit">Cotizar</button>
        </form>
        </>
    )

}