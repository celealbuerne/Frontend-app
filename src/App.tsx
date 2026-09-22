import './App.css'
import Header from './componentes/HEADER/header.tsx'
import Hero from './componentes/HERO/hero.tsx'
import Publicaciones from './componentes/PUBLICACIONES/publicaciones.tsx'


function App() {
  return (
    <>
      <Header/>
      <main>
        <Hero/>
        {/* Publicaciones recientes */}
        <section
          className="publicaciones-recientes" id="publicaciones">
            <Publicaciones/>
        </section>

      </main>

      <footer>
        <div className="divisorFooter">
          <div className="empresaInfo">
            <div className="infoHeader">
              <img src="/logo.png" alt="Logo Empresa" />
              <h3>Sobre Nosotros</h3>
            </div>

            <div className="contentInfoEmpresa">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quos necessitatibus enim beatae non ut placeat. Nulla
                facere magnam soluta officia necessitatibus consectetur,
                quam voluptate accusamus harum ratione cupiditate
                inventore blanditiis?
              </p>
            </div>
          </div>

          <div className="contactoEmpresa">
            <h3>Contacto</h3>

            <ul>
              <li>Instagram</li>
              <li>Instagram</li>
              <li>Instagram</li>
              <li>Instagram</li>
              <li>Instagram</li>
            </ul>
          </div>
        </div>

        <div className="infoLegal">
          <p>
            Términos Legales. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Officiis adipisci nobis neque, corporis,
            aliquid eum beatae ipsum magnam eligendi cum quam facere
            officia quae aliquam maxime fuga voluptatem natus veritatis.
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Dignissimos eligendi nihil eos, ut reprehenderit vitae quia
            dolorem iure tempora quisquam. Aspernatur ea accusantium
            quaerat amet eos delectus, vitae sed. Fugiat.
          </p>
        </div>
      </footer>
    </>
  )
}

export default App

