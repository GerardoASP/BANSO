import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import './RegisterProject.scss';


const paises = ["Colombia", "Argentina", "Perú", "México", "Chile"];
const departamentos = ["Caldas", "Antioquia", "Valle del Cauca", "Bogotá DC", "Santander"];
const municipios = ["Manizales", "Medellín", "Cali", "Bogotá", "Bucaramanga"];

const CrearProyecto = () => {
  const [proyecto, setProyecto] = useState({
    nombre: "",
    estado: "",
    fechaInicio: "",
    descripcion: "",
  });
  const [error, setError] = useState("");
  const [enviado, setEnviado] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProyecto({ ...proyecto, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEnviado(true);

    // Validación del formulario
    if (!proyecto.nombre || !proyecto.estado || !proyecto.fechaInicio || !proyecto.descripcion) {
      setError("Por favor completa todos los campos requeridos.");
      return;
    }

    try {
      // Aquí iría la lógica para enviar los datos del proyecto al servidor
      // Por ahora, simplemente reiniciamos el estado del proyecto
      setProyecto({
        nombre: "",
        estado: "",
        fechaInicio: "",
        descripcion: "",
      });
      setEnviado(false);
      setError("");
      <Navigate to="/" />;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="contenedor" style={{ textAlign: 'center', marginTop: '50px' }}>
      <form onSubmit={handleSubmit} className="formulario">
        <h1 className="titulo">Crear Proyecto</h1>
        {!!error && <div className="mensaje-error" style={{ color: 'red' }}>{error}</div>}
        <div className="grupo-formulario">
          <label className="etiqueta">Nombre del Proyecto *</label>
          <input
            className={`entrada-formulario ${enviado && !proyecto.nombre && 'error'}`}
            type="text"
            name="nombre"
            onChange={handleChange}
            value={proyecto.nombre}
            required
          />
        </div>
        <div className="grupo-formulario">
          <label className="etiqueta">Estado *</label>
          <input
            className={`entrada-formulario ${enviado && !proyecto.estado && 'error'}`}
            type="text"
            name="estado"
            onChange={handleChange}
            value={proyecto.estado}
            required
          />
        </div>
        <div className="grupo-formulario">
          <label className="etiqueta">Fecha de Inicio *</label>
          <input
            className={`entrada-formulario ${enviado && !proyecto.fechaInicio && 'error'}`}
            type="date"
            name="fechaInicio"
            onChange={handleChange}
            value={proyecto.fechaInicio}
            required
          />
        </div>
        <div className="grupo-formulario">
          <label className="etiqueta">Descripción *</label>
          <textarea
            className={`entrada-formulario ${enviado && !proyecto.descripcion && 'error'}`}
            name="descripcion"
            onChange={handleChange}
            value={proyecto.descripcion}
            required
          ></textarea>
        </div>
        <button className="boton-formulario">Crear Proyecto</button>
      </form>
    </div>
  );
}

export default CrearProyecto;
