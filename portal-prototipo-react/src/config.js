// src/config.js

// Regra baseada na tabela exata de PLs. É um mapa para busca direta.
// A chave é o número de AULAS e o valor é o número de PL.
export const REGRAS_PL_MAP = {
  1: 1, 2: 2, 3: 2, 4: 2, 5: 3, 6: 3, 7: 4, 8: 4, 9: 5, 10: 5,
  11: 6, 12: 6, 13: 7, 14: 7, 15: 8, 16: 8, 17: 9, 18: 9, 19: 10, 20: 10
};

// Listas para a regra de turnos da Educação Infantil
export const EI_INTEGRAIS = ["Grupo 1", "Grupo 1 I", "Grupo 1 II", "Grupo 2", "Grupo 3"];
export const EI_MEIO = ["Grupo 4", "Grupo 5"];

export const MATRIZ_CURRICULAR = {
  "Ed. Infantil": { "Grupo 1": { "ATIVIDADES": 26, "ATIVIDADES DIVERSAS": 14 }, "Grupo 1 I": { "ATIVIDADES": 26, "ATIVIDADES DIVERSAS": 14 }, "Grupo 1 II": { "ATIVIDADES": 26, "ATIVIDADES DIVERSAS": 14 }, "Grupo 2": { "ATIVIDADES": 26, "ATIVIDADES DIVERSAS": 13, "EDUCAÇÃO FÍSICA": 1 }, "Grupo 3": { "ATIVIDADES": 26, "ATIVIDADES DIVERSAS": 12, "EDUCAÇÃO FÍSICA": 2 }, "Grupo 4": { "ATIVIDADES": 13, "EDUCAÇÃO FÍSICA": 4, "ARTE": 3 }, "Grupo 5": { "ATIVIDADES": 13, "EDUCAÇÃO FÍSICA": 4, "ARTE": 3 } },
  "1º ao 5º - EF I": { "1º Ano": { "LÍNGUA PORTUGUESA": 5, "MATEMÁTICA": 5, "HISTÓRIA": 2, "GEOGRAFIA": 1, "CIÊNCIAS": 2, "ARTE": 2, "EDUCAÇÃO FÍSICA I": 3 }, "2º Ano": { "LÍNGUA PORTUGUESA": 5, "MATEMÁTICA": 5, "HISTÓRIA": 2, "GEOGRAFIA": 1, "CIÊNCIAS": 2, "ARTE": 3, "EDUCAÇÃO FÍSICA I": 2 }, "3º Ano": { "LÍNGUA PORTUGUESA": 5, "MATEMÁTICA": 5, "HISTÓRIA": 2, "GEOGRAFIA": 1, "CIÊNCIAS": 3, "ARTE": 2, "EDUCAÇÃO FÍSICA I": 2 }, "4º Ano": { "LÍNGUA PORTUGUESA": 5, "MATEMÁTICA": 5, "HISTÓRIA": 2, "GEOGRAFIA": 1, "CIÊNCIAS": 3, "ARTE": 2, "EDUCAÇÃO FÍSICA I": 2 }, "5º Ano": { "LÍNGUA PORTUGUESA": 5, "MATEMÁTICA": 5, "HISTÓRIA": 2, "GEOGRAFIA": 1, "CIÊNCIAS": 3, "ARTE": 2, "EDUCAÇÃO FÍSICA I": 2 } },
  "6º ao 9º - EF II": { "6º Ano": { "LÍNGUA PORTUGUESA": 4, "LÍNGUA INGLESA I": 2, "MATEMÁTICA": 5, "HISTÓRIA": 2, "GEOGRAFIA": 2, "CIÊNCIAS": 2, "ARTE": 1, "EDUCAÇÃO FÍSICA I": 2 }, "7º Ano": { "LÍNGUA PORTUGUESA": 5, "LÍNGUA INGLESA I": 2, "MATEMÁTICA": 3, "HISTÓRIA": 2, "GEOGRAFIA": 1, "GEOGRAFIA REGIONAL": 1, "CIÊNCIAS": 2, "ARTE": 2, "EDUCAÇÃO FÍSICA I": 2 }, "8º Ano": { "LÍNGUA PORTUGUESA": 3, "LÍNGUA INGLESA I": 2, "MATEMÁTICA": 4, "HISTÓRIA": 1, "HISTÓRIA REGIONAL": 1, "GEOGRAFIA": 2, "CIÊNCIAS": 2, "ARTE": 3, "EDUCAÇÃO FÍSICA I": 2 }, "9º Ano": { "LÍNGUA PORTUGUESA": 3, "LÍNGUA INGLESA I": 1, "LÍNGUA INGLESA II": 1, "MATEMÁTICA": 3, "APLICAÇÕES MATEMÁTICAS": 1, "HISTÓRIA": 2, "GEOGRAFIA": 2, "CIÊNCIAS I": 1, "CIÊNCIAS II": 1, "ARTE": 2, "EDUCAÇÃO FÍSICA I": 1, "EDUCAÇÃO FÍSICA II": 1, "INICIAÇÃO AOS ESTUDOS LITERÁRIOS": 1 } },
  "EJA": { "EJA Inicial": { "LÍNGUA PORTUGUESA": 5, "EDUCAÇÃO FÍSICA": 2, "ARTE": 2, "MATEMÁTICA": 5, "HISTÓRIA": 2, "GEOGRAFIA": 2, "CIÊNCIAS": 3 }, "EJA Intermediário": { "LÍNGUA PORTUGUESA": 3, "LÍNGUA INGLESA": 1, "EDUCAÇÃO FÍSICA": 1, "ARTE": 1, "MATEMÁTICA": 2, "HISTÓRIA": 1, "GEOGRAFIA": 3, "CIÊNCIAS": 2 }, "EJA Final": { "LÍNGUA PORTUGUESA": 2, "INICIAÇÃO AOS ESTUDOS LITERÁRIOS": 1, "LÍNGUA INGLESA": 1, "EDUCAÇÃO FÍSICA": 1, "ARTE": 1, "MATEMÁTICA": 3, "APLICAÇÕES MATEMÁTICAS": 1, "HISTÓRIA": 3, "GEOGRAFIA": 1, "CIÊNCIAS": 1 } }
};