import { Navigate } from 'react-router-dom';
import { useUserContext } from '../../Contexts/userContext';

export const ProtectedRoute = ({ children }) => {
  const user = useUserContext();
  return user ? children : <Navigate to="/" />;
};
