import { useState } from 'react';
import { SortPanel } from './SortPanel';
import { createLinks } from '../../utils';
import { useServerContext } from '../../Contexts/serverRequests';
import style from './Todos.module.css';

export function CreateTask({ sort, clientSearch }) {
  const [isOpenFilters, setIsOpenFilters] = useState(false);
  const { logOut, createTask } = useServerContext();

  const onSubmit = (e) => {
    e.preventDefault();
    const { newTask } = e.target;

    let payload = {
      title: newTask.value,
      date: Date.now(),
      completed: false,
    };

    if (payload.title.includes('://')) {
      const { links, newTitle } = createLinks(payload.title);
      payload = { ...payload, title: newTitle, links };
    }

    createTask(payload);
    newTask.value = '';
  };

  function openFilters() {
    setIsOpenFilters((prevstate) => !prevstate);
  }

  return (
    <header className={style.taskCreator}>
      {isOpenFilters ? (
        <SortPanel sort={sort} openFilters={openFilters} clientSearch={clientSearch} />
      ) : (
        <>
          <form onSubmit={onSubmit}>
            <input id="newTask" type="text" className={style.createTaskInput} />
            <button type="submit">Создать</button>
          </form>
          <div>
            <button onClick={openFilters}>Сортировка</button>
            <button onClick={logOut}>Выйти</button>
          </div>
        </>
      )}
    </header>
  );
}
