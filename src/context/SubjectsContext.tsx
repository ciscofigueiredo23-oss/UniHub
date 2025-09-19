import React, { createContext, useState, ReactNode, useContext, useCallback, useEffect } from 'react';
import { Disciplina } from '../types';
import { getDisciplinas } from '../database/subjects.database';

interface SubjectsContextProps {
    disciplinas: Disciplina[];
    handleUpdateDisciplina: (updatedDiscipline: Disciplina) => void;
    loading: boolean;
}

const SubjectsContext = createContext<SubjectsContextProps | undefined>(undefined);

interface SubjectsProviderProps {
    children: ReactNode;
}

export const SubjectsProvider = ({ children }: SubjectsProviderProps) => {
    const [disciplinas, setDisciplinas] = useState<Disciplina[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            try {
                const data = await getDisciplinas();
                setDisciplinas(data);
            } catch (e) {
                console.error('Erro ao buscar disciplinas:', e);
            }
            setLoading(false);
        }
        fetchData();
    }, []);

    const handleUpdateDisciplina = useCallback((updatedDiscipline: Disciplina) => {
        setDisciplinas(prevDisciplinas =>
            prevDisciplinas.map(d =>
                d.id === updatedDiscipline.id ? updatedDiscipline : d
            )
        );
    }, []);

    return (
        <SubjectsContext.Provider value={{ disciplinas, handleUpdateDisciplina, loading }}>
            {children}
        </SubjectsContext.Provider>
    );
};

export const useSubjects = () => {
    const context = useContext(SubjectsContext);
    if (context === undefined) {
        throw new Error('useSubjects deve ser usado dentro de um SubjectsProvider');
    }
    return context;
};