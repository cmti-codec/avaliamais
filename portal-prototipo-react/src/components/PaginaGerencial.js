// src/components/PaginaGerencial.js
import React from 'react';

function PaginaGerencial() {
  return (
    <>
      <header className="simple-header">
        <h1>Módulo Gerencial</h1>
        <a href="#">Sair</a>
      </header>
      <main className="main-content">
        <h2>Painel de Controle</h2>
        <div className="dashboard-grid">
          [cite_start]<a href="#" className="dashboard-card"><h3>✔ Validação de Diários</h3><p>Aprovar ou devolver diários de classe após o conselho. [cite: 108, 247]</p></a>
          [cite_start]<a href="#" className="dashboard-card"><h3>📋 Aprovação de Planejamentos</h3><p>Visualizar e aprovar os planos de aula enviados pelos professores. [cite: 20, 284]</p></a>
          [cite_start]<a href="#" className="dashboard-card"><h3>📊 Relatórios Pedagógicos</h3><p>Gerar relatórios de desempenho, frequência e pendências. [cite: 92, 248]</p></a>
          <a href="/horarios" className="dashboard-card"><h3>🗓️ Horários e Turmas</h3>{/*...*/}</a>
          [cite_start]<a href="#" className="dashboard-card"><h3>📒 Diário de Bordo (Ocorrências)</h3><p>Consultar o histórico de ocorrências por turma ou aluno. [cite: 81, 283]</p></a>
          [cite_start]<a href="#" className="dashboard-card"><h3>📅 Configurar Calendário</h3><p>Definir feriados, recessos e dias não letivos para a escola. [cite: 35, 245]</p></a>
        </div>
      </main>
    </>
  );
}

export default PaginaGerencial;