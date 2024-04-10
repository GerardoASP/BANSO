import React, { useEffect, useState } from 'react';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import './ListProjectPage.scss';

const ListProjectPage = () => {
  // Definir el estado para almacenar la lista de proyectos
  const [projects, setProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [projectsPerPage] = useState(5); // Define la cantidad de proyectos por página

  // Simular una llamada a una API para obtener los proyectos
  useEffect(() => {
    fetch('https://bansobackend-production.up.railway.app/api/v1/projects')
      .then(response => response.json())
      .then(data => setProjects(data));
  }, []);

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

  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className='projects-view'>
      <h2>Lista de Proyectos</h2>
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
        {projects.length > projectsPerPage && (
          <ul>
            {Array.from({ length: Math.ceil(projects.length / projectsPerPage) }).map((_, index) => (
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
