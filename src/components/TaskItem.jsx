import styles from './TaskItem.module.css';

export function TaskItem({ title, completed }) {
  return (
    <div className={styles.task}>
      <li className={`${completed ? styles.done : styles.undone} task_li`}>{title}</li>
    </div>
  );
}
