import React, { useState } from "react";
import DefaultLayout from "../layout/DefaultLayout";
import { useAuth } from "../auth/AuthProvider.js";
import { Navigate } from "react-router-dom";
import { AuthResponse, AuthResponseError } from "../types/types";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorResponse, setErrorResponse] = useState("");

  const auth = useAuth();

  function handleChange(e) {
    const { name, value } = e.target;
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

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, name }),
      });
      if (response.ok) {
        const json = await response.json();
        setUsername("");
        setPassword("");
        setName("");
        <Navigate to="/" />;
      } else {
        const json = await response.json();
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
      <div className="container" style={{ textAlign: 'center', marginTop: '50px' }}>
        <form onSubmit={handleSubmit} className="form-container">
          <h1 className="form-title">Signup</h1>
          {!!errorResponse && <div className="error-message" style={{ color: 'red' }}>{errorResponse}</div>}
          <label className="form-label">Name</label>
          <input
            className="form-input"
            name="name"
            type="text"
            onChange={handleChange}
            value={name}
            style={{ marginBottom: '10px', padding: '5px' }}
          />
          <label className="form-label">Username</label>
          <input
            className="form-input"
            type="text"
            name="username"
            onChange={handleChange}
            value={username}
            style={{ marginBottom: '10px', padding: '5px' }}
          />
          <label className="form-label">Password</label>
          <input
            className="form-input"
            type="password"
            name="password"
            onChange={handleChange}
            value={password}
            style={{ marginBottom: '10px', padding: '5px' }}
          />
          <button className="form-button" style={{ backgroundColor: '#4CAF50', color: 'white', padding: '10px 20px', borderRadius: '5px', border: 'none', cursor: 'pointer' }}>Create account</button>
        </form>
      </div>
    </DefaultLayout>
  );
}
