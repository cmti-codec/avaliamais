// src/components/horarios/SlotHorario.js
import React from 'react';

// Adicionamos valores padrão (= {}) para 'cargas' para tornar o componente mais seguro
const SlotHorario = ({ dia, tempo, grade, setGrade, disciplinas, professoresAlocados, todosProfessores, cargas = {} }) => {
  const slotId = `${dia}-${tempo}`;
  const slotData = grade[slotId] || { componente: '', professor: '' };

  const handleComponenteChange = (e) => {
    const novoComponente = e.target.value;
    setGrade(prev => ({
      ...prev,
      [slotId]: { componente: novoComponente, professor: '' } // Reseta o professor ao mudar a disciplina
    }));
  };

  const handleProfessorChange = (e) => {
    const novoProfessor = e.target.value;
    setGrade(prev => ({
      ...prev,
      [slotId]: { ...prev[slotId], professor: novoProfessor }
    }));
  };

  // Filtra os professores que podem lecionar o componente selecionado
  // e que possuem carga horária definida
  const professoresFiltrados = (todosProfessores || []).filter(prof => {
    const estaAlocado = (professoresAlocados || []).includes(prof.nome);
    const temCargaDefinida = cargas[prof.nome]?.total > 0;
    const temFormacao = slotData.componente ? (prof.formacoes || []).includes(slotData.componente) : true;
    
    return estaAlocado && temCargaDefinida && temFormacao;
  });

  return (
    <td className={slotData.componente ? 'slot-preenchido' : 'slot-vazio'}>
      <select value={slotData.componente} onChange={handleComponenteChange} className="slot-select componente">
        <option value="">-- Componente --</option>
        {disciplinas.map(d => <option key={d.nome} value={d.nome}>{d.nome}</option>)}
      </select>
      <select value={slotData.professor} onChange={handleProfessorChange} className="slot-select professor" disabled={!slotData.componente}>
        <option value="">-- Professor --</option>
        {professoresFiltrados.map(p => <option key={p.nome} value={p.nome}>{p.nome}</option>)}
      </select>
    </td>
  );
};

export default SlotHorario;