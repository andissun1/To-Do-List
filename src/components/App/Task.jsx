import { useState } from 'react';
import styles from './Todos.module.css';
import { Icon } from '../ui/Icons/Icon';
import { ref, remove } from 'firebase/database';
import { db } from '../../firebase';

export function TaskWithDeleteOption({ id, title, handleEdit, completed, links, user }) {
  const [isDeleting, setIsDeleting] = useState(false);

  async function onDelete(id) {
    setIsDeleting(true);
    await deleteTask(id);
    setIsDeleting(false);
  }

  // Удаление
  const deleteTask = async (id) => {
    const serverData = ref(db, `users/${user}/todos/${id}`);
    remove(serverData);
  };

  const Link = () =>
    Object.entries(links).map(([key, value]) => {
      const hostname = new URL(value).hostname;
      const size = '64';

      return (
        <a key={key} href={value} target="blank" className={styles.links}>
          <img
            height="16px"
            width="16px"
            src={`http://www.google.com/s2/favicons?domain=${hostname}&sz=${size}`}
          />
          {hostname}
        </a>
      );
    });

  return (
    <div className={styles.task}>
      {isDeleting ? (
        'Удаление'
      ) : (
        <li className={`${completed ? styles.done : styles.undone}`}>
          {title}
          <div className={links ? styles.linksContainer : null}>
            {links ? <Link /> : null}
          </div>
        </li>
      )}
      <div>
        <button
          className={styles.deleteButton}
          disabled={isDeleting}
          onClick={() => onDelete(id)}
        >
          <Icon name="delete" />
        </button>
        <button onClick={handleEdit}>
          <Icon name="edit" />
        </button>
      </div>
    </div>
  );
}
