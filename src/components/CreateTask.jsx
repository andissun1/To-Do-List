import { useState } from 'react';
import { SortButtons } from './SortButtons';

export function CreateTask({
  createTask,
  sortByAlphabet,
  sortById,
  clientSearch,
  filters,
  clearSearch,
}) {
  const [isOpenFilters, setIsOpenFilters] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    const { newTask } = e.target;

    const payload = {
      title: newTask.value,
      date: Date.now(),
      completed: false,
    };

    newTask.value = '';
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
          <button onClick={openFilters} type="submit">
            Сортировка
          </button>
        </>
      )}
    </>
  );
}
