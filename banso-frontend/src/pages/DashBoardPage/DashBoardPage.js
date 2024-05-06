// DashboardPage.js
import React, { useEffect, useState } from 'react';
import Logo from '../../assets/images/LOGO_BANSO_AL-removebg-preview.png';
import { Link } from 'react-router-dom';
import { FiUser, FiHome, FiSettings, FiHelpCircle, FiMail, FiCalendar, FiSearch, FiPlus, FiLogOut } from 'react-icons/fi';
import "./DashBoardPage.scss";
import AsyncStorage from "@react-native-async-storage/async-storage";

const DashboardPage = () => {
  const [publications, setPublications] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/api/v1/publications`)
      .then(response => response.json())
      .then(data => setPublications(data))
      .catch(error => console.error('Error fetching publications:', error));
  }, []);

  const logout = async () => {
    try {
      // Borra los datos de sesión al cerrar sesión
      await AsyncStorage.removeItem("access");
      await AsyncStorage.removeItem("refresh");
      await AsyncStorage.removeItem("verifyCode");
      window.location.href = "/"; // Redirige al usuario a la página de inicio al cerrar sesión
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <div className='dashboard-container'>
      <div className='sidebar'>
        <div className='logo-container'>
          <img src={Logo} alt="Logo" className='logo'/>
          <h1>BANSO</h1>
        </div>
        <div className='nav-links'>
          <Link to="/dashboard" className='nav-link'><FiHome className='nav-icon'/>Inicio</Link>
          <Link to="/profile" className='nav-link'><FiUser className='nav-icon'/>Perfil</Link>
          <Link to="/register-project" className='nav-link'><FiPlus className='nav-icon'/>Crear Proyecto</Link>
          <Link to="/projects" className='nav-link'><FiSearch className='nav-icon'/>Ver Proyectos</Link>
          <Link to="/register-publication" className='nav-link'><FiPlus className='nav-icon'/>Crear Publicacion</Link>
          <Link to="/help" className='nav-link'><FiHelpCircle className='nav-icon'/>Ayuda</Link>
          <Link to="/messages" className='nav-link'><FiMail className='nav-icon'/>Mensajes</Link>
          <Link to="/calendar" className='nav-link'><FiCalendar className='nav-icon'/>Calendario</Link>
          <Link to="/users" className='nav-link'><FiUser className='nav-icon'/>Lista de Usuarios</Link>
        </div>
        <button className='logout-button' onClick={logout}><FiLogOut className='nav-icon'/>Cerrar Sesión</button>
      </div>
      <div className='main-content'>
        <h1>Bienvenido a tu Dashboard</h1>
        <p>Explora las opciones disponibles en el menú lateral para acceder a diferentes secciones y funcionalidades.</p>
        <Link to="/create-publication" className='create-publication-button'>
          <FiPlus className='create-icon' />
        </Link>
        <div className='projects-container'>
          <h2>Publicaciones Recientes</h2>
          {Array.isArray(publications) && publications.map(project => (
    <div className='project-card' key={project.id}>
        <img src={`https://via.placeholder.com/150?text=${project.name}`} alt={project.name} />
        <div className='project-details'>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <p>{"Para más información enviar mensaje a : " + project.contact}</p>
        </div>
    </div>
))}
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
