import { useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth, db } from '../../firebase';
import { Navigate } from 'react-router-dom';
import { child, get, ref, set } from 'firebase/database';

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
      <h2>Homepage</h2>
      <form>
        {isSignUpActive ? <legend>Sign Up</legend> : <legend>Sign In</legend>}
        <fieldset>
          <ul>
            <li>
              <label htmlFor="email">Email</label>
              <input name="email" type="text" id="email" onChange={handleChangeInputs} />
            </li>
            <li>
              <label htmlFor="password">Password</label>
              <input
                name="password"
                type="current-password"
                id="password"
                onChange={handleChangeInputs}
              />
            </li>
          </ul>
          {isSignUpActive ? (
            <>
              <button type="button" onClick={handleSignUp}>
                Sign Up
              </button>
              <a onClick={handleMethodChange}>Sign In</a>
            </>
          ) : (
            <>
              <button type="button" onClick={handleSignIn}>
                Sign In
              </button>
              <a onClick={handleMethodChange}>Create an account</a>
            </>
          )}
        </fieldset>
      </form>
    </section>
  );
};
