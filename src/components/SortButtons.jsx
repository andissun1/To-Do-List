import styles from './TaskItem.module.css';

export function SortButtons({ openFilters, sortByAlphabet, sortById }) {
  return (
    <div className={styles.SortButtons}>
      <button onClick={openFilters}>Готово</button>
      <button onClick={sortByAlphabet}>По алфавиту ▼</button>
      <button onClick={sortById}>По дате ▼ </button>
    </div>
  );
}
