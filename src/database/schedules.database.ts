// src/database/schedules.database.ts

import { SchedulesItem } from '../types';
import { getDb } from './database';

// Helper function para formatar a data
// Garante que a data está no formato YYYY-MM-DD
const formatDate = (dateString: string): string => {
    // Isso é importante para remover a parte do tempo e fusos horários
    return dateString.slice(0, 10);
};

/**
 * Adiciona um novo item de agenda.
 */
export const addSchedulesItem = async (item: Omit<SchedulesItem, 'id'>) => {
    const database = await getDb();
    await database.runAsync(
        `INSERT INTO schedules (title, description, date, type) VALUES (?, ?, ?, ?);`,
        [item.title, item.description, formatDate(item.date), item.type] // ⚠️ Formata a data ao inserir
    );
    console.log("Item da agenda adicionado com sucesso!");
};

/**
 * Busca todos os itens da agenda.
 */
export const getSchedulesItems = async (): Promise<SchedulesItem[]> => {
    const database = await getDb();
    const items = await database.getAllAsync<SchedulesItem>("SELECT * FROM schedules;");

    // ⚠️ Mapeia os resultados para garantir o formato correto da data
    return items.map(item => ({
        ...item,
        date: formatDate(item.date)
    }));
};

/**
 * NOVO: Atualiza um item da agenda.
 * @param item O objeto SchedulesItem a ser atualizado, incluindo o ID.
 */
export const updateSchedulesItem = async (item: SchedulesItem) => {
    const database = await getDb();
    await database.runAsync(
        `UPDATE schedules SET title = ?, description = ?, date = ?, type = ? WHERE id = ?;`,
        [item.title, item.description, formatDate(item.date), item.type, item.id] // ⚠️ Formata a data ao atualizar
    );
    console.log(`Item da agenda com ID ${item.id} atualizado com sucesso!`);
};

/**
 * Deleta um item da agenda pelo seu ID.
 */
export const deleteSchedulesItem = async (id: number) => {
    const database = await getDb();
    await database.runAsync(`DELETE FROM schedules WHERE id = ?;`, [id]);
    console.log(`Item da agenda com ID ${id} deletado com sucesso!`);
};