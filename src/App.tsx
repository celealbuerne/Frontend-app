import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import { AuthProvider } from './contexts/auth.context';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage.tsx';
import HomeProveedor from './pages/proveedor/HomeProveedor';
import CrearPublicacion from './pages/proveedor/CrearPublicacion';


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />}></Route>
            <Route path="/login" element={<LoginPage />}></Route>
            <Route path="/register" element={<RegisterPage />}></Route>
            <Route path="/profile" element={<ProfilePage />}></Route>
            <Route path="/proveedor" element={<HomeProveedor />} />
            <Route path="/proveedor/crear-publicacion" element={<CrearPublicacion/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
