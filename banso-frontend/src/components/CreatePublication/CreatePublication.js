// CreatePublication.js
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './CreatePublication.scss';

const CreatePublication = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes enviar los datos del formulario a tu servidor
    // por ejemplo, utilizando fetch() o axios.
    // Después de enviar los datos, puedes redirigir al usuario a la página de dashboard.
    // Aquí redirigimos al usuario a '/dashboard' después de enviar el formulario.
    history.push('/dashboard');
  };

  return (
    <div className="create-publication">
      <h2>Crear Publicación</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Título:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Descripción:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit">Crear</button>
      </form>
    </div>
  );
}

export default CreatePublication;
