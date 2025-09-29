// src/components/horarios/ProfessoresManager.js
import React, { useState, useEffect } from 'react';
import './ProfessoresManager.css';
import 'boxicons/css/boxicons.min.css';

const ProfessoresManager = ({ professoresDaRede, professoresAlocadosNaEscola, setTodosProfessores, onDesalocar }) => {
    const [formacoesDisponiveis, setFormacoesDisponiveis] = useState([]);

    const [editingMatricula, setEditingMatricula] = useState(null);
    const [nomeProf, setNomeProf] = useState('');
    const [matriculaProf, setMatriculaProf] = useState('');
    const [formacoesSelecionadas, setFormacoesSelecionadas] = useState(new Set());

    useEffect(() => {
        // Esta parte é crucial: ela lê todos os professores e extrai as formações únicas
        if (professoresDaRede && professoresDaRede.length > 0) {
            const todasFormacoes = professoresDaRede.flatMap(p => p.formacoes || []);
            setFormacoesDisponiveis([...new Set(todasFormacoes)].sort());
        }
    }, [professoresDaRede]);

    const handleCheckboxChange = (formacao) => {
        const novasFormacoes = new Set(formacoesSelecionadas);
        if (novasFormacoes.has(formacao)) {
            novasFormacoes.delete(formacao);
        } else {
            novasFormacoes.add(formacao);
        }
        setFormacoesSelecionadas(novasFormacoes);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (editingMatricula) {
            // Lógica para ATUALIZAR
            const professoresAtualizados = professoresDaRede.map(prof => {
                if (prof.matricula === editingMatricula) {
                    return { ...prof, nome: nomeProf.toUpperCase(), formacoes: Array.from(formacoesSelecionadas) };
                }
                return prof;
            });
            setTodosProfessores(professoresAtualizados);
            alert('Professor atualizado com sucesso!');
        } else {
            // Lógica para ADICIONAR
            if (!nomeProf || !matriculaProf || formacoesSelecionadas.size === 0) {
                alert('Por favor, preencha o nome, a matrícula e selecione ao menos uma formação.');
                return;
            }
            const matriculaExiste = professoresDaRede.some(prof => prof.matricula === matriculaProf);
            if (matriculaExiste) {
                alert(`A matrícula "${matriculaProf}" já está em uso por outro professor na rede.`);
                return;
            }
            const novoProfessor = { matricula: matriculaProf, nome: nomeProf.toUpperCase(), formacoes: Array.from(formacoesSelecionadas) };
            setTodosProfessores(prev => [...prev, novoProfessor].sort((a, b) => a.nome.localeCompare(b.nome)));
        }
        limparFormulario();
    };

    const limparFormulario = () => {
        setNomeProf('');
        setMatriculaProf('');
        setFormacoesSelecionadas(new Set());
        setEditingMatricula(null);
    };

    const handleStartEdit = (prof) => {
        setEditingMatricula(prof.matricula);
        setNomeProf(prof.nome);
        setMatriculaProf(prof.matricula);
        setFormacoesSelecionadas(new Set(prof.formacoes));
    };

    const professoresParaExibir = (professoresDaRede || []).filter(prof => 
        (professoresAlocadosNaEscola || []).includes(prof.nome)
    );

    return (
        <div className="card">
            <h2><i className='bx bxs-user-cog'></i> Gestão de Professores</h2>
            <p className="muted">Adicione novos professores à rede ou edite e desaloque os professores desta unidade.</p>

            <form className="prof-form" onSubmit={handleFormSubmit}>
                <div className="form-field nome">
                    <label htmlFor="novo-prof-nome">{editingMatricula ? 'Editando Professor' : 'Nome Completo'}</label>
                    <input type="text" id="novo-prof-nome" value={nomeProf} onChange={(e) => setNomeProf(e.target.value)} />
                </div>
                <div className="form-field matricula">
                    <label htmlFor="novo-prof-matricula">Matrícula</label>
                    <input 
                        type="text" 
                        id="novo-prof-matricula" 
                        maxLength="6"
                        value={matriculaProf}
                        onChange={(e) => setMatriculaProf(e.target.value.replace(/\D/g, ''))}
                        disabled={!!editingMatricula}
                    />
                </div>
                <div className="form-field formacoes">
                    <label>Formações / Perfis</label>
                    <div className="formacoes-checkboxes">
                        {formacoesDisponiveis.map(formacao => (
                            <div key={formacao} className="checkbox-item">
                                <input 
                                    type="checkbox" 
                                    id={`formacao-${formacao}`}
                                    value={formacao}
                                    checked={formacoesSelecionadas.has(formacao)}
                                    onChange={() => handleCheckboxChange(formacao)}
                                />
                                <label htmlFor={`formacao-${formacao}`}>{formacao}</label>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="form-actions">
                    <button type="submit" className="btn-add-prof">
                        <i className={editingMatricula ? 'bx bxs-save' : 'bx bx-plus'}></i> 
                        {editingMatricula ? 'Salvar Alterações' : 'Adicionar'}
                    </button>
                    {editingMatricula && (
                        <button type="button" className="btn-cancel" onClick={limparFormulario}>Cancelar</button>
                    )}
                </div>
            </form>

            <div className="prof-list-container">
                <h3><i className='bx bxs-user-detail'></i> Professores Alocados na Unidade</h3>
                <div className="prof-list">
                    {professoresParaExibir.map(prof => (
                        <div className="prof-item" key={prof.matricula}>
                            <div className="prof-item-info">
                                <strong>{prof.nome}</strong>
                                <div className="prof-formacoes-badges">
                                    {(prof.formacoes || []).map(f => <span key={f} className="badge">{f}</span>)}
                                </div>
                            </div>
                            <div className="prof-item-actions">
                                <button onClick={() => handleStartEdit(prof)} className="btn-action edit" title="Editar"><i className='bx bxs-edit'></i></button>
                                <button onClick={() => onDesalocar(prof.nome)} className="btn-action remove" title="Desalocar da Unidade"><i className='bx bxs-trash'></i></button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProfessoresManager;