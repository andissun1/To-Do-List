import { useState } from 'react';
import { SortButtons } from './SortButtons';

export function CreateTask({ createTask }) {
  const [isOpenFilters, setIsOpenFilters] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();

    const payload = {
      title: e.target.newTask.value,
      body: '',
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
        <SortButtons openFilters={openFilters} />
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
