import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom"; // Importar Navigate
import PortalLayout from "../layout/PortalLayout";
import "../styles/dashboardStyles.css"; // Importar el archivo de estilos

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loggedOut, setLoggedOut] = useState(false); // Estado para controlar si el usuario cerró sesión

  useEffect(() => {
    // Simulamos la obtención del usuario después de 1 segundo
    const timer = setTimeout(() => {
      setUser({ name: "John Doe" }); // Simulamos que el usuario se obtiene correctamente
    }, 1000);

    return () => clearTimeout(timer); // Limpiamos el temporizador en el desmontaje del componente
  }, []);

  function handleLogout() {
    // Aquí iría la lógica para cerrar la sesión, como limpiar el token de autenticación, etc.
    setUser(null); // Limpiamos el estado de usuario al cerrar sesión
    setLoggedOut(true); // Cambiamos el estado para indicar que el usuario cerró sesión
  }

  // Redirigir al menú de inicio de sesión si el usuario cerró sesión
  if (loggedOut) {
    return <Navigate to="/LoginForm" />;
  }

  return (
    <PortalLayout>
      <div className="dashboard">
        <div className="user-info">
          {user && (
            <p>Bienvenido, {user.name}!</p>
          )}
          <Link to="/dashboard" className="dashboard-link">Dashboard</Link>
        </div>
        <div className="dashboard-buttons">
          <button className="profile-button">Ver Perfil de {user ? user.name : ""}</button>
          <button className="logout-button" onClick={handleLogout}>Cerrar Sesión</button>
        </div>
      </div>
    </PortalLayout>
  );
}
