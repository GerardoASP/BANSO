import React, { useState } from 'react';
import './CreateProject.css';

const CreateProject: React.FC = () => {
  const [formData, setFormData] = useState({
    projectName: '',
    description: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Datos del proyecto:', formData);
    setFormData({
      projectName: '',
      description: ''
    });
  };

  return (
    <div className="create-project-container">
      <h2 className="create-project-heading">Crear Nuevo Proyecto</h2>
      <form onSubmit={handleSubmit} className="create-project-form">
        <div className="form-group">
          <label htmlFor="projectName" className="form-label">Nombre del Proyecto</label>
          <input
            type="text"
            id="projectName"
            value={formData.projectName}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description" className="form-label">Descripción</label>
          <textarea
            id="description"
            value={formData.description}
            onChange={handleChange}
            className="form-textarea"
            required
          />
        </div>
        <button type="submit" className="btn-submit">Crear Proyecto</button>
      </form>
    </div>
  );
};

export default CreateProject;
