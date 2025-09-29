// src/components/AmbientePage.js
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { SchoolContext } from '../context/SchoolContext';

// 1. IMPORTAR O CSS PRINCIPAL 👇
import '../App.css'; 

const AmbientePage = () => {
  const { escolaSelecionada } = useContext(SchoolContext);

  // 2. USAR A MESMA ESTRUTURA E CLASSES DA NOSSA ANTIGA PÁGINA INICIAL 👇
  return (
    <div className="initial-container">
      <div className="ambiente-header">
        Escola Selecionada: <strong>{escolaSelecionada || "Nenhuma"}</strong>
      </div>
      <h1>Selecione o Ambiente</h1>
      <p>Escolha o módulo que deseja acessar para a unidade selecionada.</p>
      <div className="button-group">
        <Link to="/dashboard" className="button button-primary">Módulo Gerencial</Link>
        <Link to="#" className="button button-secondary">Módulo Operacional</Link>
      </div>
    </div>
  );
};

export default AmbientePage;