import { Link } from 'react-router-dom';
import './Menu.css';

const Menu = () => {
  return (
    <nav className="menu">
      <ul className="menu-list">
        <li>
          <Link to="/">Inicio</Link>
        </li>
        <li>
          <Link to="/proyectos">Proyectos</Link>
        </li>
        <li>
          <Link to="/perfil">Perfil</Link>
        </li>
        <li>
          <Link to="/servicios">Servicios</Link>
        </li>
        <li>
          <Link to="/contacto">Contacto</Link>
        </li>
        {/* Agrega más elementos de menú según sea necesario */}
      </ul>
    </nav>
  );
};

export default Menu;