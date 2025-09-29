// src/components/layout/DashboardLayout.js
import React from 'react';
import Sidebar from './Sidebar'; // Vamos criar este componente a seguir
import './DashboardLayout.css'; // Estilos para o layout

// Este componente recebe 'children', que será o conteúdo da nossa página
const DashboardLayout = ({ children }) => {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="dashboard-main-content">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;