import { createRoot } from 'react-dom/client';
import { App } from './App';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './styles/global.scss';

createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter basename={import.meta.env.BASE_URL}>
    <App />
  </BrowserRouter>,
);
