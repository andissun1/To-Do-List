import { onAuthStateChanged } from 'firebase/auth';
import { createContext, useContext } from 'react';
import { useEffect, useState } from 'react';
import { auth } from '../firebase';

const UserContext = createContext(null);
export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
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

  return <UserContext value={userID}>{children}</UserContext>;
};
