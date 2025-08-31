import { useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth, db } from '../../firebase';
import { Navigate } from 'react-router-dom';
import { child, get, ref, set } from 'firebase/database';
import style from './Auth.module.css';

export const Auth = ({ user }) => {
  const [isSignUpActive, setIsSignUpActive] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleMethodChange = () => {
    setIsSignUpActive(!isSignUpActive);
  };

  const createStore = async (userID) => {
    const dbTodos = ref(db);
    const response = await get(child(dbTodos, 'todos'));
    const initialTodos = await response.val();

    const serverData = ref(db, 'users/' + userID);
    set(serverData, { todos: initialTodos }).catch((error) =>
      setError('Ошибка при создании объекта')
    );
  };

  const handleSignUp = async () => {
    const { email, password } = formData;
    if (!email || !password) return;
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      const userID = user.email.replace(/@.*/, '');
      createStore(userID);
    } catch (error) {
      console.log(error.code, error.message);
    }
  };

  const handleSignIn = async () => {
    const { email, password } = formData;
    if (!email || !password) return;
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log(error.code, error.message);
    }
  };

  const handleChangeInputs = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  if (user) {
    return <Navigate to="/App" />;
  }

  return (
    <section>
      {isSignUpActive ? <h2>Регистрация</h2> : <h2>Вход</h2>}
      <form autoComplete="on">
        <fieldset className={style.authForm}>
          <div>
            <label htmlFor="email">Почта:</label>
            <input name="email" type="text" id="email" onChange={handleChangeInputs} />
          </div>

          <div>
            <label htmlFor="password">Пароль:</label>
            <input
              name="password"
              type="current-password"
              id="password"
              onChange={handleChangeInputs}
            />
          </div>

          {isSignUpActive ? (
            <>
              <button type="button" onClick={handleSignUp}>
                Зарегистриоваться
              </button>
              <a onClick={handleMethodChange}>Войти</a>
            </>
          ) : (
            <>
              <button type="button" onClick={handleSignIn}>
                Войти
              </button>
              <a onClick={handleMethodChange}>Создать аккаунт</a>
            </>
          )}
        </fieldset>
      </form>
    </section>
  );
};
