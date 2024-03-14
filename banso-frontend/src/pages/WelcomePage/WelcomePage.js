import React from 'react';
import Logo from '../../assets/images/logo_banso.png';
import LogoRegister from '../../assets/images/image_register.jpg';
import LogoLogin from '../../assets/images/image_login.jpg';
import "./WelcomePage.scss";
import { Link } from 'react-router-dom';

const WelcomePage = () => {
  return (
    <div className='presentation-container'>
      <div className='section-one-presentation'>
        <img src={Logo} alt="Logo" className='image-section-one'/>
        <div className='text-section-one'>
          <h1>Bienvenidos</h1>
          <p>¡Explora nuestro servicio!</p>
        </div>
      </div>
      <div className='section-two-presentation'>
        <div className='button-container'>
          <Link to="/register">
            <button type='submit' className='section-two-button-one'>
              <img src={LogoRegister} alt="Register" className='image-section-two'/>
              <span>Registro</span>
            </button>
          </Link>
          <Link to="/login">
            <button type='submit' className='section-two-button-two'>
              <img src={LogoLogin} alt="Login" className='image-section-three'/>
              <span>Iniciar sesión</span>
            </button>
          </Link>
          
        </div>
      </div>
    </div>
  )
}

export default WelcomePage;
