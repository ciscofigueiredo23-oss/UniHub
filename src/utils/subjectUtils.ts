// src/utils/subjectUtils.ts

import { getDisciplinas } from "../database/subjects.database";
import { Disciplina } from "../types";

export async function getSubjectsByStatus(status: string): Promise<Disciplina[]> {
    const allDisciplinas = await getDisciplinas();
    const filtradas = allDisciplinas.filter((d) => d.status === status);
    return filtradas;
}