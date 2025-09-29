// src/components/SelecaoEscolaPage.js
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { SchoolContext } from '../context/SchoolContext';
import './SelecaoEscolaPage.css';

const SelecaoEscolaPage = () => {
  const [escolas, setEscolas] = useState([]);
  // Pegando a função para "guardar" a escola na nossa mochila (Context)
  const { setEscolaSelecionada } = useContext(SchoolContext);
  // Hook do React Router para nos permitir navegar para outra página
  const navigate = useNavigate();

  // Busca a lista de escolas do arquivo dados.json quando a página carrega
  useEffect(() => {
    fetch('/dados.json')
      .then(res => res.json())
      .then(data => setEscolas(data.ESCOLAS))
      .catch(error => console.error("Erro ao buscar escolas:", error));
  }, []);

  // Função que é chamada quando o usuário seleciona uma escola no dropdown
  const handleSelectSchool = (e) => {
    const nomeEscola = e.target.value;
    if (nomeEscola) {
      setEscolaSelecionada(nomeEscola); // Coloca a escola na "mochila"
      navigate('/ambiente'); // Redireciona o usuário para a escolha do ambiente
    }
  };

  return (
    <div className="selecao-container">
      <div className="selecao-card">
        <h1>Bem-vindo ao Avalia+</h1>
        <p>Para começar, selecione a unidade escolar que deseja gerenciar.</p>
        <select onChange={handleSelectSchool} defaultValue="">
          <option value="" disabled>-- Selecione uma unidade --</option>
          {escolas.map(escola => (
            <option key={escola.name} value={escola.name}>
              {escola.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SelecaoEscolaPage;