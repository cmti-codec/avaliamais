// src/components/GerenciamentoAcessos.js
import React from 'react';
import './GerenciamentoAcessos.css';

const GerenciamentoAcessos = ({ professores }) => {
  // Vamos pegar apenas os 3 primeiros professores para este card, como no mockup
  const professoresParaExibir = professores.slice(0, 3);

  return (
    <div className="acessos-card">
      <h3>Gerenciamento de acessos</h3>
      <ul className="acessos-lista">
        {professoresParaExibir.map((prof) => (
          <li key={prof.nome} className="acesso-item">
            <div className="acesso-info">
              <img src={`https://i.pravatar.cc/40?u=${prof.nome}`} alt={prof.nome} />
              <div>
                <strong>{prof.nome}</strong>
                <span>Diários em atraso: {prof.acessosDiariosAtraso}</span>
              </div>
            </div>
            <div className="acesso-botoes">
              <button className="btn-detalhes">Ver detalhes</button>
              <button className="btn-liberar">Liberar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GerenciamentoAcessos;