import { useState } from 'react';
import styles from './TaskItem.module.css';

export function SortButtons({
  openFilters,
  sortByAlphabet,
  sortById,
  sortOnServer,
  filters,
}) {
  const [value, setValue] = useState('');

  function search({ target }) {
    setValue(target.value);
    sortOnServer('?q=' + target.value);
  }

  return (
    <>
      <div className={styles.search}>
        <input id="newTask" type="text" value={value} onChange={search} />
        <button type="submit"> Поиск </button>
      </div>
      <div className={styles.SortButtons}>
        <button onClick={openFilters}>Готово</button>
        <button onClick={sortByAlphabet}>
          По алфавиту {filters.byAlphabet === 'asc' ? '▼' : '▲'}
        </button>
        <button onClick={sortById}>По дате {filters.byId === 'asc' ? '▼' : '▲'}</button>
      </div>
    </>
  );
}
