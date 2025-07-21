import React, { useState } from 'react';
import styles from './PostItem.module.css';

export function PostItem({ title, deletePost, id, updatePost, createPost }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [data, setData] = useState({ title });

  async function onDelete(id) {
    setIsDeleting(true);
    await deletePost(id);
    setIsDeleting(false);
  }

  const handleEdit = () => {
    setIsEdit((prevState) => !prevState);
  };

  const onSave = (id) => {
    updatePost(id, data).finally(() => handleEdit());
  };

  const onChange = (e) => {
    const { name, value } = e.target;

    setData({
      ...data,
      [name]: value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const payload = {
      title: e.target.newTask.value,
      body: '',
    };

    createPost(payload);
  };

  return (
    <>
      <div className={styles.task}>
        <form onSubmit={onSubmit}>
          <input id="newTask" type="text" />
          <button type="submit">Создать</button>
        </form>
      </div>
      {isEdit ? (
        <div className={styles.task}>
          <input name="title" type="text" value={data.title} onChange={onChange} />
          <button onClick={() => onSave(id)}>Сохранить</button>
          <button onClick={handleEdit}>Отмена</button>
        </div>
      ) : (
        <div className={styles.task}>
          {isDeleting ? 'Удаление' : <li>{title}</li>}
          <button disabled={isDeleting} onClick={() => onDelete(id)}>
            Удалить
          </button>
          <button onClick={handleEdit}> Обновить </button>
        </div>
      )}
    </>
  );
}
