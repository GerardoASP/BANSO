import React, { useState, useEffect } from 'react';
import './ProjectList.css';

interface Project {
  id: number;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  status: string;
  // Agrega más propiedades según sea necesario
}

const ProjectList: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('https://api.example.com/projects');
        if (response.ok) {
          const data = await response.json();
          setProjects(data);
        } else {
          console.error('Error al obtener la lista de proyectos');
        }
      } catch (error) {
        console.error('Error al conectar con el backend', error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="project-list-container">
      <h2>Lista de Proyectos</h2>
      {projects.length === 0 ? (
        <p>No hay proyectos disponibles.</p>
      ) : (
        <ul>
          {projects.map(project => (
            <li key={project.id}>
              <h3>{project.name}</h3>
              <p>{project.description}</p>
              <p><strong>Inicio:</strong> {project.startDate}</p>
              <p><strong>Fin:</strong> {project.endDate}</p>
              <p><strong>Estado:</strong> {project.status}</p>
              {/* Agrega más información del proyecto según sea necesario */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProjectList;