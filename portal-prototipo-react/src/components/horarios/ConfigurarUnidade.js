// src/components/horarios/ConfigurarUnidade.js
import React, { useState, useEffect } from 'react';
import './ConfigurarUnidade.css';
import 'boxicons/css/boxicons.min.css';

const ConfigurarUnidade = ({ escola, professoresDisponiveis, professoresAlocados, onAlocar, onDesalocar, turmas, setTurmas }) => {
  const [busca, setBusca] = useState('');
  
  const [segmentoSelecionado, setSegmentoSelecionado] = useState('');
  const [grupoAnoSelecionado, setGrupoAnoSelecionado] = useState('');

  useEffect(() => {
    if (escola && escola.oferta) {
      const primeiroSegmento = Object.keys(escola.oferta)[0];
      setSegmentoSelecionado(primeiroSegmento);
    }
  }, [escola]);

  useEffect(() => {
    if (escola && escola.oferta && segmentoSelecionado) {
      const primeiroGrupoAno = escola.oferta[segmentoSelecionado][0];
      setGrupoAnoSelecionado(primeiroGrupoAno);
    }
  }, [escola, segmentoSelecionado]);

  const professoresFiltrados = professoresDisponiveis.filter(p => 
    p.toLowerCase().includes(busca.toLowerCase())
  );

  const handleDragStart = (e, nomeProfessor) => {
    e.dataTransfer.setData("nomeProfessor", nomeProfessor);
  };
  const handleDragOver = (e) => {
    e.preventDefault();
  };
  const handleDropNaListaDeAlocados = (e) => {
    e.preventDefault();
    const nomeProfessor = e.dataTransfer.getData("nomeProfessor");
    if (nomeProfessor && !professoresAlocados.includes(nomeProfessor)) {
      onAlocar(nomeProfessor);
    }
  };
  const handleDropNaListaDeDisponiveis = (e) => {
    e.preventDefault();
    const nomeProfessor = e.dataTransfer.getData("nomeProfessor");
    if (nomeProfessor && professoresAlocados.includes(nomeProfessor)) {
      onDesalocar(nomeProfessor);
    }
  };

  const handleAddTurma = () => {
    const nomeTurma = document.getElementById('turma-nome')?.value;
    const turno = document.getElementById('turma-turno')?.value;
    
    if (!segmentoSelecionado || !grupoAnoSelecionado || !nomeTurma || !turno) {
      alert('Por favor, preencha todos os campos da turma.');
      return;
    }

    const isDuplicate = turmas.some(turma => 
      turma.grupoAno === grupoAnoSelecionado && 
      turma.nome === nomeTurma
    );

    if (isDuplicate) {
      alert(`Erro: A turma '${grupoAnoSelecionado} - Turma ${nomeTurma}' já existe nesta unidade.`);
      return;
    }

    const novaTurma = { id: Date.now(), segmento: segmentoSelecionado, grupoAno: grupoAnoSelecionado, nome: nomeTurma, turno };
    setTurmas([...turmas, novaTurma]);
  };
  
  const handleRemoveTurma = (id) => {
    setTurmas(turmas.filter(t => t.id !== id));
  };

  return (
    <div className="card"> 
      <div className="config-header">
        <div>
          <h2>Configurar Unidade</h2>
          <p className="muted">Siga os passos para parametrizar a escola antes de criar os horários.</p>
        </div>
        <div className="header-actions">
          <button onClick={() => alert('Funcionalidade "Gerenciar Substituições" a ser implementada.')} className="btn-ghost">
            <i className='bx bxs-user-clock'></i> Gerenciar Substituições
          </button>
          <button onClick={() => alert('Funcionalidade "Editar Oferta" a ser implementada.')} className="btn-ghost">
            <i className='bx bxs-edit'></i> Editar Oferta da Unidade
          </button>
        </div>
      </div>
      
      <div className="teacher-allocation-container">
        <div>
          <h3>Professores da Rede</h3>
          <div className="field">
            <input
              type="search"
              placeholder="Buscar professor..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </div>
          <div 
            className="teacher-list-box" 
            onDragOver={handleDragOver} 
            onDrop={handleDropNaListaDeDisponiveis}
          >
            {professoresFiltrados.map(nome => (
              <div 
                key={nome} 
                className="teacher-item" 
                draggable="true" 
                onDragStart={(e) => handleDragStart(e, nome)}
              >
                <span>{nome}</span>
                <button onClick={() => onAlocar(nome)} className="btn-add" title="Alocar professor">+</button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3>Professores Alocados na Unidade</h3>
          <div 
            className="teacher-list-box" 
            onDragOver={handleDragOver} 
            onDrop={handleDropNaListaDeAlocados}
          >
            {professoresAlocados.length === 0 ? (
              <div className="empty-state">Arraste um professor aqui.</div>
            ) : (
              professoresAlocados.map(nome => (
                <div 
                  key={nome} 
                  className="teacher-item" 
                  draggable="true" 
                  onDragStart={(e) => handleDragStart(e, nome)}
                >
                  <span>{nome}</span>
                  <button onClick={() => onDesalocar(nome)} className="btn-remove" title="Desalocar professor">-</button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="turma-management-container">
        <h3><i className="bx bx-plus-circle"></i> Adicionar Turmas</h3>
        <div className="turma-form-grid">
          <div className="field">
            <label htmlFor="turma-segmento">Segmento</label>
            <select id="turma-segmento" value={segmentoSelecionado} onChange={e => setSegmentoSelecionado(e.target.value)}>
              {escola && escola.oferta && Object.keys(escola.oferta).map(seg => <option key={seg} value={seg}>{seg}</option>)}
            </select>
          </div>
          <div className="field">
            <label htmlFor="turma-grupoano">Grupo/Ano</label>
            <select id="turma-grupoano" value={grupoAnoSelecionado} onChange={e => setGrupoAnoSelecionado(e.target.value)}>
              {escola && escola.oferta && segmentoSelecionado && escola.oferta[segmentoSelecionado].map(ano => <option key={ano} value={ano}>{ano}</option>)}
            </select>
          </div>
          <div className="field">
            <label htmlFor="turma-nome">Turma</label>
            <select id="turma-nome">
              <option>A</option> <option>B</option> <option>C</option> <option>D</option> <option>E</option>
            </select>
          </div>
          <div className="field">
            <label htmlFor="turma-turno">Turno</label>
            <select id="turma-turno">
              <option>MATUTINO</option> <option>VESPERTINO</option> <option>INTEGRAL</option> <option>NOTURNO</option>
            </select>
          </div>
          <button onClick={handleAddTurma} className="btn-add-turma">+</button>
        </div>

        <div className="turma-list-box">
          <h3><i className="bx bx-list-ul"></i> Turmas Cadastradas</h3>
          {turmas.length === 0 ? (
            <div className="empty-state">Nenhuma turma cadastrada.</div>
          ) : (
            turmas.map(turma => (
              <div key={turma.id} className="turma-item">
                <span>{turma.grupoAno} - Turma {turma.nome} ({turma.turno})</span>
                <button onClick={() => handleRemoveTurma(turma.id)} className="btn-remove-turma">×</button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ConfigurarUnidade;