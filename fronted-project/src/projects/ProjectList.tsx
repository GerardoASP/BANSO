// src/components/ProjectList.tsx

import React from 'react';
import './ProjectList.css';

interface Project {
  id: number;
  name: string;
  description: string;
  // Agrega más propiedades según sea necesario
}

interface ProjectListProps {
  projects: Project[];
}

const ProjectList: React.FC<ProjectListProps> = ({ projects }) => {
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
              {/* Agrega más información del proyecto según sea necesario */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProjectList;
