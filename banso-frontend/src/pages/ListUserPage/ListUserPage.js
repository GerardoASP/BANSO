import React, { useEffect, useState } from 'react'
import './ListUserPage.scss'

const ListUserPage = () => {
  // Definir el estado para almacenar la lista de usuarios
  const [users, setUsers] = useState([]);

  // Simular una llamada a una API para obtener los usuarios
  useEffect(() => {
    fetch('https://bansobackend-production.up.railway.app/api/v1/users')
      .then(response => response.json())
      .then(data => setUsers(data));
  }, []);

  return (
    <div className='users-view'>
      <h2>Lista de Usuarios</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users && users.length > 0 ? (
          users.map((character) => (
	<tr key={character._id}>
              <td>{character._id}</td>
              <td>{character.firstname}</td>
              <td>{character.email}</td>
            </tr>
))
          ) : (
            <p>No hay usuarios en la base de datos</p>
          )
        }
        </tbody>
      </table>
    </div>
  )
}

export default ListUserPage
