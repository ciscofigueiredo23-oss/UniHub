// src/database/subjects.database.ts

import { Disciplina } from '../types';
import { getDb } from './database';

/**
 * Busca todas as disciplinas no banco de dados.
 */
export const getDisciplinas = async (): Promise<Disciplina[]> => {
    const database = await getDb();
    const disciplinas = await database.getAllAsync<Disciplina>('SELECT * FROM disciplinas;');

    return disciplinas.map(d => {
        // Função helper para fazer o parse JSON de forma segura.
        // Se a string não for um JSON válido, retorna um array vazio []
        const safeParse = (value: string | undefined | null) => {
            if (value && typeof value === 'string' && (value.startsWith('[') || value.startsWith('{'))) {
                try {
                    return JSON.parse(value);
                } catch (e) {
                    console.error("Erro ao fazer o parse JSON:", value, e);
                    return [];
                }
            }
            return [];
        };

        return {
            ...d,
            notaParcial: safeParse(d.notaParcial as string),
            preRequirements: safeParse(d.preRequirements as string),
            unlocks: safeParse(d.unlocks as string),
        };
    });
};

/**
 * Adiciona novas disciplinas.
 * @param disciplinas Array de objetos de disciplina.
 */
export const insertDisciplinas = async (disciplinas: Disciplina[]) => {
    const database = await getDb();
    
    await database.runAsync("DELETE FROM disciplinas;");

    await database.runAsync("BEGIN TRANSACTION;");
    try {
        const insertStmt = await database.prepareAsync(
            `INSERT INTO disciplinas (id, nome, codigo, professor, emailProfessor, date, horario, sala, notaFinal, notaParcial, falta, status, period, preRequirements, unlocks) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`
        );

        for (const disciplina of disciplinas) {
            await insertStmt.executeAsync([
                disciplina.id,
                disciplina.nome,
                disciplina.codigo,
                disciplina.professor,
                disciplina.emailProfessor,
                disciplina.date,
                disciplina.horario,
                disciplina.sala,
                disciplina.notaFinal,
                JSON.stringify(disciplina.notaParcial),
                disciplina.falta,
                disciplina.status,
                disciplina.period,
                JSON.stringify(disciplina.preRequirements),
                JSON.stringify(disciplina.unlocks),
            ]);
        }
        
        await insertStmt.finalizeAsync();
        await database.runAsync("COMMIT;");
        console.log(`${disciplinas.length} disciplinas inseridas com sucesso.`);
    } catch (error) {
        await database.runAsync("ROLLBACK;");
        console.error("Erro na transação de inserção de disciplinas:", error);
        throw error;
    }
};

/**
 * Atualiza os dados de uma disciplina no banco de dados.
 */
export const updateDisciplinaDB = async (disciplina: Disciplina) => {
    const database = await getDb();
    await database.runAsync(
        `UPDATE disciplinas SET nome=?, codigo=?, professor=?, emailProfessor=?, date=?, horario=?, sala=?, notaFinal=?, notaParcial=?, falta=?, status=?, period=?, preRequirements=?, unlocks=? WHERE id=?;`,
        [
            disciplina.nome,
            disciplina.codigo,
            disciplina.professor,
            disciplina.emailProfessor,
            disciplina.date,
            disciplina.horario,
            disciplina.sala,
            disciplina.notaFinal,
            JSON.stringify(disciplina.notaParcial),
            disciplina.falta,
            disciplina.status,
            disciplina.period,
            JSON.stringify(disciplina.preRequirements),
            JSON.stringify(disciplina.unlocks),
            disciplina.id,
        ]
    );
};