import { useEffect, useState } from "react";
import PortalLayout from "../layout/PortalLayout";
import { useAuth } from "../auth/AuthProvider";
import { API_URL } from "../auth/authConstants";

interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

export default function Dashboard() {
  const auth = useAuth();

  const [todos, setTodos] = useState<Todo[]>([]);
  const [value, setValue] = useState("");

  async function getTodos() {
    const accessToken = auth.getAccessToken();
    try {
      const response = await fetch(`${API_URL}/projects`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        const json = await response.json();
        setTodos(json);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function createTodo() {
    if (value.length > 3) {
      try {
        const response = await fetch(`${API_URL}/projects`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.getAccessToken()}`,
          },
          body: JSON.stringify({ title: value }),
        });
        if (response.ok) {
          const todo = (await response.json()) as Todo;
          setTodos([...todos, todo]);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  async function deleteProject(id: string) {
    try {
      const accessToken = auth.getAccessToken();
      const response = await fetch(`${API_URL}/projects/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.ok) {
        setTodos(todos.filter((todo) => todo.id !== id));
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function updateProject(id: string, updatedData: any) {
    try {
      const accessToken = auth.getAccessToken();
      const response = await fetch(`${API_URL}/projects/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(updatedData),
      });
      if (response.ok) {
        setTodos(todos.map((todo) => (todo.id === id ? { ...todo, ...updatedData } : todo)));
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getTodos();
  }, []);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    createTodo();
  }

  return (
    <PortalLayout>
      <div className="dashboard">
        <h1>Dashboard de {auth.getUser()?.name ?? ""}</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="New task to do..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </form>
        {todos.map((project: Todo) => (
          <div key={project.id}>
            <h3>{project.title}</h3>
            <p>{project.completed}</p>
            <button onClick={() => deleteProject(project.id)}>Eliminar</button>
            <button onClick={() => updateProject(project.id, { completed: !project.completed })}>Actualizar</button>
          </div>
        ))}
      </div>
    </PortalLayout>
  );
}