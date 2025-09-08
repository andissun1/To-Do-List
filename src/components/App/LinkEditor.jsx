import { useEffect, useState } from 'react';
import style from './Todos.module.css';
import { Icon } from '../ui/Icons/Icon';
import { useServerContext } from '../../Contexts/serverRequests';

export const LinkEditor = ({ openLinkEditor, activeLink, task }) => {
  const { links } = task[1];
  const [newLink, setNewLink] = useState(links[activeLink]);
  const [error, setError] = useState(null);
  const { deleteLink, updateLink, addLink } = useServerContext();

  useEffect(() => {
    const checkLink = newLink.match(
      /(?:https?:\/\/)?(?:www\.)?(?:[\da-z-]+\.)+[a-z]{2,10}(?:\/[^\s/]+)*\/?\s?/gi
    );

    !checkLink ? setError('Ссылка недействительна') : setError(null);
  }, [newLink]);

  return (
    <div className={style.modalContainer}>
      <div>
        <span>{error}</span>
        <input
          type="text"
          value={newLink}
          onChange={({ target }) => setNewLink(target.value)}
        />
        <button
          onClick={() => {
            updateLink(task[0], { [activeLink]: newLink });
            openLinkEditor(null);
          }}
          disabled={error}
          children={<Icon name="done" />}
        />
        <button
          onClick={() => {
            addLink(task[0], { [links.length]: newLink });
            openLinkEditor(null);
          }}
          disabled={error}
          children={<Icon name="add" />}
        />
        <button
          onClick={() => {
            deleteLink(task[0], activeLink);
            openLinkEditor(null);
          }}
          children={<Icon name="delete" />}
        />
        <button onClick={() => openLinkEditor(null)} children={<Icon name="cansel" />} />
      </div>
    </div>
  );
};
