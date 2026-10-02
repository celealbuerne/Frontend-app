import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import { useAuth } from '../contexts/auth.context';
import style from './ProfilePage.module.css';

// TEMPORAL
export default function ProfilePage() {
  const { currentUser, logoutUser } = useAuth();
  const navigate = useNavigate();

  return (
    <main className={style.container}>
      <section className={style.card}>
        <h1 className={style.title}>Perfil</h1>

        {currentUser ? (
          <div className={style.infoGrid}>
            <div className={style.infoItem}>
              <span className={style.label}>Nombre completo</span>
              <div className={style.value}>{currentUser.nombre || '-'}</div>
            </div>

            <div className={style.infoItem}>
              <span className={style.label}>Usuario / Correo</span>
              <div className={style.value}>
                {currentUser.nombreUsuario || '-'}
              </div>
            </div>

            <div className={style.infoItem}>
              <span className={style.label}>Tipo de documento</span>
              <div className={style.value}>
                {currentUser.tipoDocumento || '-'}
              </div>
            </div>

            <div className={style.infoItem}>
              <span className={style.label}>Número de documento</span>
              <div className={style.value}>{currentUser.documento || '-'}</div>
            </div>

            <div className={style.infoItem}>
              <span className={style.label}>País</span>
              <div className={style.value}>{currentUser.pais || '-'}</div>
            </div>

            <div className={style.infoItem}>
              <span className={style.label}>Fecha de nacimiento</span>
              <div className={style.value}>
                {currentUser.fechaNacimiento || '-'}
              </div>
            </div>

            {currentUser.roles && currentUser.roles.length > 0 && (
              <div className={style.infoItem}>
                <span className={style.label}>Rol</span>
                <div className={style.value}>
                  {currentUser.roles.join(', ')}
                </div>
              </div>
            )}

            {currentUser.estado && (
              <div className={style.infoItem}>
                <span className={style.label}>Estado</span>
                <div className={style.value}>{currentUser.estado}</div>
              </div>
            )}
          </div>
        ) : (
          <p className={style.noUser}>
            No hay información de sesión disponible.
          </p>
        )}

        <div className={style.actions}>
          <Button
            type="button"
            variant="primary"
            onClick={() => {
              logoutUser();
              navigate('/', { replace: true });
            }}
          >
            Cerrar Sesión
          </Button>
        </div>
      </section>
    </main>
  );
}
