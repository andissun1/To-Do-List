import { auth, db } from '../../firebase';
import { child, get, ref, set } from 'firebase/database';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { useEffect, useState } from 'react';
import { Input } from './Input';
import { Navigate } from 'react-router-dom';
import { validator } from '../../utils';
import style from './Auth.module.css';

const scheme = {
  email: {
    required: { message: 'Это обязательное поле' },
    isEmail: { message: 'Почта указана с ошибкой' },
  },
  password: {
    required: { message: 'Это обязательное поле' },
    min: { message: 'Не менее 6 символов', value: 6 },
    max: { message: 'Не более 12 символов', value: 12 },
  },
};

export const Auth = ({ user }) => {
  const [isSignUpActive, setIsSignUpActive] = useState(false);
  const [startValidation, setStartValidation] = useState(false);
  const [error, setError] = useState([]);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    if (startValidation) {
      const errors = validator(formData, scheme);
      setError(errors);
    }
  }, [formData]);

  // Если авторизован, то перекинуть на приложение
  if (user) return <Navigate to={'/App'} />;

  // Вход или создание аккаунта
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validator(formData, scheme);
    setStartValidation(true);
    setError(errors);

    if (Object.keys(errors).length !== 0) return;

    console.log('Вход в систему');
    const { email, password } = formData;

    try {
      if (isSignUpActive) {
        const { user } = await createUserWithEmailAndPassword(auth, email, password);
        const userID = user.email.replace(/@.*/, '');
        createStore(userID);
      } else {
        const response = await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (error) {
      console.log(error.code, error.message);
    }
  };

  // Загружаем шаблон обучающих заметок и ставим в новое хранилище
  const createStore = async (userID) => {
    try {
      const dbTodos = ref(db);
      const response = await get(child(dbTodos, 'todos'));
      const initialTodos = await response.val();

      const serverData = ref(db, 'users/' + userID);
      set(serverData, { todos: initialTodos });
    } catch (error) {
      console.log('Ошибка при создании хранилища');
    }
  };

  const handleChangeInputs = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleMethodChange = () => {
    setIsSignUpActive(!isSignUpActive);
  };

  return (
    <section>
      {isSignUpActive ? <h2>Регистрация</h2> : <h2>Вход</h2>}
      <form onSubmit={handleSubmit}>
        <fieldset className={style.authForm}>
          <Input
            label="Почта:"
            name="email"
            type="text"
            id="email"
            value={formData.email}
            error={error?.email}
            onChange={handleChangeInputs}
          />

          <Input
            label="Пароль:"
            name="password"
            type="current-password"
            id="password"
            value={formData.password}
            error={error?.password}
            onChange={handleChangeInputs}
          />

          {isSignUpActive ? (
            <>
              <button type="submit">Зарегистриоваться</button>
              <a onClick={handleMethodChange}>Войти</a>
            </>
          ) : (
            <>
              <button type="submit">Войти</button>
              <a onClick={handleMethodChange}>Создать аккаунт</a>
            </>
          )}
        </fieldset>
      </form>
    </section>
  );
};
