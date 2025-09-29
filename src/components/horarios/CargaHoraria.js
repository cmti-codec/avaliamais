// src/components/horarios/CargaHoraria.js
import React from 'react';
import './CargaHoraria.css';
import 'boxicons/css/boxicons.min.css';

// Tabela de regras para o cálculo de Horas PL, igual à do protótipo
const REGRAS_PL = [ { min: 0, max: 0, pl: 0 }, { min: 1, max: 1, pl: 1 }, { min: 2, max: 3, pl: 2 }, { min: 4, max: 5, pl: 3 }, { min: 6, max: 6, pl: 3 }, { min: 7, max: 8, pl: 4 }, { min: 9, max: 10, pl: 6 }, { min: 11, max: 12, pl: 6 }, { min: 13, max: 14, pl: 7 }, { min: 15, max: 16, pl: 8 }, { min: 17, max: 18, pl: 9 }, { min: 19, max: 19, pl: 10 }, { min: 20, max: 21, pl: 11 }, { min: 22, max: 23, pl: 12 }, { min: 24, max: 25, pl: 13 }, { min: 26, max: 27, pl: 14 }, { min: 28, max: 29, pl: 15 }, { min: 30, max: 31, pl: 16 }, { min: 32, max: 33, pl: 17 } ];

const CargaHoraria = ({ escolaSelecionada, professoresAlocados, cargas, setCargas, gradesSalvas }) => {

  // Função para calcular o limite de PLs com base na carga contratual
  const getPlLimit = (carga) => {
    if (carga > 33) carga = 33;
    const rule = REGRAS_PL.find(r => carga >= r.min && carga <= r.max);
    return rule ? rule.pl : 0;
  };

  // Função que conta as aulas de um professor nos horários salvos da escola atual
  const calcularAulasAlocadas = (nomeProfessor) => {
    let count = 0;
    // Itera sobre todos os IDs de turma nas grades salvas
    for (const turmaId in gradesSalvas) {
      // Verifica se a turma pertence à escola selecionada
      if (turmaId.startsWith(escolaSelecionada)) {
        const grade = gradesSalvas[turmaId];
        // Itera sobre os dias da semana
        for (const dia in grade) {
          // Itera sobre os tempos de aula
          for (const tempo in grade[dia]) {
            if (grade[dia][tempo].professor === nomeProfessor) {
              count++;
            }
          }
        }
      }
    }
    return count;
  };

  const handleCargaChange = (nomeProfessor, tipo, valor) => {
    const valorNumerico = Math.max(0, parseInt(valor, 10) || 0);
    
    setCargas(cargasAnteriores => {
      const cargaAtual = cargasAnteriores[nomeProfessor] || {};
      return {
        ...cargasAnteriores,
        [nomeProfessor]: {
          ...cargaAtual,
          [tipo]: valorNumerico
        }
      };
    });
  };

  if (!professoresAlocados || professoresAlocados.length === 0) {
    return (
        <div className="card">
            <h2>Gestão de Carga Horária</h2>
            <div className="empty-state" style={{ padding: '40px 20px', textAlign: 'center' }}>
                <p>Nenhum professor alocado nesta unidade.</p>
                <span className="muted">
                    Por favor, vá para a aba "Configurar Unidade" para alocar professores primeiro.
                </span>
            </div>
        </div>
    );
  }

  return (
    <div className="card">
      <h2>Gestão de Carga Horária</h2>
      <p className="muted" style={{ marginBottom: '20px' }}>
        Registre a carga horária contratual e de planejamento de cada professor.
      </p>
      <div className="carga-horaria-container">
        <table className="carga-horaria-table">
          <thead>
            <tr>
              <th style={{ textAlign: 'left' }}>Professor</th>
              <th>Carga Contratual (Aulas)</th>
              <th>Horas PL</th>
              <th>Aulas Alocadas</th>
              <th>Saldo</th>
            </tr>
          </thead>
          <tbody>
            {professoresAlocados.map(nome => {
              const cargaContratual = cargas[nome]?.total || 0;
              const horasPL = cargas[nome]?.pl || 0;
              const aulasAlocadas = calcularAulasAlocadas(nome);
              const saldo = cargaContratual - aulasAlocadas;
              const plLimit = getPlLimit(cargaContratual);

              return (
                <tr key={nome}>
                  <td style={{ textAlign: 'left' }}>{nome}</td>
                  <td>
                    <input type="number" className="carga-input" value={cargaContratual} onChange={(e) => handleCargaChange(nome, 'total', e.target.value)} min="0" placeholder="Ex: 20" />
                  </td>
                  <td>
                    <input type="number" className="carga-input" value={horasPL} onChange={(e) => handleCargaChange(nome, 'pl', e.target.value)} min="0" max={plLimit} />
                  </td>
                  <td>{aulasAlocadas}</td>
                  <td style={{ fontWeight: 'bold', color: saldo < 0 ? '#e74c3c' : '#2ecc71' }}>
                    {saldo}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="actions-footer">
        <p className="muted" style={{flexGrow: 1}}>As alterações são salvas automaticamente.</p>
        <button className="btn-salvar disabled" disabled>
          <i className='bx bxs-save'></i> Salvar Alterações
        </button>
      </div>
    </div>
  );
};

export default CargaHoraria;