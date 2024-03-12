import { API_URL } from "../auth/authConstants";


export async function fetchWithAuth(url, options) {
  const response = await fetch(`${API_URL}${url}`, options);
  return response;
}

export async function getTodos() {
  try {
    const response = await fetchWithAuth("/todos", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const todos = await response.json();
      return todos;
    } else {
      throw new Error("Error al obtener los todos");
    }
  } catch (error) {
    console.error("Error en la solicitud de obtener los todos:", error);
    throw error;
  }
}

export async function createTodo(todoData) {
  try {
    const response = await fetchWithAuth("/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todoData),
    });

    if (response.ok) {
      const newTodo = await response.json();
      return newTodo;
    } else {
      throw new Error("Error al crear el todo");
    }
  } catch (error) {
    console.error("Error en la solicitud de crear el todo:", error);
    throw error;
  }
}
