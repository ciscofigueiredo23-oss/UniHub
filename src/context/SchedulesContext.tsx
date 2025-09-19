import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { SchedulesItem } from '../types';
import { getSchedulesItems } from '../database/schedules.database';

interface SchedulesContextProps {
    schedules: SchedulesItem[];
    loading: boolean;
}

const SchedulesContext = createContext<SchedulesContextProps | undefined>(undefined);

interface SchedulesProviderProps {
    children: ReactNode;
}

export const SchedulesProvider = ({ children }: SchedulesProviderProps) => {
    const [schedules, setSchedules] = useState<SchedulesItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
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

        fetchSchedules();
    }, []);

    return (
        <SchedulesContext.Provider value={{ schedules, loading }}>
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