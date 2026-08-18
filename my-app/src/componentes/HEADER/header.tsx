
export default function Header() {
  return (
    <header>
        <nav>
        <div className="logo">
          <a href="index.html">
            <img id= "logo" src="images/logo.png" alt="Logo de AeroLux" />
            <h2>AeroLux</h2>
          </a>
        </div>

        <div className="menu">
          <ul>
            <li>
              <a href="#inicio">Inicio</a>
            </li>
            <li>
              <a href="#publicaciones">Publicaciones</a>
            </li>
            <li>
              <a href="#Flota">Flota</a>
            </li>
            <li>
              <a href="Cotizacion">Cotizacion</a>
            </li>
            <li>
              <a href="#SobreNosotros">Sobre Nosotros</a>
            </li>
          </ul>
        </div>

        <div className="login">
          <a href="Ingresar.html">Iniciar Sesión</a>
        </div>
        </nav>
    </header>
  )
}
