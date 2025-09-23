// src/types.ts

// Defina a interface para a nota parcial
export interface Nota {
  tipo: string;
  valor: number;
  peso: string;
  data: string;
  descricao: string;
}

// Defina a interface para os pré-requisitos e desbloqueios
export interface SubjectRef {
  id: number;
  codigo: string;
}

// Tipos possíveis para o status de uma disciplina
export type StatusType =
  | "Cursando"
  | "Disponível"
  | "Concluída"
  | "Bloqueada";

// Interface principal para uma disciplina
export interface Disciplina {
  id: number;
  nome: string;
  codigo: string;
  professor: string;
  emailProfessor: string;
  horario: string;
  date: string;
  sala: string;
  notaFinal: number;
  notaParcial: Nota[];
  falta: number;
  status: StatusType;
  period: number;
  preRequirements: SubjectRef[];
  unlocks: SubjectRef[];
}

// Interface principal para um evento
export interface SchedulesItem {
    id: number;
    title: string;
    description: string;
    date: string; // Formato string para data (ex: 'YYYY-MM-DD')
    type: string; // Ex: 'Prova', 'Trabalho', 'Reunião'
}