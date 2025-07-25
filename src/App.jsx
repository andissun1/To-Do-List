import { useEffect, useState } from 'react';
import { TaskItem } from './components/TaskItem';
import { CreateTask } from './components/CreateTask';
import { ref, onValue, update, remove, push } from 'firebase/database';
import { db } from './firebase';
import styles from '../src/components/TaskItem.module.css';
import './App.css';

export default function App() {
  const [todos, setTodos] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({ byId: 'desc', byAlphabet: 'desc', URL: '' });

  // Получение
  useEffect(() => {
    const serverData = ref(db, 'todos' + filters.URL);

    onValue(serverData, (snapshot) => {
      const loadedTodos = snapshot.val() || [];

      setTodos(loadedTodos);
      setIsLoading(false);
    });
  }, []);

  // Изменение
  const updateTask = (id, payload) => {
    const serverData = ref(db, 'todos/' + id);

    update(serverData, { ...payload }).catch(() =>
      setError('Ошибка при запросе на редактирование')
    );
  };

  // Удаление
  const deleteTask = async (id) => {
    const serverData = ref(db, 'todos/' + id);
    remove(serverData);
  };

  // Создание
  const createTask = async (payload) => {
    const serverData = ref(db, 'todos');
    push(serverData, payload).catch((error) => setError('Ошибка при создании объекта'));
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

  if (error) {
    return <h1>{error}</h1>;
  } else if (isLoading && filters.URL === '') {
    return <h1 className="loader"></h1>;
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
        {Object.entries(todos).map(([id, task]) => (
          <TaskItem
            {...task}
            id={id}
            key={id}
            deleteTask={deleteTask}
            updateTask={updateTask}
          />
        ))}
      </ul>
    </div>
  );
}
