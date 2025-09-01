import styles from './TaskItem.module.css';
import { useState } from 'react';
import { createLinks } from '../utils';
import { Icon } from './ui/Icons/Icon';

export function Editor({ id, title, handleEdit, updateTask, completed }) {
  const [data, setData] = useState({ title, completed });

  const onSave = (id) => {
    if (data.title.includes('://')) {
      const { links, newTitle } = createLinks(data.title);
      let payload = { ...data, title: newTitle, links };
      updateTask(id, payload);
    } else {
      updateTask(id, data);
    }

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
    // if (event.key === 'Enter') {
    //   onSave(id);
    // }
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
        <button onClick={() => onSave(id)}>
          <Icon name="done" />
        </button>
        <button
          onClick={() => {
            alert(
              'Привет! В скором времени будет возможность загружать изображения. Пока что кнопка с картинкой для красоты ✨'
            );
          }}
        >
          <Icon name="image" />
        </button>
        <button onClick={handleEdit}>
          <Icon name="cansel" />
        </button>
      </div>
    </div>
  );
}
