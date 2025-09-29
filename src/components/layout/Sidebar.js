// src/components/layout/Sidebar.js
import React, { useContext } from 'react'; // 1. Importar o hook useContext
import { Link } from 'react-router-dom';
import './Sidebar.css';
import 'boxicons/css/boxicons.min.css';
import { SchoolContext } from '../../context/SchoolContext'; // 2. Importar nosso contexto

const Sidebar = () => {
  // 3. Usar o hook para ler os dados da "mochila"
  const { escolaSelecionada } = useContext(SchoolContext);

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>Avalia+</h2>
        {/* 4. Exibir o nome da escola SE ela tiver sido selecionada */}
        {escolaSelecionada && (
          <span className="sidebar-school-name">{escolaSelecionada}</span>
        )}
      </div>
      <nav className="sidebar-nav">
        <ul>
          <li className="active"><Link to="/dashboard"><i className='bx bxs-dashboard'></i> Dashboard</Link></li>
          <li><Link to="#"><i className='bx bxs-file-doc'></i> Planejamento</Link></li>
          <li><Link to="/horarios"><i className='bx bxs-time'></i> Horários & Turmas</Link></li>
          <li><Link to="#"><i className='bx bxs-user-plus'></i> Substitutos</Link></li>
          <li><Link to="#"><i className='bx bxs-user-minus'></i> Ausências</Link></li>
          <li><Link to="#"><i className='bx bxs-calendar-check'></i> Prazos</Link></li>
          <li><Link to="#"><i className='bx bxs-chalkboard'></i> Conselho de Classe</Link></li>
          <li><Link to="#"><i className='bx bxs-book-content'></i> Diário de Bordo</Link></li>
          <li><Link to="#"><i className='bx bxs-message-dots'></i> Mensagens</Link></li>
          <li><Link to="#"><i className='bx bxs-report'></i> Relatórios</Link></li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;