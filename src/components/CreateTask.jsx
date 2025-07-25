import { useState } from 'react';
import { SortButtons } from './SortButtons';

export function CreateTask({
  createTask,
  sortByAlphabet,
  sortById,
  sortOnServer,
  filters,
}) {
  const [isOpenFilters, setIsOpenFilters] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();

    const payload = {
      title: e.target.newTask.value,
      completed: false,
    };

    e.target.newTask.value = '';
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
          sortOnServer={sortOnServer}
          filters={filters}
        />
      ) : (
        <>
          <form onSubmit={onSubmit}>
            <input id="newTask" type="text" />
            <button type="submit">Создать</button>
          </form>
          <button onClick={openFilters} type="submit">
            Сортировка
          </button>
        </>
      )}
    </>
  );
}
