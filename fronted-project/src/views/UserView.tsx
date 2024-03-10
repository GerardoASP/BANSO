import React from 'react';
import CreateProject from './CreateProject';
import './UserView.css';

const UserView: React.FC = () => {
  return (
    <div className="user-view-container">
      <header className="header">
        <h1 className="title">Bienvenido a la página de usuario</h1>
      </header>
      <main className="main-content">
        <section className="section">
          <h2 className="section-title">Crear Nuevo Proyecto</h2>
          <div className="section-content">
            <CreateProject />
          </div>
        </section>
        {/* Agrega más secciones según sea necesario */}
      </main>
    </div>
  );
};

export default UserView;
