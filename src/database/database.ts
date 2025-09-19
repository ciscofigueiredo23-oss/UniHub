// src/database.ts

import * as SQLite from 'expo-sqlite';

let db: SQLite.SQLiteDatabase | null = null;

export const getDb = async () => {
    if (db) return db;
    db = await SQLite.openDatabaseAsync('subjects.db');
    return db;
};

export const initDB = async () => {
    const database = await getDb();
    await database.execAsync(`
        PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXISTS disciplinas (
            id INTEGER PRIMARY KEY NOT NULL,
            nome TEXT NOT NULL,
            codigo TEXT NOT NULL,
            professor TEXT,
            emailProfessor TEXT,
            horario TEXT,
            sala TEXT,
            notaFinal REAL,
            notaParcial TEXT,
            falta TEXT,
            status TEXT,
            period INTEGER,
            preRequirements TEXT,
            unlocks TEXT
        );
        CREATE TABLE IF NOT EXISTS schedules (
            id INTEGER PRIMARY KEY NOT NULL,
            title TEXT NOT NULL,
            description TEXT,
            date TEXT NOT NULL,
            type TEXT NOT NULL
        );
    `);
    console.log("Tabelas 'disciplinas' e 'schedules' criadas com sucesso!");
};