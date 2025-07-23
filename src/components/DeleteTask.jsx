import { useState } from 'react';
import styles from './TaskItem.module.css';

export function TaskWithDeleteOption({ id, title, handleEdit, deleteTask, completed }) {
  const [isDeleting, setIsDeleting] = useState(false);

  async function onDelete(id) {
    setIsDeleting(true);
    await deleteTask(id);
    setIsDeleting(false);
  }

  return (
    <div className={styles.task}>
      {isDeleting ? (
        'Удаление'
      ) : (
        <li className={`${completed ? styles.done : styles.undone}`}>{title}</li>
      )}
      <div>
        <button disabled={isDeleting} onClick={() => onDelete(id)}>
          Удалить
        </button>
        <button onClick={handleEdit}> Обновить </button>
      </div>
    </div>
  );
}
