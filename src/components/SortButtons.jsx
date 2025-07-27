import styles from './TaskItem.module.css';
import { debounce } from '../utils';

export function SortButtons({
  openFilters,
  sortByAlphabet,
  sortById,
  clientSearch,
  filters,
}) {
  let debouncedSearch = debounce((value) => clientSearch(value), 250);

  return (
    <>
      <div className={styles.search}>
        <input
          type="text"
          onChange={({ target }) => {
            debouncedSearch(target.value);
          }}
        />
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
