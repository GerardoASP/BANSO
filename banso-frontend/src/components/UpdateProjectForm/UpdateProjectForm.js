import React, { useState } from "react";
import "./UpdateProjectForm.scss";

const projectStates = ["En formulación", "En proceso", "Finalizado", "En revisión"];

const UpdateProjectForm = () => {
  const [projectData, setProjectData] = useState({
    nameProject: "",
    state: "",
    dateStart: "",
    descriptionProject: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProjectData({ ...projectData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!projectData.nameProject || !projectData.state || !projectData.dateStart || !projectData.descriptionProject) {
      setErrorMessage("Por favor complete todos los campos.");
      return;
    }
    // Aquí puedes enviar los datos del proyecto a tu servidor o hacer lo que desees con ellos
    console.log("Datos del proyecto:", projectData);
    // Limpiar el formulario después del envío
    setProjectData({
      nameProject: "",
      state: "",
      dateStart: "",
      descriptionProject: "",
    });
    setErrorMessage("");
  };

  return (
    <div className="project-form-container">
      <form onSubmit={handleSubmit} className="project-form">
        <h2>Actualización de Proyecto</h2>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <div className="form-group">
          <label>Nombre del Proyecto</label>
          <input
            type="text"
            name="nameProject"
            value={projectData.nameProject}
            onChange={handleChange}
            placeholder="Ingrese el nombre del proyecto"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Estado del Proyecto</label>
          <select name="state" value={projectData.state} onChange={handleChange} className="form-control">
            <option value="">Seleccione el estado del proyecto</option>
            {projectStates.map((state, index) => (
              <option key={index} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Fecha de Inicio</label>
          <input type="date" name="dateStart" value={projectData.dateStart} onChange={handleChange} className="form-control" />
        </div>
        <div className="form-group">
          <label>Descripción del Proyecto</label>
          <textarea
            name="descriptionProject"
            value={projectData.descriptionProject}
            onChange={handleChange}
            placeholder="Ingrese la descripción del proyecto"
            className="form-control"
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Actualizar Proyecto</button>
      </form>
    </div>
  );
};

export default UpdateProjectForm;