import React from 'react';
import Logo from '../../assets/images/LOGO_BANSO-removebg-preview.png';
import { Link } from 'react-router-dom';
import { FaUserPlus, FaSignInAlt, FaFire } from 'react-icons/fa'; // Importamos iconos de FontAwesome
import './WelcomePage.scss';

const WelcomePage = () => {
  return (
    <div className='presentation-container'>
      <div className='section-one-presentation'>
        <div className='logo'>
          <img src={Logo} alt="Logo" className='logo-icon' />
        </div>
        <h1>Bienvenidos a BANSO</h1>
        <p>¡Desata tu potencial y domina el desarrollo con nosotros!</p>
      </div>
      <div className='section-two-presentation'>
        <div className='button-container'>
          <Link to="/register">
            <button type='submit' className='section-two-button'>
              <FaUserPlus className='icon' /> {/* Icono de registro */}
              <span>Registro</span>
            </button>
          </Link>
          <Link to="/login">
            <button type='submit' className='section-two-button'>
              <FaSignInAlt className='icon' /> {/* Icono de inicio de sesión */}
              <span>Iniciar sesión</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default WelcomePage;
