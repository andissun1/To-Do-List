import { Routes, BrowserRouter, Route } from 'react-router-dom';
import { Auth } from '../components/Auth/Auth';
import App from '../App';
import { onAuthStateChanged } from 'firebase/auth';
import { ProtectedRoute } from '../components/Auth/ProtectedRoute';
import { use, useEffect, useState } from 'react';
import { auth } from '../firebase';

export const MainRouter = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userID, setUserID] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        const userID = user.email.replace(/@.*/, '');
        setUserID(userID);
        setIsFetching(false);
        return;
      }
      setUser(null);
      setIsFetching(false);
    });
  }, []);

  if (isFetching) {
    return <h2>Loading...</h2>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<Auth user={user} />}></Route>
        <Route
          path="/App"
          element={
            <ProtectedRoute user={user}>
              <App user={userID} />
            </ProtectedRoute>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
};
