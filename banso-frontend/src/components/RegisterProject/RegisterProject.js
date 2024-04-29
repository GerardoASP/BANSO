import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import './RegisterProject.scss';

const CrearProyecto = () => {
  const [proyecto, setProyecto] = useState({
    nameProject: "",
    stateProject: "En formulación", // Valor por defecto
    dateStart: "",
    descriptionProject: "",
    projectSubjects:[],
    linkFrontendRepository: "",
    linkBackendRepository: "",
    linkGeneralRepository: "",
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
      const response = await fetch("http://localhost:3000/api/v1/projects/new-project", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(proyecto),
      });
      
      if (response.ok) {
        setProyecto({
          nameProject: "",
          stateProject: "En formulación",
          dateStart: "",
          descriptionProject: "",
          projectSubjects:[],
          linkFrontendRepository: "",
          linkBackendRepository: "",
          linkGeneralRepository: "",
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
        <div className="grupo-formulario">
          <label className="etiqueta">Link Repositorio 1(General) </label>
          <input
            className={`entrada-formulario ${enviado && !proyecto.linkGeneralRepository && 'error'}`}
            type="text"
            name="linkGeneralRepository"
            onChange={handleChange}
            value={proyecto.linkGeneralRepository}
            required
          />
        </div>
        <div className="grupo-formulario">
          <label className="etiqueta">Link Repositorio 2(Frontend) *</label>
          <input
            className={`entrada-formulario ${enviado && !proyecto.linkFrontendRepository && 'error'}`}
            type="text"
            name="linkFrontendRepository"
            onChange={handleChange}
            value={proyecto.linkFrontendRepository}
            required
          />
        </div>
        <div className="grupo-formulario">
          <label className="etiqueta">Link Repositorio 3(Backend) *</label>
          <input
            className={`entrada-formulario ${enviado && !proyecto.linkBackendRepository && 'error'}`}
            type="text"
            name="linkBackendRepository"
            onChange={handleChange}
            value={proyecto.linkBackendRepository}
            required
          />
        </div>
        <button className="boton-formulario">Crear Proyecto</button>
      </form>
    </div>
  );
}
export default CrearProyecto;
