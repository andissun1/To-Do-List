import React from 'react';
import styles from './PostItem.module.css';

export function PostItem({ title, deletePost, id }) {
  return (
    <div className={styles.task}>
      <li>{title}</li>
      <button onClick={() => {}}>Удалить</button>
    </div>
  );
}
