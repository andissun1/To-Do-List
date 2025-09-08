import styles from './ModalWindowDelete.module.css';

export const ModalWindowDelete = ({ deleteTask, setConfirmDelete }) => {
  return (
    <div className={styles.modalWindow}>
      <span>Удалить элемент? Восстановление будет невозможно</span>
      <button onClick={deleteTask}>Подтвердить</button>
      <button onClick={() => setConfirmDelete(false)}>Отмена</button>
    </div>
  );
};
