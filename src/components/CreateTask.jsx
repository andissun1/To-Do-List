import { useState } from 'react';
import { SortButtons } from './SortButtons';
import { createLinks } from '../utils';

export function CreateTask({
  createTask,
  sortByAlphabet,
  sortById,
  clientSearch,
  filters,
  clearSearch,
  handleSignOut,
}) {
  const [isOpenFilters, setIsOpenFilters] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    const { newTask } = e.target;

    let payload = {
      title: newTask.value,
      date: Date.now(),
      completed: false,
    };

    newTask.value = '';

    if (payload.title.includes('://')) {
      const { links, newTitle } = createLinks(payload.title);
      payload = { ...payload, title: newTitle, links };
    }

    createTask(payload);
  };

  function openFilters() {
    setIsOpenFilters((prevstate) => !prevstate);
  }

  return (
    <>
      {isOpenFilters ? (
        <SortButtons
          sortById={sortById}
          sortByAlphabet={sortByAlphabet}
          openFilters={openFilters}
          clientSearch={clientSearch}
          filters={filters}
          clearSearch={clearSearch}
        />
      ) : (
        <>
          <form onSubmit={onSubmit}>
            <input id="newTask" type="text" />
            <button type="submit">Создать</button>
          </form>
          <div>
            <button onClick={openFilters} type="submit">
              Сортировка
            </button>
            <button onClick={handleSignOut}>Выйти</button>
          </div>
        </>
      )}
    </>
  );
}
