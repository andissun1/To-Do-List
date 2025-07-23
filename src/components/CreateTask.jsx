import { useState } from 'react';
import { SortButtons } from './SortButtons';

export function CreateTask({ createTask, sortByAlphabet, sortById }) {
  const [isOpenFilters, setIsOpenFilters] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();

    if (isOpenFilters) {
    }

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
      <>
        <form onSubmit={onSubmit}>
          <input id="newTask" type="text" />
          <button type="submit">{isOpenFilters ? 'Найти' : 'Создать'}</button>
        </form>
        {isOpenFilters ? (
          <SortButtons
            sortById={sortById}
            sortByAlphabet={sortByAlphabet}
            openFilters={openFilters}
          />
        ) : (
          <button onClick={openFilters} type="submit">
            Сортировка
          </button>
        )}
      </>
    </>
  );
}
