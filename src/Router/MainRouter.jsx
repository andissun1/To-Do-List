import { Routes, BrowserRouter, Route, Navigate } from 'react-router-dom';
import { Auth } from '../components/Auth/Auth';
import { ProtectedRoute } from '../components/Auth/ProtectedRoute';
import { UserProvider } from '../Contexts/userContext';
import App from '../components/App/App';
import { ServerRequestsProvider } from '../Contexts/serverRequests';

export const MainRouter = () => (
  <UserProvider>
    <ServerRequestsProvider>
      <BrowserRouter>
        <Routes>
          <Route index path="/" element={<Auth />}></Route>
          <Route path="/App" element={<ProtectedRoute children={<App />} />} />
          <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </ServerRequestsProvider>
  </UserProvider>
);
