import { useEffect, useState } from 'react';
import { TaskItem } from './TaskContainer';
import { CreateTask } from './CreateTask';
import { ref, onValue } from 'firebase/database';
import { db } from '../../firebase';
import styles from './Todos.module.css';
import { useUserContext } from '../../Contexts/userContext';

export default function App() {
  const [todos, setTodos] = useState({});
  const [serverData, setServerData] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    byDate: 'desc',
    byAlphabet: 'desc',
    searchPhrase: null,
    activeFilter: null,
  });
  const user = useUserContext();

  // Получение заметок
  useEffect(() => {
    const serverData = ref(db, `users/${user}/todos`);

    try {
      return onValue(serverData, (snapshot) => {
        const loadedTodos = snapshot.val() || {};

        filters.searchPhrase
          ? findTask(filters.searchPhrase, loadedTodos)
          : setTodos(loadedTodos);

        setServerData(loadedTodos);
        setIsLoading(false);
      });
    } catch (error) {
      setError(error.message);
    }
  }, [filters.searchPhrase]);

  // Поиск
  function findTask(inputValue, loadedTodos) {
    const checkSource = serverData || loadedTodos;

    let resultsOfSearch = Object.entries(checkSource).filter(([keys, values]) =>
      values.title.toLowerCase().includes(inputValue.toLowerCase())
    );

    setTodos(Object.fromEntries(resultsOfSearch));
    setFilters({ ...filters, activeFilter: 'search', searchPhrase: inputValue });

    if (inputValue === '--clear') {
      setFilters({ ...filters, searchPhrase: null, activeFilter: null });
    }
  }

  // Сортировка
  function sort(type) {
    let toggler = filters[type] === 'asc' ? 'desc' : 'asc';
    let resultsOfSort = Object.entries(serverData);

    switch (type) {
      case 'byDate':
        if (toggler === 'asc') {
          resultsOfSort.sort(([key1, val1], [key2, val2]) => val2.date - val1.date);
        } else {
          resultsOfSort.sort(([key1, val1], [key2, val2]) => val1.date - val2.date);
        }
        break;

      case 'byAlphabet':
        if (toggler === 'asc') {
          resultsOfSort.sort(([key1, val1], [key2, val2]) =>
            val2.title.localeCompare(val1.title)
          );
        } else {
          resultsOfSort.sort(([key1, val1], [key2, val2]) =>
            val1.title.localeCompare(val2.title)
          );
        }
        break;

      default:
        break;
    }

    setFilters({ ...filters, [type]: toggler, activeFilter: type });
    setTodos(Object.fromEntries(resultsOfSort));
    return toggler;
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <div className={styles.tasksContainer}>
      <CreateTask clientSearch={findTask} sort={sort} />
      <ul>
        {isLoading ? (
          <div className={styles.loader} />
        ) : (
          Object.entries(todos).map((task) => <TaskItem task={task} key={task[0]} />)
        )}
      </ul>
    </div>
  );
}
