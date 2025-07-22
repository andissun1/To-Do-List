import { useEffect, useState } from 'react';
import { TaskItem } from './components/TaskItem';
import { CreateTask } from './components/CreateTask';
import './App.css';

const SERVER_URL = 'https://jsonplaceholder.typicode.com/todos/';

export default function App() {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Получение списка
  const fetchPost = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(SERVER_URL);

      if (!response.ok) throw new Error('Не удалость загрузить список задач');

      const data = await response.json();
      setTodos(data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

  // Изменение
  const updateTask = async (id, payload) => {
    try {
      const response = await fetch(SERVER_URL + id, {
        method: 'PATCH',
        body: JSON.stringify({
          ...payload,
        }),
        headers: {
          'Content-Type': 'Application/json',
        },
      });

      if (!response.ok) throw new Error('Ошибка при запросе на редактирование');

      const updatedTask = await response.json();
      let updatedData = Object.values(todos).map((todo) =>
        todo.id === id ? updatedTask : todo
      );

      setTodos(updatedData);
    } catch (error) {
      setError(error);
    }
  };

  // Удаление
  const deleteTask = async (id) => {
    try {
      const response = await fetch(SERVER_URL + id, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'Application/json',
        },
      });

      if (!response.ok) throw new Error('Ошибка при удалении');

      setTodos((prevState) => prevState.filter((task) => task.id !== id));
    } catch (error) {
      setError(error);
    }
  };

  // Создание
  const createTask = async (payload) => {
    try {
      const response = await fetch(SERVER_URL, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) throw new Error('Ошибка при создании');

      const newTask = await response.json();
      console.log(newTask);

      setTodos([...todos, newTask]);
    } catch (error) {
      setError(error);
    }
  };

  if (isLoading) {
    return <h1 className="loader"></h1>;
  }
  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <div className="tasksContainer">
      <CreateTask createTask={createTask} />
      <ul>
        {todos.map((task) => (
          <TaskItem
            {...task}
            key={task.id}
            deleteTask={deleteTask}
            updateTask={updateTask}
          />
        ))}
      </ul>
    </div>
  );
}
