// src/components/HorariosPage.js
import React, { useState, useEffect, useContext } from 'react';
import DashboardLayout from './layout/DashboardLayout';
import { SchoolContext } from '../context/SchoolContext';
import { Link } from 'react-router-dom';
import './HorariosPage.css';
import 'boxicons/css/boxicons.min.css';
import ConfigurarUnidade from './horarios/ConfigurarUnidade';
import CargaHoraria from './horarios/CargaHoraria';
import ProfessoresManager from './horarios/ProfessoresManager';
import LancarHorario from './horarios/LancarHorario';

const HorariosPage = () => {
    const { escolaSelecionada } = useContext(SchoolContext);
    const [activeTab, setActiveTab] = useState('config');

    const [professoresAlocados, setProfessoresAlocados] = useState([]);
    const [turmas, setTurmas] = useState([]);
    const [cargas, setCargas] = useState({});
    const [gradesSalvas, setGradesSalvas] = useState({});

    useEffect(() => {
        if (escolaSelecionada) {
            console.log(`Escola mudou para: ${escolaSelecionada}. Carregando dados...`);
            try {
                const alocadosSalvos = localStorage.getItem(`alocados_${escolaSelecionada}`);
                setProfessoresAlocados(alocadosSalvos ? JSON.parse(alocadosSalvos) : []);

                const turmasSalvas = localStorage.getItem(`turmas_${escolaSelecionada}`);
                setTurmas(turmasSalvas ? JSON.parse(turmasSalvas) : []);

                const cargasSalvas = localStorage.getItem(`cargas_${escolaSelecionada}`);
                setCargas(cargasSalvas ? JSON.parse(cargasSalvas) : {});

                const todasGradesSalvas = localStorage.getItem('gradesSalvas');
                setGradesSalvas(todasGradesSalvas ? JSON.parse(todasGradesSalvas) : {});

            } catch (error) {
                console.error("Erro ao ler dados do localStorage", error);
                setProfessoresAlocados([]);
                setTurmas([]);
                setCargas({});
                setGradesSalvas({});
            }
        }
    }, [escolaSelecionada]);

    useEffect(() => {
        if (escolaSelecionada) {
            localStorage.setItem(`alocados_${escolaSelecionada}`, JSON.stringify(professoresAlocados));
        }
    }, [professoresAlocados, escolaSelecionada]);

    useEffect(() => {
        if (escolaSelecionada) {
            localStorage.setItem(`turmas_${escolaSelecionada}`, JSON.stringify(turmas));
        }
    }, [turmas, escolaSelecionada]);

    useEffect(() => {
        if (escolaSelecionada) {
            localStorage.setItem(`cargas_${escolaSelecionada}`, JSON.stringify(cargas));
        }
    }, [cargas, escolaSelecionada]);
    
    const [todosProfessores, setTodosProfessores] = useState([]);
    const [escolas, setEscolas] = useState([]);
    
    useEffect(() => {
        fetch('/dados.json')
          .then(res => res.json())
          .then(data => {
            setTodosProfessores(data.PROFESSORES.sort((a, b) => a.nome.localeCompare(b.nome)));
            setEscolas(data.ESCOLAS);
          });
    }, []);

    const handleAlocar = (nome) => {
        setProfessoresAlocados(prev => [...prev, nome].sort());
    };
    const handleDesalocar = (nome) => {
        setProfessoresAlocados(prev => prev.filter(p => p !== nome));
    };
    
    const escolaObject = escolas.find(e => e.name === escolaSelecionada);

    const renderActiveTabContent = () => {
        if (!escolaObject) {
            return <div className="card">Carregando dados da escola...</div>;
        }
        const nomesProfessoresDaRede = todosProfessores.map(p => p.nome);
        const professoresDisponiveis = nomesProfessoresDaRede.filter(p => !professoresAlocados.includes(p));

        switch (activeTab) {
            case 'config':
                return <ConfigurarUnidade escola={escolaObject} professoresDisponiveis={professoresDisponiveis} professoresAlocados={professoresAlocados} onAlocar={handleAlocar} onDesalocar={handleDesalocar} turmas={turmas} setTurmas={setTurmas} />;
            case 'professores':
                return <ProfessoresManager professoresDaRede={todosProfessores} professoresAlocadosNaEscola={professoresAlocados} setTodosProfessores={setTodosProfessores} onDesalocar={handleDesalocar} />;
            case 'carga':
                return <CargaHoraria escolaSelecionada={escolaSelecionada} professoresAlocados={professoresAlocados} cargas={cargas} setCargas={setCargas} gradesSalvas={gradesSalvas} />;
            case 'lancar':
                return <LancarHorario turmasCadastradas={turmas} professoresAlocados={professoresAlocados} todosProfessores={todosProfessores} cargas={cargas} />;
            default:
                return <div>Selecione uma aba.</div>;
        }
    };
    
        if (!escolaSelecionada) {
        return (
            <DashboardLayout>
                <div className="card">
                    <h2>Nenhuma Unidade Selecionada</h2>
                    <p className="muted">Por favor, volte à página inicial para selecionar uma unidade escolar antes de prosseguir.</p>
                    <Link to="/" className="button button-primary" style={{textDecoration: 'none'}}>Voltar à Seleção</Link>
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <div className="horarios-header">
                <h1><i className='bx bxs-calendar-alt'></i> Gestão de Horários</h1>
                <span className="header-badge">{escolaSelecionada}</span>
            </div>
            <nav className="module-nav">
                <button onClick={() => setActiveTab('config')} className={activeTab === 'config' ? 'active' : ''}>Configurar Unidade</button>
                <button onClick={() => setActiveTab('professores')} className={activeTab === 'professores' ? 'active' : ''}>Professores</button>
                <button onClick={() => setActiveTab('carga')} className={activeTab === 'carga' ? 'active' : ''}>Carga Horária</button>
                <button onClick={() => setActiveTab('lancar')} className={activeTab === 'lancar' ? 'active' : ''}>Lançar Horário</button>
            </nav>
            <div className="tab-content">
                {renderActiveTabContent()}
            </div>
        </DashboardLayout>
    );
};

export default HorariosPage;