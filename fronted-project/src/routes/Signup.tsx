import React, { useState } from "react";
import DefaultLayout from "../layout/DefaultLayout";
import { useAuth } from "../auth/AuthProvider";
import { Navigate } from "react-router-dom";
import { AuthResponse, AuthResponseError } from "../types/types";
import "./Signup.css"; // Importar el archivo CSS


export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorResponse, setErrorResponse] = useState("");

  const auth = useAuth();

  function handleChange(e: React.ChangeEvent) {
    const { name, value } = e.target as HTMLInputElement;
    if (name === "username") {
      setUsername(value);
    }
    if (name === "password") {
      setPassword(value);
    }
    if (name === "name") {
      setName(value);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, name }),
      });
      if (response.ok) {
        const json = (await response.json()) as AuthResponse;
        console.log(json);

        setUsername("");
        setPassword("");
        setName("");
        // Redirigir al usuario a la página de inicio después del registro exitoso
        <Navigate to="/" /> // Utiliza la función navigate para redirigir a la página de inicio
      } else {
        const json = (await response.json()) as AuthResponseError;

        setErrorResponse(json.body.error);
      }
    } catch (error) {
      console.log(error);
    }
  }

  if (auth.isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <DefaultLayout>
      <form onSubmit={handleSubmit} className="form-container">
        <h1 className="form-title">Signup</h1>
        {!!errorResponse && <div className="error-message">{errorResponse}</div>}
        <label className="form-label">Name</label>
        <input
          className="form-input"
          name="name"
          type="text"
          onChange={handleChange}
          value={name}
        />
        <label className="form-label">Username</label>
        <input
          className="form-input"
          type="text"
          name="username"
          onChange={handleChange}
          value={username}
        />
        <label className="form-label">Password</label>
        <input
          className="form-input"
          type="password"
          name="password"
          onChange={handleChange}
          value={password}
        />

        <button className="form-button">Create account</button>
      </form>
    </DefaultLayout>
  );
}