import { createContext, useContext } from 'react';
import { auth, db, storage } from '../firebase';
import { signOut } from 'firebase/auth';
import { get, push, ref, remove, update } from 'firebase/database';
import { deleteObject, getDownloadURL, ref as storageRef } from 'firebase/storage';
import { useUserContext } from './userContext';
import { uploadBytes } from 'firebase/storage';

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
  const uploadFile = async (path, file) => {
    const fileRef = storageRef(storage, `${user}/${path}`);
    await uploadBytes(fileRef, file).then(() => console.log('Файл загружен в стор'));

    return fileRef;
  };

  // Получение или скачивание изображений
  const getFile = async (path) => {
    const fileRef = storageRef(storage, `${path}`);
    return await getDownloadURL(fileRef);
  };

  // Удаление файла из стора
  const deleteFile = (taskID, fileName) => {
    const key = fileName.replaceAll('?', '.');
    const fileRef = storageRef(storage, `${user}/${taskID}/${key}`);
    deleteObject(fileRef)
      .then(() => {
        console.log('Файл удалён из стора');
      })
      .catch(() => console.log('Ошибка при удалении из стора'));

    const serverData = ref(db, `users/${user}/todos/${taskID}/fileLinks/${fileName}`);
    remove(serverData)
      .then(() => console.log('ссылка на файл удалена'))
      .catch(() => {
        console.log('Ошибка при удалении');
      });
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
        getFile,
        deleteFile,
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
