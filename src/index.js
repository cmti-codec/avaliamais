// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { SchoolProvider } from './context/SchoolContext'; // <-- 1. IMPORTAR O PROVIDER

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* 2. ENVELOPAR O <App /> COM O PROVIDER 👇 */}
    <SchoolProvider>
      <App />
    </SchoolProvider>
  </React.StrictMode>
);

