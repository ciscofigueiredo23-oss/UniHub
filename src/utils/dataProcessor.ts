// src/utils/dataProcessor.ts

import { insertDisciplinas, updateDisciplinaDB, getDisciplinas } from "../database/subjects.database";
import { Disciplina, StatusType } from "../types";

export interface HistoricoItem {
    codigo: string;
    notaFinal: number;
    status: "Concluída" | "Bloqueada" | "APR" | "CUMP" | "MATR";
}

const mapHistoricoStatus = (status: string): StatusType => {
    // 'APR' (Aprovado) e 'CUMP' (Cumprido) são considerados como concluídas.
    if (status === 'APR' || status === 'CUMP') {
        return 'Concluída';
    }
    // 'MATR' (Matriculado) é considerado como cursando.
    if (status === 'MATR') {
        return 'Cursando';
    }
    // Qualquer outro status (REP, TRANC, etc.) é considerado como bloqueado.
    return 'Bloqueada';
};

export const arePreRequirementsMet = async (disciplina: Disciplina): Promise<boolean> => {
    if (!disciplina.preRequirements || disciplina.preRequirements.length === 0) {
        return true;
    }

    const allDisciplinas = await getDisciplinas();

    for (const req of disciplina.preRequirements) {
        const requiredSubject = allDisciplinas.find(d => d.codigo === req.codigo);
        if (!requiredSubject || requiredSubject.status !== "Concluída") {
            return false;
        }
    }
    return true;
};

export const updateDisciplinasStatus = async () => {
    const allDisciplinas = await getDisciplinas();

    for (const disciplina of allDisciplinas) {
        if (disciplina.status === "Concluída" || disciplina.status === "Cursando") {
            continue;
        }

        const isAvailable = await arePreRequirementsMet(disciplina);
        const newStatus = isAvailable ? "Disponível" : "Bloqueada";

        if (disciplina.status !== newStatus) {
            await updateDisciplinaDB({ ...disciplina, status: newStatus });
        }
    }
    console.log("Status de todas as disciplinas atualizado.");
};

export const syncData = async (initialSubjects: Disciplina[], historicoData: HistoricoItem[]) => {
    try {
        console.log("Sincronizando dados iniciais da grade e histórico...");

        await insertDisciplinas(initialSubjects);

        const historicoMap = new Map(historicoData.map(item => [item.codigo, item]));
        const allDisciplinas = await getDisciplinas();

        for (const disciplina of allDisciplinas) {
            const historicoItem = historicoMap.get(disciplina.codigo);
            if (historicoItem) {
                disciplina.notaFinal = historicoItem.notaFinal;
                disciplina.status = mapHistoricoStatus(historicoItem.status);
                await updateDisciplinaDB(disciplina);
            }
        }

        await updateDisciplinasStatus();

        console.log("Sincronização de dados concluída com sucesso!");
    } catch (error) {
        console.error("Erro na sincronização de dados:", error);
        throw error;
    }
};