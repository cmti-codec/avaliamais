// src/context/SchoolContext.js
import React, { createContext, useState } from 'react';

// Cria o contexto (a mochila em si)
export const SchoolContext = createContext();

// Cria o "Provider" (quem carrega a mochila e a disponibiliza para os outros)
export const SchoolProvider = ({ children }) => {
  const [escolaSelecionada, setEscolaSelecionada] = useState(null);

  return (
    <SchoolContext.Provider value={{ escolaSelecionada, setEscolaSelecionada }}>
      {children}
    </SchoolContext.Provider>
  );
};