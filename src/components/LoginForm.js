import React, { useState } from "react";
import DefaultLayout from "../layout/DefaultLayout";
import { Navigate } from "react-router-dom";
import '../styles/loginFormStyles.css';


export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorResponse, setErrorResponse] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      // Aquí iría la lógica de autenticación
      // Simplemente establecemos isAuthenticated en true para simular una autenticación exitosa
      setIsAuthenticated(true);
    } catch (error) {
      console.log(error);
      setErrorResponse("Error de autenticación");
    }
  }

  if (isAuthenticated) {
    // Redirigir al usuario si está autenticado
    return <Navigate to="/dashboard" />;
  }

  return (
    <DefaultLayout>
      <div className="container">
        <form onSubmit={handleSubmit} className="login-form">
          <h1 className="form-title">Iniciar Sesión</h1>
          {!!errorResponse && <div className="error-message">{errorResponse}</div>}
          <div className="form-group">
            <label className="form-label">Usuario</label>
            <input
              className="form-input"
              name="username"
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Contraseña</label>
            <div className="password-input">
              <input
                className="form-input"
                type={showPassword ? "text" : "password"}
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <i className={`password-toggle-icon ${showPassword ? "fa fa-eye-slash" : "fa fa-eye"}`}
                onClick={() => setShowPassword(!showPassword)}
              />
            </div>
          </div>
          <button className="form-button" type="submit">Iniciar Sesión</button>
        </form>
      </div>
    </DefaultLayout>
  );
}
