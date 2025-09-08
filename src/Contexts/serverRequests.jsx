import { createContext, useContext } from 'react';
import { auth, db } from '../firebase';
import { signOut } from 'firebase/auth';
import { get, push, ref, remove, update } from 'firebase/database';
import { useUserContext } from './userContext';

const ServerRequests = createContext(null);
export const useServerContext = () => useContext(ServerRequests);

export const ServerRequestsProvider = ({ children }) => {
  const user = useUserContext();

  const logOut = async () => {
    await signOut(auth).catch((error) => console.log('Ошибка при выходе', error.message));
  };

  // Создание
  const createTask = (payload) => {
    const serverData = ref(db, `users/${user}/todos`);
    push(serverData, payload).catch((error) =>
      console.log('Ошибка при создании объекта', error)
    );
  };

  // Получение
  const getTask = (id) => {
    const serverData = ref(db, `users/${user}/todos/${id}`);
    return get(serverData)
      .then((snap) => snap.val())
      .catch((error) => console.log('Ошибка при получении заметки', error));
  };

  // Изменение
  const updateTask = (id, payload) => {
    const serverData = ref(db, `users/${user}/todos/${id}`);
    update(serverData, payload).catch(() =>
      console.log('Ошибка при запросе на редактирование')
    );
  };

  // Удаление
  const deleteTask = (id) => {
    const serverData = ref(db, `users/${user}/todos/${id}`);
    remove(serverData);
  };

  // Загрузка изображений
  const uploadFile = () => {
    alert(
      'Привет! В скором времени будет возможность загружать изображения. Пока что кнопка с картинкой для красоты ✨'
    );
  };

  const deleteLink = (taskId, linkId) => {
    console.log('Удалено:', `users/${user}/todos/${taskId}/links/${linkId}`);
    const serverData = ref(db, `users/${user}/todos/${taskId}/links/${linkId}`);
    remove(serverData).catch(() => {
      console.log('Ошибка при удалении');
    });
  };

  const updateLink = (taskId, payload) => {
    const serverData = ref(db, `users/${user}/todos/${taskId}/links`);
    update(serverData, payload).catch((error) =>
      console.log('Ошибка при запросе на редактирование', error)
    );
  };

  const addLink = (taskId, payload) => {
    const serverData = ref(db, `users/${user}/todos/${taskId}/links`);
    update(serverData, payload).catch((error) =>
      console.log('Ошибка при запросе на редактирование', error)
    );
  };

  return (
    <ServerRequests
      value={{
        logOut,
        createTask,
        updateTask,
        uploadFile,
        deleteLink,
        updateLink,
        addLink,
        deleteTask,
        getTask,
      }}
    >
      {children}
    </ServerRequests>
  );
};
