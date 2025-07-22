import styles from './TaskItem.module.css';

export function CreateTask({ createTask }) {
  const onSubmit = (e) => {
    e.preventDefault();

    const payload = {
      title: e.target.newTask.value,
      body: '',
    };

    e.target.newTask.value = '';
    createTask(payload);
  };

  return (
    <div className={styles.taskCreator}>
      <form onSubmit={onSubmit}>
        <input id="newTask" type="text" />
        <button type="submit">Создать</button>
      </form>
    </div>
  );
}
