// src/components/QuadroProfessores.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './QuadroProfessores.css';

const StatusPill = ({ status }) => {
    const statusClass = `status-${status ? status.toLowerCase() : 'default'}`;
    return <span className={`status-pill ${statusClass}`}>{status || 'N/A'}</span>;
};

const QuadroProfessores = ({ professores }) => {
    const [paginaAtual, setPaginaAtual] = useState(1);
    const itensPorPagina = 5;

    const indiceUltimoItem = paginaAtual * itensPorPagina;
    const indicePrimeiroItem = indiceUltimoItem - itensPorPagina;
    const professoresDaPagina = professores.slice(indicePrimeiroItem, indiceUltimoItem);
    
    const totalPaginas = Math.ceil(professores.length / itensPorPagina);

    const proximaPagina = () => {
        if (paginaAtual < totalPaginas) {
            setPaginaAtual(paginaAtual + 1);
        }
    };
    const paginaAnterior = () => {
        if (paginaAtual > 1) {
            setPaginaAtual(paginaAtual - 1);
        }
    };

    if (!professores || professores.length === 0) {
        return (
            <div className="quadro-professores-card">
                <header className="quadro-header"><h3>Quadro de professores</h3></header>
                <p>Carregando professores...</p>
            </div>
        );
    }

    return (
        <div className="quadro-professores-card">
            <header className="quadro-header">
                <h3>Quadro de professores</h3>
                <Link to="#" className="ver-detalhes">Ver detalhes →</Link>
            </header>
            <div className="quadro-tabela-container">
                <table>
                    <thead>
                        <tr>
                            <th>Docente</th>
                            <th>Diários em atraso</th>
                            <th>Dias em atraso</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    {/* A PARTE QUE FALTAVA ESTÁ AQUI 👇 */}
                    <tbody>
                        {professoresDaPagina.map((prof) => (
                            <tr key={prof.nome}>
                                <td>
                                    <div className="docente-info">
                                        <img src={`https://i.pravatar.cc/40?u=${prof.nome}`} alt={prof.nome} />
                                        <div>
                                            <strong>{prof.nome}</strong>
                                            <span>{prof.formacoes.join(', ')}</span>
                                        </div>
                                    </div>
                                </td>
                                <td>{prof.diarios}</td>
                                <td>{prof.diasAtraso}</td>
                                <td><StatusPill status={prof.status} /></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="pagination-controls">
                <button onClick={paginaAnterior} disabled={paginaAtual === 1}>
                    Anterior
                </button>
                <span>
                    Página {paginaAtual} de {totalPaginas}
                </span>
                <button onClick={proximaPagina} disabled={paginaAtual === totalPaginas}>
                    Próximo
                </button>
            </div>
        </div>
    );
};

export default QuadroProfessores;