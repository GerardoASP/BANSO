import React from 'react';
import Logo from '../../assets/images/logo_banso.png';
import "./DashBoardPage.scss";
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className='presentation-container'>
      <div className='section-one-presentation'>
        <img src={Logo} alt="Logo" className='image-section-one'/>
        <div className='text-section-one'>
          <h1>Dashboard</h1>
        </div>
      </div>
      <div className='section-two-presentation'>
        <div className='button-container'>
          <Link to="/users">
            <button type='submit' className='section-two-button-one'>
              <span>Lista Usuarios</span>
            </button>
          </Link>
          <Link to="/profile">
            <button type='submit' className='section-two-button-two'>
              <span>Perfil</span>
            </button>
          </Link>
          <Link to="/register-project">
            <button type='submit' className='section-two-button-two'>
              <span>Crear Proyecto</span>
            </button>
          </Link>
          <Link to="/projects">
            <button type='submit' className='section-two-button-two'>
              <span>Lista proyectos</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Dashboard;