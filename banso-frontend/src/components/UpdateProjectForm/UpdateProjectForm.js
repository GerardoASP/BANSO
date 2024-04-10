import React, { useEffect, useState } from "react";
import "./UpdateProjectForm.scss";
import { useLocation } from "react-router-dom";
const projectStates = ["En formulación", "En proceso", "Finalizado", "En revisión"];

const UpdateProjectForm = () => {
  const location = useLocation();
  const [myQueryParam,setMyQueryParam] = useState('');
  useEffect(() => {
    // Parse the query parameters from the search string
    const params = new URLSearchParams(location.search);
    
    // Get the value of the query parameter you're interested in
    const myQueryParam = params.get('id');
    setMyQueryParam(myQueryParam);
    // Do something with the query parameter value
    console.log('My query parameter value:', myQueryParam);
  }, [location]);

  const [projectData, setProjectData] = useState({
    nameProject: "",
    stateProject: "",
    dateStart: "",
    descriptionProject: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProjectData({ ...projectData, [name]: value });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setErrorMessage("");

    // Validación del formulario
    if (!projectData.nameProject || !projectData.stateProject || !projectData.dateStart || !projectData.descriptionProject) {
      setErrorMessage("Por favor complete todos los campos.");
      return;
    }

    try {
      const response = await fetch(`https://bansobackend-production.up.railway.app/api/v1/projects/update-project/${myQueryParam}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(projectData),
      });
      
      if (response.ok) {
        const json = await response.json();
        setProjectData({
          nameProject: "",
          stateProject: "",
          dateStart: "",
          descriptionProject: ""
        });
        console.log("Felicidades, has actualizado un proyecto.");
      } else {
        const json = await response.json();
        setErrorMessage(json.body.error);
      }
    } catch (error) {
      console.log(error);
    }
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
          <select name="stateProject" value={projectData.stateProject} onChange={handleChange} className="form-control">
            <option value="">Seleccione el estado del proyecto</option>
            {projectStates.map((stateProject, index) => (
              <option key={index} value={stateProject}>
                {stateProject}
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
