import React from 'react';
import Logo from '../../assets/images/LOGO_BANSO_AL-removebg-preview.png';
import { Link } from 'react-router-dom';
import { Navigate } from "react-router-dom";
import AsyncStorage from "@react-native-async-storage/async-storage";
import "./DashBoardPage.scss";

const Dashboard = () => {
  const logout = async () => {
    await AsyncStorage.removeItem("access");
    await AsyncStorage.removeItem("refresh");
    window.location.href = "/";
  };

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
            <button type='button' className='section-two-button-one'>
              <span>Lista Usuarios</span>
            </button>
          </Link>
          <Link to="/profile">
            <button type='button' className='section-two-button-two'>
              <span>Perfil</span>
            </button>
          </Link>
          <Link to="/register-project">
            <button type='button' className='section-two-button-two'>
              <span>Crear Proyecto</span>
            </button>
          </Link>
          <Link to="/projects">
            <button type='button' className='section-two-button-two'>
              <span>Lista proyectos</span>
            </button>
          </Link>
          <Link to="/filter-project">
            <button type='button' className='section-two-button-two'>
              <span>Filtro de proyectos</span>
            </button>
          </Link>
          <button type='button' className='section-two-button-two' onClick={logout}>
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Dashboard;
