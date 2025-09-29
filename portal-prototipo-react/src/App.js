// src/App.js
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DashboardPage from './components/DashboardPage';
import HorariosPage from './components/HorariosPage';
import SelecaoEscolaPage from './components/SelecaoEscolaPage';
import AmbientePage from './components/AmbientePage'; // Importa a nova página

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SelecaoEscolaPage />} />
        <Route path="/ambiente" element={<AmbientePage />} /> {/* Nova rota */}
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/horarios" element={<HorariosPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;