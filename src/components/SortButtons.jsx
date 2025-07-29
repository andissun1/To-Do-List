import styles from './TaskItem.module.css';
import { debounce } from '../utils';
import { useState } from 'react';

export function SortButtons({
  openFilters,
  sortByAlphabet,
  sortById,
  clientSearch,
  filters,
  clearSearch,
}) {
  const [inputValue, setInputValue] = useState('');
  let debouncedSearch = debounce((value) => clientSearch(value), 250);

  return (
    <>
      <div className={styles.search}>
        <input
          type="text"
          value={inputValue}
          onChange={({ target }) => {
            debouncedSearch(target.value);
            setInputValue(target.value);
          }}
        />
        <button
          type="submit"
          onClick={() => {
            clearSearch();
            setInputValue('');
          }}
        >
          {' '}
          {inputValue ? 'Очистить' : 'Поиск'}
        </button>
      </div>
      <div className={styles.SortButtons}>
        <button onClick={openFilters}>Готово</button>
        <button onClick={() => sortByAlphabet()}>
          По алфавиту {filters.byAlphabet === 'asc' ? '▼' : '▲'}
        </button>
        <button onClick={() => sortById()}>
          По дате {filters.byId === 'asc' ? '▼' : '▲'}
        </button>
      </div>
    </>
  );
}
