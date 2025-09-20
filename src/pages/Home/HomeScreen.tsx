import React, { useEffect, useState, useMemo } from "react";
import * as ScreenOrientation from 'expo-screen-orientation';
import { useNavigation } from '@react-navigation/native';
import ProgressCard from "../../components/Cards/progressCard";
import SubjectsCard from "../../components/Cards/subjectsCard";
import EventsCard from "../../components/Cards/eventsCard";
import Header from "../../components/Header";
import { themes } from "../../global/themes";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSubjects } from '../../context/SubjectsContext';
import { Disciplina } from '../../types';

import { 
    ScrollView,
    StatusBar,
} from 'react-native';

function calcularSemestreAtual(disciplinas: Disciplina[]): number {
    if (!disciplinas.length) return 1;

    // Descobre o maior período cadastrado
    const maxPeriodo = Math.max(...disciplinas.map(d => d.period));

    for (let periodo = 1; periodo <= maxPeriodo; periodo++) {
        // Filtra disciplinas do período atual
        const disciplinasDoPeriodo = disciplinas.filter(d => d.period === periodo);
        if (disciplinasDoPeriodo.length === 0) continue; // Se não há disciplinas nesse período, pula

        // Se alguma disciplina do período NÃO está concluída, retorna esse período como o atual
        const todasConcluidas = disciplinasDoPeriodo.every(d => d.status === "Concluída");
        if (!todasConcluidas) {
            return periodo;
        }
    }

    // Se todas as disciplinas de todos os períodos estão concluídas, retorna o próximo período
    return maxPeriodo + 1;
}

export default function HomeScreen() { 
    const navigation = useNavigation(); 
    const { disciplinas } = useSubjects(); 

    const [progress, setProgress] = useState(0);

    const { disciplinasConcluidas, disciplinasTotais } = useMemo(() => {
        // Filtra disciplinas que NÃO são do período 11
        const disciplinasValidas = disciplinas.filter(d => d.period !== 11);
        const concluidas = disciplinasValidas.filter(d => d.status === "Concluída").length;
        const totais = disciplinasValidas.length;
        return { disciplinasConcluidas: concluidas, disciplinasTotais: totais };
    }, [disciplinas]);

    const semestreAtual = calcularSemestreAtual(disciplinas);

    useEffect(() => { 
        ScreenOrientation.unlockAsync(); 

        let current = 0; 
        const interval = setInterval(() => { 
            if (current < disciplinasConcluidas) { 
                current += 1; 
                setProgress(current); 
            } else { 
                clearInterval(interval); 
            } 
        }, 30); 

        return () => clearInterval(interval); 
    }, [disciplinasConcluidas]);

    return ( 
        <SafeAreaView style={{ flex: 1, backgroundColor: themes.colors.background, }}> 
            <ScrollView 
                contentContainerStyle={{ 
                    backgroundColor: themes.colors.background, 
                    alignItems: 'center', 
                    paddingBottom: 20, 
                }} 
            > 
                <Header 
                    title="Olá, Francisco Figueiredo!" 
                    subtitle="Matrícula: 222115260" 
                /> 
                <ProgressCard 
                    disciplinasConcluidas={progress} 
                    disciplinasTotais={disciplinasTotais > 0 ? disciplinasTotais : 1} 
                    semestreAtual={semestreAtual}
                /> 
                <SubjectsCard /> 
                <EventsCard /> 
            </ScrollView> 
        </SafeAreaView> 
    ); 
}