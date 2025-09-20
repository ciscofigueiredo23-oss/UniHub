// src/context/SchedulesContext.tsx
import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { SchedulesItem } from '../types';
import { getSchedulesItems } from '../database/schedules.database';

interface SchedulesContextProps {
    schedules: SchedulesItem[];
    loading: boolean;
    refreshSchedules: () => Promise<void>; // ⚠️ Nova função para recarregar
}

const SchedulesContext = createContext<SchedulesContextProps | undefined>(undefined);

interface SchedulesProviderProps {
    children: ReactNode;
}

export const SchedulesProvider = ({ children }: SchedulesProviderProps) => {
    const [schedules, setSchedules] = useState<SchedulesItem[]>([]);
    const [loading, setLoading] = useState(true);

    async function fetchSchedules() {
        try {
            const fetchedSchedules = await getSchedulesItems();
            setSchedules(fetchedSchedules);
        } catch (error) {
            console.error("Erro ao buscar a agenda:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchSchedules();
    }, []);

    // ⚠️ A nova função para ser usada para recarregar os dados
    const refreshSchedules = async () => {
        setLoading(true);
        await fetchSchedules();
    };

    return (
        <SchedulesContext.Provider value={{ schedules, loading, refreshSchedules }}>
            {children}
        </SchedulesContext.Provider>
    );
};

export const useSchedules = () => {
    const context = useContext(SchedulesContext);
    if (context === undefined) {
        throw new Error('useSchedules deve ser usado dentro de um SchedulesProvider');
    }
    return context;
};