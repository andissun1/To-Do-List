import { useEffect, useState } from 'react';
import { TaskItem } from './components/TaskItem';
import { CreateTask } from './components/CreateTask';
import styles from '../src/components/TaskItem.module.css';
import './App.css';
import { Link } from 'react-router-dom';

const SERVER_URL = 'http://localhost:3000/todos';

export default function App() {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Состояние для запросов на сервер SERVER_URL + sort
  const [sortedBy, setSortedBy] = useState('');

  // Состояние для переключения элементов интерфейса
  const [filters, setFilters] = useState({ byId: 'desc', byAlphabet: 'desc' });

  // Получение списка
  const fetchPost = async (sortedBy = '') => {
    setIsLoading(true);
    try {
      const response = await fetch(SERVER_URL + sortedBy);

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
    fetchPost(sortedBy);
  }, [sortedBy]);

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

  // Сортировка
  const sortOnServer = (activateSort) => {
    setSortedBy(activateSort);
  };

  function sortById() {
    const toggler = filters.byId === 'asc' ? 'desc' : 'asc';

    setFilters({ ...filters, byId: toggler });
    sortOnServer(`?_sort=id&_order=${filters.byId}`);
  }

  function sortByAlphabet() {
    const toggler = filters.byAlphabet === 'asc' ? 'desc' : 'asc';

    setFilters({ ...filters, byAlphabet: toggler });
    sortOnServer(`?_sort=title&_order=${filters.byAlphabet}`);
  }

  if (isLoading && sortedBy === '') {
    return <h1 className="loader"></h1>;
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <div className="tasksContainer">
      <header className={styles.taskCreator}>
        <CreateTask
          createTask={createTask}
          sortOnServer={sortOnServer}
          sortById={sortById}
          sortByAlphabet={sortByAlphabet}
          filters={filters}
        />
      </header>
      <ul>
        {todos.map((task) => (
          <div key={task.id}>
            <Link to={`/task/${task.id}`}>
              <TaskItem {...task} key={task.id} />
            </Link>
          </div>
        ))}
      </ul>
    </div>
  );
}
