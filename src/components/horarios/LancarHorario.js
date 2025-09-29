// src/components/horarios/LancarHorario.js
import React, { useState, useEffect } from 'react';
import './LancarHorario.css';
import { MATRIZ_CURRICULAR } from '../../config';
import SlotHorario from './SlotHorario'; // Importa a nossa nova célula

const DIAS_DA_SEMANA = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta"];
const TEMPOS_DE_AULA = ["1º tempo", "2º tempo", "3º tempo", "4º tempo", "5º tempo"];

// Passamos a lista completa de professores para cá
const LancarHorario = ({ turmasCadastradas = [], professoresAlocados = [], todosProfessores = [] }) => {
  const [turmaSelecionadaId, setTurmaSelecionadaId] = useState('');
  const [disciplinas, setDisciplinas] = useState([]);
  const [grade, setGrade] = useState({}); // O estado da grade agora guarda objetos {componente, professor}

  useEffect(() => {
    if (!turmaSelecionadaId) {
      setDisciplinas([]);
      setGrade({});
      return;
    }
    const turma = turmasCadastradas.find(t => t.id === parseInt(turmaSelecionadaId));
    if (turma) {
      const matriz = MATRIZ_CURRICULAR[turma.segmento]?.[turma.grupoAno];
      if (matriz) {
        const disciplinasDaTurma = Object.entries(matriz).map(([nome, total]) => ({ nome, total }));
        setDisciplinas(disciplinasDaTurma);
      } else {
        setDisciplinas([]);
      }
    }
  }, [turmaSelecionadaId, turmasCadastradas]);

  return (
    <div className="lancar-horario-container">
      <div className="card">
        <div className="field">
          <label htmlFor="turma-horario-selecao">Selecione a Turma para Lançar o Horário</label>
          <select 
            id="turma-horario-selecao" 
            value={turmaSelecionadaId} 
            onChange={e => setTurmaSelecionadaId(e.target.value)}
          >
            <option value="">-- Selecione uma turma --</option>
            {turmasCadastradas.map(turma => (
              <option key={turma.id} value={turma.id}>
                {turma.grupoAno} - Turma {turma.nome} ({turma.turno})
              </option>
            ))}
          </select>
        </div>
      </div>

      {turmaSelecionadaId && (
        <div className="main-container" style={{marginTop: '20px'}}>
          <div className="card main-content">
            <table className="grade-horario">
              <thead>
                <tr>
                  <th>Horário</th>
                  {DIAS_DA_SEMANA.map(dia => <th key={dia}>{dia}</th>)}
                </tr>
              </thead>
              <tbody>
                {TEMPOS_DE_AULA.map(tempo => (
                  <tr key={tempo}>
                    <td>{tempo}</td>
                    {DIAS_DA_SEMANA.map(dia => (
                      <SlotHorario
                        key={`${dia}-${tempo}`}
                        dia={dia}
                        tempo={tempo}
                        grade={grade}
                        setGrade={setGrade}
                        disciplinas={disciplinas}
                        professoresAlocados={professoresAlocados}
                        todosProfessores={todosProfessores}
                      />
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* O PainelDeCargas virá aqui no futuro */}
        </div>
      )}
    </div>
  );
};

export default LancarHorario;