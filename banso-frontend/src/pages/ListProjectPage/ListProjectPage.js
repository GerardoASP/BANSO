import React, { useEffect, useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const ListProjectPage = () => {
  // Definir el estado para almacenar la lista de usuarios
  const [projects, setProjects] = useState([]);
  // Simular una llamada a una API para obtener los usuarios
  useEffect(() => {
    fetch('https://bansobackend-production.up.railway.app/api/v1/projects')
      .then(response => response.json())
      .then(data => setProjects(data));
  }, []);

  const handleUpdate = (_id) =>{

  }

  async function handleDelete(_id){
    try {
        const response = await fetch(`http://localhost:3000/api/v1/projects/${_id}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" }
        });
        if(response.status == 204){
          console.log("Se pudo")
        }else{
          console.log("No se pudo")
        }
    }catch(error){
      console.log(error);
    }
  }
  return (
    <div className='projects-view'>
      <h2>Lista de Proyectos</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre Proyecto</th>
            <th>Descripción Proyecto</th>
            <th>Boton Actualizar</th>
            <th>Boton Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {projects && projects.length > 0 ? (
          projects.map((character) => (
	<tr key={character._id}>
              <td>{character._id}</td>
              <td>{character.nameProject}</td>
              <td>{character.descriptionProject}</td>
              <td>
                <button>
                    <EditIcon />
                </button>
              </td>
              <td>
              <button onClick={() => handleDelete(character._id)}>
                <DeleteIcon />
              </button>
              </td>
            </tr>
))
          ) : (
            <p>No hay proyectos en la base de datos</p>
          )
        }
        </tbody>
      </table>
    </div>
  )
}

export default ListProjectPage
