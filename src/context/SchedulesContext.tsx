// src/context/SchedulesContext.tsx
import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { SchedulesItem } from '../types';
import { getSchedulesItems, deleteSchedulesItem } from '../database/schedules.database';

interface SchedulesContextProps {
    schedules: SchedulesItem[];
    loading: boolean;
    refreshSchedules: () => Promise<void>;
    handleDeleteScheduleItem: (id: number) => Promise<void>;
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

    const refreshSchedules = async () => {
        setLoading(true);
        await fetchSchedules();
    };

    const handleDeleteScheduleItem = async (id: number) => {
        setLoading(true);
        try {
            await deleteSchedulesItem(id);
            await refreshSchedules();
        } catch (error) {
            console.error("Erro ao deletar o item da agenda:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <SchedulesContext.Provider value={{ schedules, loading, refreshSchedules, handleDeleteScheduleItem }}>
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