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
import PublicacionDisponibilidad from './pages/publicacion/PublicacionDisponibilidad';
import SolicitudReserva from './pages/reserva/SolicitudReserva';
import AdminDashboard from './pages/admin/AdminDashboard';
import MisReservas from './pages/reserva/MisReservas';
import CrearAeropuerto from './pages/admin/CrearAeropuerto.tsx';
import GestionarAeropuertos from './pages/admin/GestionarAeropuertos';
import AeronavePage from './pages/proveedor/AeronavePage';
import CrearAeronave from './pages/proveedor/CrearAeronave';

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
            <Route
              path="publicaciones/:id/disponibilidad"
              element={<PublicacionDisponibilidad />}
            />
            <Route
              path="publicaciones/:id/reservar"
              element={<SolicitudReserva />}
            />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />

            {/* Rutas generales autenticadas */}
            <Route path="profile" element={<ProfilePage />} />
            <Route path="mis-reservas" element={<MisReservas />} />

            {/* Rutas de proveedor */}
            <Route path="proveedor">
              <Route index element={<HomeProveedor />} />
              <Route path="crear-publicacion" element={<CrearPublicacion />} />
              <Route path="aeronaves" element={<AeronavePage />} />
              <Route path="crear-aeronave" element={<CrearAeronave />} />
            </Route>
            {/* Rutas de administrador */}
            <Route path="admin">
              <Route index element={<AdminDashboard />} />
              <Route path="aeropuertos" element={<GestionarAeropuertos />} />
              <Route path="crear-aeropuerto" element={<CrearAeropuerto />} />
              <Route
                path="editar-aeropuerto/:id"
                element={<CrearAeropuerto />}
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
