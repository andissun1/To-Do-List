import styles from './Todos.module.css';
import { useState } from 'react';
import { createLinks } from '../../utils';
import { Icon } from '../ui/Icons/Icon';
import { ref, update } from 'firebase/database';
import { db } from '../../firebase';

export function Editor({ id, title, handleEdit, user, completed }) {
  const [data, setData] = useState({ title, completed });

  function handleOnKeyDown(event) {
    if (event.key === 'Enter' && event.ctrlKey) {
      onSave(id);
    }
  }

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

  // Изменение
  const updateTask = (id, payload) => {
    const serverData = ref(db, `users/${user}/todos/${id}`);
    update(serverData, { ...payload }).catch(() =>
      setError('Ошибка при запросе на редактирование')
    );
  };

  // Загрузка изображений
  const uploadFile = () => {
    alert(
      'Привет! В скором времени будет возможность загружать изображения. Пока что кнопка с картинкой для красоты ✨'
    );
  };

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
        <button onClick={() => uploadFile()}>
          <Icon name="image" />
        </button>
        <button onClick={handleEdit}>
          <Icon name="cansel" />
        </button>
      </div>
    </div>
  );
}
