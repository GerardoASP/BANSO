import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import './RegisterProject.scss';

const CrearProyecto = () => {
  const [proyecto, setProyecto] = useState({
    nameProject: "",
    stateProject: "En formulación", // Valor por defecto
    dateStart: "",
    descriptionProject: "",
  });
  const [error, setError] = useState("");
  const [enviado, setEnviado] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProyecto({ ...proyecto, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEnviado(true);

    // Validación del formulario
    if (!proyecto.nameProject || !proyecto.dateStart || !proyecto.descriptionProject) {
      setError("Por favor completa todos los campos requeridos.");
      return;
    }

    try {
      const response = await fetch("https://bansobackend-production.up.railway.app/api/v1/projects/new-project", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(proyecto),
      });
      
      if (response.ok) {
        setProyecto({
          nameProject: "",
          stateProject: "En formulación",
          dateStart: "",
          descriptionProject: ""
        });
        alert("¡Felicidades! Has creado un nuevo proyecto.");
      } else {
        const json = await response.json();
        setError(json.body.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="contenedor">
      <form onSubmit={handleSubmit} className="formulario">
        <h1 className="titulo">Crear Proyecto</h1>
        {!!error && <div className="mensaje-error">{error}</div>}
        <div className="grupo-formulario">
          <label className="etiqueta">Nombre del Proyecto *</label>
          <input
            className={`entrada-formulario ${enviado && !proyecto.nameProject && 'error'}`}
            type="text"
            name="nameProject"
            onChange={handleChange}
            value={proyecto.nameProject}
            required
          />
        </div>
        <div className="grupo-formulario">
          <label className="etiqueta">Estado *</label>
          <select
            className={`entrada-formulario ${enviado && !proyecto.stateProject && 'error'}`}
            name="stateProject"
            onChange={handleChange}
            value={proyecto.stateProject}
            required
          >
            <option value="En formulación">En formulación</option>
            <option value="En proceso">En proceso</option>
            <option value="Finalizado">Finalizado</option>
            <option value="En revisión">En revisión</option>
          </select>
        </div>
        <div className="grupo-formulario">
          <label className="etiqueta">Fecha de Inicio *</label>
          <input
            className={`entrada-formulario ${enviado && !proyecto.dateStart && 'error'}`}
            type="date"
            name="dateStart"
            onChange={handleChange}
            value={proyecto.dateStart}
            required
          />
        </div>
        <div className="grupo-formulario">
          <label className="etiqueta">Descripción *</label>
          <textarea
            className={`entrada-formulario ${enviado && !proyecto.descriptionProject && 'error'}`}
            name="descriptionProject"
            onChange={handleChange}
            value={proyecto.descriptionProject}
            required
          ></textarea>
        </div>
        <button className="boton-formulario">Crear Proyecto</button>
      </form>
    </div>
  );
}
export default CrearProyecto;
