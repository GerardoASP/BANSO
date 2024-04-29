import React, { useEffect, useState } from 'react';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import GitHubIcon from '@mui/icons-material/GitHub';
import './ListProjectPage.scss';

const ListProjectPage = () => {
  // Definir el estado para almacenar la lista de proyectos
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [projectsPerPage] = useState(5); // Define la cantidad de proyectos por página

  // Simular una llamada a una API para obtener los proyectos
  useEffect(() => {
    fetch('https://bansobackend-production.up.railway.app/api/v1/projects')
      .then(response => response.json())
      .then(data => setProjects(data));
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reiniciar la página actual al buscar
  };

  const filteredProjects = projects.filter(project => {
    return project.nameProject.toLowerCase().includes(searchTerm.toLowerCase()) ||
           project.descriptionProject.toLowerCase().includes(searchTerm.toLowerCase()) ||
           project.stateProject.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const UpdateFormProject = (_id) => {
    console.log('Di click en UpdateFormProject');
    window.location.href = `/update-project?id=${_id}`;
  }

  const handleUpdate = (_id) => {
    const projectId = _id;
    UpdateFormProject(projectId);
    console.log(projectId);
  }

  async function handleDelete(_id) {
    try {
      const response = await fetch(`http://localhost:3000/api/v1/projects/${_id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
      });
      if (response.status === 204) {
        console.log("Se pudo");
      } else {
        console.log("No se pudo");
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleButtonClick = (github_url) => {
    window.open(`${github_url}`, '_blank');
  };

  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className='projects-view'>
      <h2>Lista de Proyectos</h2>
      <div className="buscar">
        <input 
          type="text" 
          placeholder="Buscar" 
          value={searchTerm}
          onChange={handleSearch} 
        />
        <div className="btn">
          <SearchIcon className="icon" />
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>Nombre Proyecto</th>
            <th>Descripción Proyecto</th>
            <th>Estado Proyecto</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {currentProjects && currentProjects.length > 0 ? (
            currentProjects.map((project) => (
              <tr key={project._id}>
                <td>{project.nameProject}</td>
                <td>{project.descriptionProject}</td>
                <td>{project.stateProject}</td>
                <td>
                  <IconButton onClick={() => handleUpdate(project._id)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(project._id)}>
                    <DeleteIcon />
                  </IconButton>
                  <IconButton>
                    <GitHubIcon onClick={()=>handleButtonClick(project.linkGeneralRepository)} />
                  </IconButton>
                  <IconButton>
                    <GitHubIcon onClick={()=>handleButtonClick(project.linkFrontendRepository)}/>
                  </IconButton>
                  <IconButton>
                    <GitHubIcon onClick={()=>handleButtonClick(project.linkBackendRepository)}/>
                  </IconButton>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No hay proyectos en la base de datos</td>
            </tr>
          )}
        </tbody>
      </table>
      {/* Paginación */}
      <div className="pagination">
        {filteredProjects.length > projectsPerPage && (
          <ul>
            {Array.from({ length: Math.ceil(filteredProjects.length / projectsPerPage) }).map((_, index) => (
              <li key={index}>
                <button onClick={() => paginate(index + 1)}>{index + 1}</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default ListProjectPage;
