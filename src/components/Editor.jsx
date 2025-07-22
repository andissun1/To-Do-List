import styles from './TaskItem.module.css';
import { useState } from 'react';

export function Editor({ id, title, handleEdit, updateTask }) {
  const [data, setData] = useState({ title });

  const onSave = (id) => {
    updateTask(id, data).finally(() => handleEdit());
  };

  const onChange = (e) => {
    const { name, value } = e.target;

    setData({
      ...data,
      [name]: value,
    });
  };

  return (
    // Остаётся дописать логику по изменению готовности задачек
    <div className={styles.task}>
      <input name="title" type="text" value={data.title} onChange={onChange} />
      <div className={styles.checkbox}>
        <label htmlFor="Checkbox">Выполнено:</label>
        <input name="Checkbox" type="checkbox" />
      </div>
      <div>
        <button onClick={() => onSave(id)}>Сохранить</button>
        <button onClick={handleEdit}>Отмена</button>
      </div>
    </div>
  );
}
