import { Routes, BrowserRouter, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import { Auth } from '../components/Auth/Auth';
import { ProtectedRoute } from '../components/Auth/ProtectedRoute';
import { useEffect, useState } from 'react';
import App from '../components/App/App';

export const MainRouter = () => {
  const [userID, setUserID] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      if (user) {
        const userID = user.email.replace(/@.*/, '');
        setUserID(userID);
      } else {
        setUserID(null);
      }

      setIsFetching(false);
    });
  }, []);

  if (isFetching) return;

  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<Auth user={userID} />}></Route>
        <Route
          path="/App"
          element={<ProtectedRoute user={userID} children={<App user={userID} />} />}
        />
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};
