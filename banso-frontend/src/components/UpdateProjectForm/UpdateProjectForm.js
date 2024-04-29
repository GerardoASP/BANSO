import React, { useEffect, useState } from "react";
import "./UpdateProjectForm.scss";
import { useLocation } from "react-router-dom";
const projectStates = ["En formulación", "En proceso", "Finalizado", "En revisión"];

const UpdateProjectForm = () => {
  const location = useLocation();
  const [myQueryParam,setMyQueryParam] = useState('');
  const [project,setProject] = useState('');

  useEffect(() => {
    // Parse the query parameters from the search string
    const params = new URLSearchParams(location.search);
    
    // Get the value of the query parameter you're interested in
    const myQueryParam = params.get('id');
    setMyQueryParam(myQueryParam);
    // Do something with the query parameter value
    console.log('My query parameter value:', myQueryParam);
  }, [location]);

  useEffect(()=>{
    const params = new URLSearchParams(location.search);
    // Get the value of the query parameter you're interested in
    const myQueryParam = params.get('id');
    setMyQueryParam(myQueryParam);
    fetch(`http://localhost:3000/api/v1/projects/${myQueryParam}`)
      .then(response => response.json())
      .then(data => setProject(data));
    console.log(project.nameProject)
  },[])

  const [projectData, setProjectData] = useState({
    nameProject: "",
    stateProject: "",
    dateStart: "",
    descriptionProject: "",
    linkFrontendRepository: "",
    linkBackendRepository: "",
    linkGeneralRepository: "",
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
      const response = await fetch(`http://localhost:3000/api/v1/projects/update-project/${myQueryParam}`, {
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
          descriptionProject: "",
          linkFrontendRepository: "",
          linkBackendRepository: "",
          linkGeneralRepository: "",
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
            placeholder={project.nameProject}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Estado del Proyecto</label>
          <select name="stateProject" value={projectData.stateProject} onChange={handleChange} className="form-control">
            <option value="" >{project.stateProject}</option>
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
            placeholder={project.descriptionProject}
            className="form-control"
          ></textarea>
        </div>
        <div className="form-group">
          <label>Link Repositorio 1(General)</label>
          <input
            type="text"
            name="linkGeneralRepository"
            value={projectData.linkGeneralRepository}
            onChange={handleChange}
            placeholder={project.linkGeneralRepository}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Link Repositorio 2(Backend)</label>
          <input
            type="text"
            name="linkBackendRepository"
            value={projectData.linkBackendRepository}
            onChange={handleChange}
            placeholder={project.linkBackendRepository}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Link Repositorio 3(Frontend)</label>
          <input
            type="text"
            name="linkFrontendRepository"
            value={projectData.linkFrontendRepository}
            onChange={handleChange}
            placeholder={project.linkFrontendRepository}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">Actualizar Proyecto</button>
      </form>
    </div>
  );
};

export default UpdateProjectForm;
