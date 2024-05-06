import React, { useState } from "react";

import { Navigate } from "react-router-dom";
import './LoginForm.scss';


export default function Login() {
  
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [errorResponse, setErrorResponse] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const homeUser = () =>{
    console.log('Di click en homeUser');
    window.location.href = '/dashboard';
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://bansobackend-production.up.railway.app/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      if (response.ok) {
        const json = await response.json();
        console.log(json.verifyCodeI);
        // Guardar el token en localStorage
        localStorage.setItem('verifyCode', json.verifyCodeI);
        setUser({
          email: "",
          password: "",
        });
        console.log("Felicidades Iniciaste Sesión")
        homeUser()
      } else {
        console.log("No se puede iniciar sesión")
        const json = await response.json();
        setErrorResponse(json.body.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
      <div className="container">
        <form className="login-form">
          <h1 className="form-title">Iniciar Sesión</h1>
          {!!errorResponse && <div className="error-message">{errorResponse}</div>}
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              className="form-input"
              name="email"
              type="text"
              onChange={handleChange}
              value={user.email}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Contraseña</label>
            <div className="password-input">
              <input
                className="form-input"
                type={showPassword ? "text" : "password"}
                name="password"
                onChange={handleChange}
                value={user.password}
                required
              />
              <i className={`password-toggle-icon ${showPassword ? "fa fa-eye-slash" : "fa fa-eye"}`}
                onClick={() => setShowPassword(!showPassword)}
              />
            </div>
          </div>
          <button className="form-button" onClick={handleLogin} type="submit">Iniciar Sesión</button>
        </form>
      </div>
  );
}
