import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import './RegisterProject.scss';

const CrearProyecto = () => {
  const [proyecto, setProyecto] = useState({
    nameProject: "",
    state: "",
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
    //setEnviado(true);

    // Validación del formulario
    if (!proyecto.nameProject || !proyecto.state || !proyecto.dateStart || !proyecto.descriptionProject) {
      setError("Por favor completa todos los campos requeridos.");
      return;
    }

    try {
      // Aquí iría la lógica para enviar los datos del proyecto al servidor
      // Por ahora, simplemente reiniciamos el estado del proyecto
      const response = await fetch("http://localhost:3000/api/v1/projects/new-project", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(proyecto),
      });
      console.log(proyecto);
      if (response.ok) {
        const json = await response.json();
        setProyecto({
          nameProject: "",
          state: "",
          dateStart: "",
          descriptionProject: ""
        });
        console.log("Felicidades Creaste un proyecto")
      } else {
        const json = await response.json();
        setError(json.body.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="contenedor" style={{ textAlign: 'center', marginTop: '50px' }}>
      <form onSubmit={handleSubmit} className="formulario">
        <h1 className="titulo">Crear Proyecto</h1>
        {!!error && <div className="mensaje-error" style={{ color: 'red' }}>{error}</div>}
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
          <input
            className={`entrada-formulario ${enviado && !proyecto.state && 'error'}`}
            type="text"
            name="state"
            onChange={handleChange}
            value={proyecto.state}
            required
          />
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
