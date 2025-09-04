import { useState } from 'react';
import { SortPanel } from './SortPanel';
import { createLinks } from '../../utils';
import style from './Todos.module.css';
import { push, ref } from 'firebase/database';
import { signOut } from 'firebase/auth';
import { auth, db } from '../../firebase';

export function CreateTask({ sort, clientSearch, user }) {
  const [isOpenFilters, setIsOpenFilters] = useState(false);

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

  // Создание
  const createTask = (payload) => {
    const serverData = ref(db, `users/${user}/todos`);
    push(serverData, payload).catch((error) => setError('Ошибка при создании объекта'));
  };

  //Выйти из аккаунта
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log('Выход из аккаунта');
    } catch (error) {
      console.log(error.message);
    }
  };

  function openFilters() {
    setIsOpenFilters((prevstate) => !prevstate);
  }

  return (
    <>
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
            <button onClick={handleSignOut}>Выйти</button>
          </div>
        </>
      )}
    </>
  );
}
