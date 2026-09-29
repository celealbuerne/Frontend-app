import { Link, Outlet } from 'react-router-dom';
import logo from '../assets/logo.png';
import Navbar from '../components/header/Navbar';
import style from './MainLayout.module.css';
import MainFooter from '../components/footer/MainFooter';

export default function MainLayout() {
  return (
    <>
      <header>
        <div className={style.mainLogo}>
          <Link to="/">
            <img id="logo" src={logo} alt="Logo" />
            <h2>AeroLux</h2>
          </Link>
        </div>
        <Navbar />
      </header>
      <Outlet />
      <footer>
        <MainFooter></MainFooter>
      </footer>
    </>
  );
}
