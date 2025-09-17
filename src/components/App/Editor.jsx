import styles from './Todos.module.css';
import { useRef, useState } from 'react';
import { createLinks } from '../../utils';
import { Icon } from '../ui/Icons/Icon';
import { LinkEditor } from './LinkEditor';
import { useServerContext } from '../../Contexts/serverRequests';
import { Links } from '../ui/Links/Links';

export function Editor({ handleEdit, task }) {
  const [data, setData] = useState(task[1]);
  const [activeLink, setActiveLink] = useState(null);
  const { updateTask, uploadFile, getTask, getFile, deleteFile } = useServerContext();
  const inputFile = useRef(null);

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

  // Загрузка файла
  const handleUploadFile = async ({ target }) => {
    const file = target.files[0];
    const path = await uploadFile(`${task[0]}/${file.name}`, file);
    const link = await getFile(path);
    const key = file.name.replaceAll(/[\.\#\$\/\[\]\s]/g, '?');

    await updateTask(task[0], { ...data, fileLinks: { ...data.fileLinks, [key]: link } });

    handleEdit();
  };

  // Удаление файла
  const handleDeleteFile = (fileName) => {
    setData((prevState) => {
      delete prevState.fileLinks[fileName];
      return prevState;
    });

    deleteFile(task[0], fileName);
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
        {data.fileLinks && (
          <Links
            links={task[1].fileLinks}
            children={<Icon name="delete" />}
            onClick={handleDeleteFile}
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

      <input
        type="file"
        ref={inputFile}
        className={styles.hide}
        onChange={handleUploadFile}
      />

      <div>
        <button onClick={() => onSave(task[0])} children={<Icon name="done" />} />
        <button
          onClick={() => inputFile.current.click()}
          children={<Icon name="image" />}
        />
        <button onClick={handleEdit} children={<Icon name="cansel" />} />
      </div>
    </div>
  );
}
