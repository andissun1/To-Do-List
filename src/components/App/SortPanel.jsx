import styles from './Todos.module.css';
import { useDebounce } from '../../utils';
import { useState } from 'react';

export function SortPanel({ openFilters, sort, clientSearch }) {
  const [inputValue, setInputValue] = useState('');
  const [sortTogglers, setSortTogglers] = useState({});
  let debouncedSearch = useDebounce((value) => clientSearch(value), 250);

  const handleChangeSearch = ({ target }) => {
    debouncedSearch(target.value);
    setInputValue(target.value);
  };

  const clearSearch = () => {
    clientSearch('--clear');
    setInputValue('');
  };

  const handleSortButton = (type) => {
    const status = sort('byAlphabet');
    setSortTogglers({ ...sortTogglers, [type]: status });
  };

  return (
    <>
      <div className={styles.search}>
        <input type="text" value={inputValue} onChange={handleChangeSearch} />
        <button type="submit" onClick={clearSearch}>
          {inputValue ? 'Очистить' : 'Поиск'}
        </button>
      </div>

      <div className={styles.SortButtons}>
        <button onClick={openFilters}>Готово</button>
        <button onClick={() => handleSortButton('byAlphabet')}>
          По алфавиту {sortTogglers.byAlphabet === 'asc' ? '▼' : '▲'}
        </button>
        <button onClick={() => handleSortButton('byDate')}>
          По дате {sortTogglers.byDate === 'asc' ? '▼' : '▲'}
        </button>
      </div>
    </>
  );
}
