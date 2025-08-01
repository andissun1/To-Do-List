import styles from './TaskItem.module.css';
import { useState } from 'react';

export function Editor({ id, title, handleEdit, updateTask, completed }) {
  const [data, setData] = useState({ title, completed });

  const onSave = (id) => {
    updateTask(id, data);
    handleEdit();
  };

  const onChange = (e) => {
    const { name, value } = e.target;

    setData({
      ...data,
      [name]: value,
      completed: data.completed,
    });
  };

  function handleCompleted() {
    setData({ ...data, completed: !data.completed });
  }

  function handleOnKeyDown(event) {
    if (event.key === 'Enter') {
      onSave(id);
    }
  }

  return (
    <div className={styles.task}>
      <textarea
        name="title"
        value={data.title}
        onChange={onChange}
        onKeyDown={handleOnKeyDown}
      />
      <input type="checkbox" checked={data.completed} onChange={handleCompleted} />
      <div>
        <button onClick={() => onSave(id)}>Сохранить</button>
        <button onClick={handleEdit}>Отмена</button>
      </div>
    </div>
  );
}
