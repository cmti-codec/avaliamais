// src/components/horarios/PainelDeDisciplinas.js
import React from 'react';
import './PainelDeDisciplinas.css';
import 'boxicons/css/boxicons.min.css';

const PainelDeDisciplinas = ({ disciplinas, disciplinaSelecionada, onSelectDisciplina, grade }) => {

  const contarAlocadas = (nomeDisciplina) => {
    return Object.values(grade).filter(d => d === nomeDisciplina).length;
  };

  return (
    <aside className="card side">
      <h3><i className='bx bxs-layer'></i> Disciplinas da Turma</h3>
      <div className="disciplinas-lista">
        {(disciplinas && disciplinas.length > 0) ? (
          disciplinas.map(disc => {
            const alocadas = contarAlocadas(disc.nome);
            const isSelected = disciplinaSelecionada === disc.nome;
            const isCompleted = alocadas >= disc.total;

            return (
              <div 
                key={disc.nome} 
                className={`disciplina-item ${isSelected ? 'selected' : ''} ${isCompleted ? 'completed' : ''}`}
                onClick={() => onSelectDisciplina(disc.nome)}
              >
                <span className="disciplina-nome">{disc.nome}</span>
                <div className="disciplina-carga">
                  <span className="alocadas">{alocadas}</span>
                  <span className="total">/ {disc.total}</span>
                </div>
                <div className="progress-bar">
                  <div 
                    className="progress-bar-fill" 
                    style={{ width: `${(alocadas / disc.total) * 100}%` }}
                  ></div>
                </div>
              </div>
            );
          })
        ) : (
          <p className="muted">Selecione uma turma para ver as disciplinas.</p>
        )}
      </div>
    </aside>
  );
};

export default PainelDeDisciplinas;