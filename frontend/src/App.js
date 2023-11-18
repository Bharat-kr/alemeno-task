import styles from './App.module.scss';
import AuthProvider from './context/AuthContext';
import RoleRoutes from './rbac/RoleRoutes';

function App() {
  return (
    <AuthProvider>
      <div className={styles.app}>
        <RoleRoutes />
      </div>
    </AuthProvider>
  );
}

export default App;
