// src/components/DashboardPage.js
import React, { useState, useEffect } from 'react';
import DashboardLayout from './layout/DashboardLayout';
import './DashboardPage.css';
import 'boxicons/css/boxicons.min.css';
import QuadroProfessores from './QuadroProfessores';
import GerenciamentoAcessos from './GerenciamentoAcessos';

const SummaryCard = ({ icon, color, value, title, subtitle }) => (
    <div className="summary-card" style={{ '--icon-bg': color }}>
        <div className="card-icon"><i className={`bx ${icon}`}></i></div>
        <div className="card-info">
            <p className="card-value">{value}</p>
            <h3>{title}</h3>
            <span>{subtitle}</span>
        </div>
    </div>
);

const DashboardPage = () => {
    const [professores, setProfessores] = useState([]);

    useEffect(() => {
        fetch('/dados.json')
            .then(response => response.json())
            .then(data => {
                const professoresCompletos = data.PROFESSORES.map(prof => ({
                    ...prof,
                    diarios: 13,
                    diasAtraso: "190/420",
                    status: ["Ruim", "Regular", "Ótimo"][Math.floor(Math.random() * 3)],
                    acessosDiariosAtraso: Math.floor(Math.random() * 31) + 220
                }));
                setProfessores(professoresCompletos);
            })
            .catch(error => console.error("Erro ao buscar dados dos professores:", error));
    }, []);

    return (
        <DashboardLayout>
            <header className="dashboard-header">
                <h1>Olá, bem vindo ao Avalia+!</h1>
            </header>
            {/* Secção de Visão Geral completa */}
            <h2 className="section-title">Visão Geral</h2>
            <section className="summary-grid">
                <SummaryCard icon="bxs-error-alt" color="#e74c3c" value="12" title="Pendências" subtitle="Professores sem planejamento" />
                <SummaryCard icon="bxs-file-find" color="#3498db" value="48" title="Planejamentos" subtitle="Aguardando validação" />
                <SummaryCard icon="bxs-calendar-star" color="#f1c40f" value="2" title="Datas" subtitle="Sábados letivos este mês" />
                <SummaryCard icon="bxs-group" color="#2ecc71" value="3" title="Conselhos" subtitle="Em andamento" />
            </section>
            {/* Grid principal com duas colunas */}
            <div className="dashboard-main-grid">
                {/* Coluna da Esquerda */}
                <div className="main-col">
                    {/* Card do bimestre completo */}
                    <div className="bimestre-card">
                        <div className="bimestre-dias">13 dias</div>
                        <p>para o fechamento do bimestre</p>
                        <ul>
                            <li>7 dias para o envio dos diários</li>
                            <li>7 dias para a aprovação dos diários</li>
                            <li>12/24 diários em andamento</li>
                            <li>7/24 diários finalizados</li>
                            <li>Médias das notas: 6,4</li>
                        </ul>
                    </div>
                    {/* Novo componente de gerenciamento de acessos */}
                    <GerenciamentoAcessos professores={professores} />
                </div>

                {/* Coluna da Direita */}
                <div className="side-col">
                    {/* Card de diários completo */}
                    <div className="diarios-card">
                        <h3>Diários submetidos ontem</h3>
                        <div className="diarios-total">250</div>
                        <p>Total</p>
                        <div className="diarios-detalhes">
                            <div className="detalhe-item nao-preenchido">
                                <span>150</span>
                                <p>Não preenchidos</p>
                            </div>
                            <div className="detalhe-item preenchido">
                                <span>100</span>
                                <p>Preenchidos</p>
                            </div>
                        </div>
                    </div>
                    {/* Componente do quadro de professores */}
                    <QuadroProfessores professores={professores} />
                </div>
            </div>        
        </DashboardLayout>
    );
};

export default DashboardPage;