import { useEffect, useState } from 'react';
import { TaskItem } from './components/TaskItem';
import { CreateTask } from './components/CreateTask';
import { ref, onValue, update, remove, push } from 'firebase/database';
import { db } from './firebase';
import styles from '../src/components/TaskItem.module.css';

export default function App() {
  const [todos, setTodos] = useState({});
  const [serverData, setServerData] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    byId: 'desc',
    byAlphabet: 'desc',
  });

  // Получение
  useEffect(() => {
    const serverData = ref(db, 'todos');

    return onValue(serverData, (snapshot) => {
      const loadedTodos = snapshot.val() || [] || [];

      setTodos(loadedTodos);
      setServerData(loadedTodos);
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
  const findTask = (inputValue) => {
    console.log(serverData);

    let resultsOfSearch = Object.entries(serverData).filter(([keys, values]) =>
      values.title.toLowerCase().includes(inputValue.toLowerCase())
    );

    setTodos(Object.fromEntries(resultsOfSearch));
  };

  function sortById() {
    const toggler = filters.byId === 'asc' ? 'desc' : 'asc';
    let resultsOfSort = Object.entries(serverData);

    if (toggler === 'asc') {
      resultsOfSort.sort(([key1, val1], [key2, val2]) => val1.date - val2.date);
    } else {
      resultsOfSort.sort(([key1, val1], [key2, val2]) => val2.date - val1.date);
    }

    setFilters({ ...filters, byId: toggler });

    setTodos(Object.fromEntries(resultsOfSort));
  }

  function sortByAlphabet() {
    const toggler = filters.byAlphabet === 'asc' ? 'desc' : 'asc';
    let resultsOfSort = Object.entries(serverData);

    if (toggler === 'asc') {
      resultsOfSort.sort(([key1, val1], [key2, val2]) =>
        val1.title.localeCompare(val2.title)
      );
    } else {
      resultsOfSort.sort(([key1, val1], [key2, val2]) =>
        val2.title.localeCompare(val1.title)
      );
    }

    setFilters({ ...filters, byAlphabet: toggler });

    setTodos(Object.fromEntries(resultsOfSort));
  }

  if (error) {
    return <h1>{error}</h1>;
  } else if (isLoading) {
    return <h1 className={styles.loader}></h1>;
  }

  return (
    <div className={styles.tasksContainer}>
      <header className={styles.taskCreator}>
        <CreateTask
          createTask={createTask}
          clientSearch={findTask}
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
