import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./RegisterForm.scss";

const departments = [
  "Ingeniería de Sistemas",
  "Ingeniería Mecánica",
  "Ingeniería Biomédica",
  "Ingeniería Industrial",
];

const RegisterForm = () => {
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    department: "",
    email: "",
    password: "",
  });
  const [errorResponse, setErrorResponse] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Usuario registrado:", user);
    } catch (error) {
      console.error("Error al registrar usuario:", error);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form-container">
        <h1 className="form-title">Registro</h1>
        {!!errorResponse && <div className="error-message">{errorResponse}</div>}
        <input
          className="form-input"
          type="text"
          name="firstname"
          placeholder="Nombres"
          onChange={handleChange}
          value={user.firstname}
          required
        />
        <input
          className="form-input"
          type="text"
          name="lastname"
          placeholder="Apellidos"
          onChange={handleChange}
          value={user.lastname}
          required
        />
        <div className="select-container">
          <select
            className="form-input"
            name="department"
            onChange={handleChange}
            value={user.department}
            required
          >
            <option value="">Selecciona una carrera</option>
            {departments.map((department, index) => (
              <option key={index} value={department}>
                {department}
              </option>
            ))}
          </select>
        </div>
        <input
          className="form-input"
          type="email"
          name="email"
          placeholder="Correo electrónico"
          onChange={handleChange}
          value={user.email}
          required
        />
        <input
          className="form-input"
          type="password"
          name="password"
          placeholder="Contraseña"
          onChange={handleChange}
          value={user.password}
          required
        />
        <button className="form-button">Crear cuenta</button>
        <p className="form-link">
          ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;
