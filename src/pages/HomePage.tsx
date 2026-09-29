// import Hero from '../components/HERO/cotizacion';
import Publicaciones from '../components/ContentSections/PublicacionesDestacadas';
import style from './HomePage.module.css';

export default function HomePage() {
  return (
    <>
      {/* <Hero /> se eliminó la cotización del MD*/}
      <main>
        <section className={style.publicacionesRecientes} id="publicaciones">
          <Publicaciones />
        </section>
      </main>
    </>
  );
}
