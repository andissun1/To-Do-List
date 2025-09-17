import { useState } from 'react';
import styles from './Todos.module.css';
import { Icon } from '../ui/Icons/Icon';
import { ModalWindowDelete } from '../ui/ModalWindows/ModalWindowDelete';
import { useServerContext } from '../../Contexts/serverRequests';
import { Links } from '../ui/Links/Links';

export function TaskWithDeleteOption({ handleEdit, task }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const { deleteTask } = useServerContext();
  const { links } = task[1];

  async function onDelete() {
    setIsDeleting(true);
    await deleteTask(task[0]);
    setIsDeleting(false);
  }

  return (
    <div className={styles.task}>
      {isDeleting ? (
        'Удаление...'
      ) : (
        <li className={`${task[1].completed ? styles.done : styles.undone}`}>
          {task[1].title}
          <div className={links ? styles.linksContainer : null}>
            {links && <Links links={links} />}
            {task[1].fileLinks && <Links links={task[1].fileLinks} />}
          </div>
        </li>
      )}
      <div>
        {confirmDelete && (
          <ModalWindowDelete deleteTask={onDelete} setConfirmDelete={setConfirmDelete} />
        )}
        <button
          className={styles.deleteButton}
          disabled={isDeleting}
          onClick={() => setConfirmDelete((prevState) => !prevState)}
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
