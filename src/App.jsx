import { useEffect, useState } from 'react';
import { TaskItem } from './components/TaskItem';
import { CreateTask } from './components/CreateTask';
import { ref, onValue, update, remove, push } from 'firebase/database';
import { auth, db } from './firebase';
import styles from '../src/components/TaskItem.module.css';
import { signOut } from 'firebase/auth';

export default function App({ user }) {
  const [todos, setTodos] = useState({});
  const [serverData, setServerData] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    byId: 'desc',
    byAlphabet: 'desc',
    searchPhrase: null,
    activeFilter: null,
  });

  if (!user) return;

  // Получение
  useEffect(() => {
    const serverData = ref(db, `users/${user}/todos`);

    return onValue(serverData, (snapshot) => {
      const loadedTodos = snapshot.val() || {};

      switch (filters.activeFilter) {
        case 'search':
          findTask(filters.searchPhrase, loadedTodos);
          break;

        case 'byId':
          sortById(loadedTodos);
          break;

        case 'byAlphabet':
          sortByAlphabet(loadedTodos);
          break;

        default:
          setTodos(loadedTodos);
          break;
      }

      setServerData(loadedTodos);
      setIsLoading(false);
    });
  }, [filters]);

  // Изменение
  const updateTask = (id, payload) => {
    const serverData = ref(db, `users/${user}/todos/${id}`);

    update(serverData, { ...payload }).catch(() =>
      setError('Ошибка при запросе на редактирование')
    );
  };

  // Удаление
  const deleteTask = async (id) => {
    const serverData = ref(db, `users/${user}/todos/${id}`);
    remove(serverData);
  };

  // Создание
  const createTask = async (payload) => {
    const serverData = ref(db, `users/${user}/todos`);
    push(serverData, payload).catch((error) => setError('Ошибка при создании объекта'));
  };

  // Поиск
  function findTask(inputValue, loadedTodos) {
    let resultsOfSearch = Object.entries(
      typeof loadedTodos === 'undefined' ? serverData : loadedTodos
    ).filter(([keys, values]) =>
      values.title.toLowerCase().includes(inputValue.toLowerCase())
    );

    setTodos(Object.fromEntries(resultsOfSearch));

    if (!loadedTodos) {
      setFilters({ ...filters, activeFilter: 'search', searchPhrase: inputValue });
    }
  }

  function clearSearch() {
    setFilters({ ...filters, searchPhrase: null, activeFilter: null });
  }

  // Сортировка по дате
  function sortById(loadedTodos) {
    let toggler = filters.byId;

    if (!loadedTodos) {
      toggler = filters.byId === 'asc' ? 'desc' : 'asc';
      setFilters({ ...filters, byId: toggler, activeFilter: 'byId' });
    }

    let resultsOfSort = loadedTodos
      ? Object.entries(loadedTodos)
      : Object.entries(serverData);

    if (toggler === 'asc') {
      resultsOfSort.sort(([key1, val1], [key2, val2]) => val1.date - val2.date);
    } else {
      resultsOfSort.sort(([key1, val1], [key2, val2]) => val2.date - val1.date);
    }

    setTodos(Object.fromEntries(resultsOfSort));
  }

  // Сортировка по алфавиту
  function sortByAlphabet(loadedTodos) {
    let toggler = filters.byAlphabet;

    if (!loadedTodos) {
      toggler = filters.byAlphabet === 'asc' ? 'desc' : 'asc';
      setFilters({ ...filters, byAlphabet: toggler, activeFilter: 'byAlphabet' });
    }

    let resultsOfSort = loadedTodos
      ? Object.entries(loadedTodos)
      : Object.entries(serverData);

    if (toggler === 'asc') {
      resultsOfSort.sort(([key1, val1], [key2, val2]) =>
        val1.title.localeCompare(val2.title)
      );
    } else {
      resultsOfSort.sort(([key1, val1], [key2, val2]) =>
        val2.title.localeCompare(val1.title)
      );
    }

    setTodos(Object.fromEntries(resultsOfSort));
  }

  // Показ ошибок
  if (error) {
    return <h1>{error}</h1>;
  }

  // Загрузка
  function Loader() {
    return <h1 className={styles.loader}></h1>;
  }

  //Выйти из аккаунта
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log('Выход из аккаунта');
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className={styles.tasksContainer}>
      <header className={styles.taskCreator}>
        <CreateTask
          createTask={createTask}
          clientSearch={findTask}
          sortById={sortById}
          sortByAlphabet={sortByAlphabet}
          filters={filters}
          clearSearch={clearSearch}
          handleSignOut={handleSignOut}
        />
      </header>
      <ul>
        {isLoading ? (
          <Loader />
        ) : (
          Object.entries(todos).map(([id, task]) => (
            <TaskItem
              {...task}
              id={id}
              key={id}
              deleteTask={deleteTask}
              updateTask={updateTask}
            />
          ))
        )}
      </ul>
    </div>
  );
}
