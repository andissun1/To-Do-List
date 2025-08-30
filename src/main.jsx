import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { MainRouter } from './Router/MainRouter.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MainRouter>
      <App />
    </MainRouter>
  </StrictMode>
);
