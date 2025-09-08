import styles from './Todos.module.css';
import { useState } from 'react';
import { createLinks } from '../../utils';
import { Icon } from '../ui/Icons/Icon';
import { LinkEditor } from './LinkEditor';
import { useServerContext } from '../../Contexts/serverRequests';
import { Links } from '../ui/Links/Links';

export function Editor({ handleEdit, task }) {
  const [data, setData] = useState(task[1]);
  const [activeLink, setActiveLink] = useState(null);
  const { updateTask, uploadFile, getTask } = useServerContext();

  function handleOnKeyDown(event) {
    if (event.key === 'Enter' && event.ctrlKey) {
      onSave(task[0]);
    }
  }

  const onSave = async (id) => {
    const task = await getTask(id);

    if (data.title.includes('://')) {
      const { links, newTitle } = createLinks(data.title);
      const payload = { ...data, title: newTitle, links };
      updateTask(id, payload);
    } else updateTask(id, { ...data, links: task.links || null });

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

  const openLinkEditor = (id) => {
    setActiveLink(id);
  };

  return (
    <div className={styles.task}>
      {activeLink && (
        <LinkEditor openLinkEditor={openLinkEditor} activeLink={activeLink} task={task} />
      )}
      <div className={styles.editContainer}>
        <textarea
          name="title"
          value={data.title}
          onChange={onChange}
          onKeyDown={handleOnKeyDown}
        />
        {data.links && (
          <Links
            links={task[1].links}
            children={<Icon name="edit" />}
            onClick={openLinkEditor}
          />
        )}
        <div className={styles.checkDone}>
          <label htmlFor="checkbox">Завершено:</label>
          <input
            name="checkbox"
            type="checkbox"
            checked={data.completed}
            onChange={handleCompleted}
          />
        </div>
      </div>

      <div>
        <button onClick={() => onSave(task[0])} children={<Icon name="done" />} />
        <button onClick={() => uploadFile()} children={<Icon name="image" />} />
        <button onClick={handleEdit} children={<Icon name="cansel" />} />
      </div>
    </div>
  );
}
