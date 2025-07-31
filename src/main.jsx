import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { TaskItem } from './components/TaskItem.jsx';

import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/task/:id" element={<TaskItem />} />
        <Route path="/404" element={<div>Ошибка 404. Страница не найдена.</div>} />
        <Route path="*" element={<Navigate to="/404" replace={true} />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
