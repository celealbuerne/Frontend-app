import { Link } from 'react-router-dom';
import PublicacionCard from '../Publicaciones/PublicacionCard';
import style from './PublicacionesDestacadas.module.css';

const publi = [
  {
    imagen: '/images/fondo.png',
    modelo: 'Jett privado',
    origen: 'Buenos Aires (EZE)',
    descripcion: 'Modelo Restaurado con todas las amenities',
    capacidad: 10,
    precio: 1200,
  },
  {
    imagen: '/images/fondo.png',
    modelo: 'Avion Comercial',
    origen: 'Buenos Aires (EZE)',
    descripcion: 'Modelo Restaurado con todas las amenities',
    capacidad: 10,
    precio: 1200,
  },
  {
    imagen: '/images/fondo.png',
    modelo: 'Avioneta',
    origen: 'Buenos Aires (EZE)',
    descripcion: 'Modelo Restaurado con todas las amenities',
    capacidad: 10,
    precio: 1200,
  },
  {
    imagen: '/images/fondo.png',
    modelo: 'Jett privado',
    origen: 'Buenos Aires (EZE)',
    descripcion: 'Modelo Restaurado con todas las amenities',
    capacidad: 10,
    precio: 1200,
  },
  {
    imagen: '/images/fondo.png',
    modelo: 'Avioneta',
    origen: 'Buenos Aires (EZE)',
    descripcion: 'Modelo Restaurado con todas las amenities',
    capacidad: 10,
    precio: 1200,
  },
  {
    imagen: '/images/fondo.png',
    modelo: 'Jett privado',
    origen: 'Buenos Aires (EZE)',
    descripcion: 'Modelo Restaurado con todas las amenities',
    capacidad: 10,
    precio: 1200,
  },
];

export default function Publicaciones() {
  return (
    <>
      <div className={style.headMenu}>
        <h2 className={style.titulo}>Publicaciones Destacadas</h2>
        <Link to="#" className={style.botonMas}>
          Ver más
        </Link>
      </div>

      <div className={style.publicaciones}>
        {publi.map((publicacion, index) => {
          return (
            <PublicacionCard
              key={index}
              imagen={publicacion.imagen}
              modelo={publicacion.modelo}
              origen={publicacion.origen}
              descripcion={publicacion.descripcion}
              capacidad={publicacion.capacidad}
              precio={publicacion.precio}
            />
          );
        })}
      </div>
    </>
  );
}
