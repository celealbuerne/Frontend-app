import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import { AuthProvider } from './contexts/auth.context';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import HomeProveedor from './pages/proveedor/HomeProveedor';
import CrearPublicacion from './pages/proveedor/CrearPublicacion';
import PublicacionHome from './pages/publicacion/PublicacionHome';
import PublicacionDetalle from './pages/publicacion/PublicacionDetalle';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            {/* Rutas públicas */}
            <Route index element={<HomePage />} />
            <Route path="publicaciones" element={<PublicacionHome />} />
            <Route path="publicaciones/:id" element={<PublicacionDetalle />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />

            {/* Rutas generales autenticadas */}
            <Route path="profile" element={<ProfilePage />} />

            {/* Rutas de proveedor */}
            <Route path="proveedor">
              <Route index element={<HomeProveedor />} />
              <Route path="crear-publicacion" element={<CrearPublicacion />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
