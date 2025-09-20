import React, { useState, useMemo } from "react";
import { FlatList } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { SubjectStyles } from "./SubjectsStyles";
import SemesterList from "./semesterList";
import SubjectHeader from "./SubjectHeader";
import SubjectCard from '../../components/Cards/detailsCard'; 
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { useSubjects } from '../../context/SubjectsContext';

type PeriodItem = {
    key: string;
    period: number;
};

export default function SubjectsScreen() {
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("all");
    const navigation = useNavigation<NavigationProp<any>>();

    const { disciplinas } = useSubjects();

    // Busca por nome/código
    const searchResults = useMemo(() => {
        if (!search) return [];
        const searchTerm = search.toLowerCase();
        return disciplinas.filter((disciplina) =>
            disciplina.nome.toLowerCase().includes(searchTerm) ||
            disciplina.codigo.toLowerCase().includes(searchTerm)
        );
    }, [search, disciplinas]);

    // Só mostra períodos que tenham disciplinas no filtro
    const periodsData = useMemo(() => {
        // Descobre todos os períodos presentes nas disciplinas filtradas
        const filtered = filter === "all"
            ? disciplinas
            : disciplinas.filter(d => d.status === filter);

        // Pega períodos únicos ordenados
        const uniquePeriods = Array.from(new Set(filtered.map(d => d.period))).sort((a, b) => a - b);

        return uniquePeriods.map(period => ({
            key: `period-${period}`,
            period,
        }));
    }, [disciplinas, filter]);

    // Decide o que mostrar: busca ou períodos
    const data = search ? searchResults : periodsData;

    return (
        <SafeAreaView style={SubjectStyles.container}>
            <FlatList
                data={data as any}
                keyExtractor={(item) =>
                    search ? item.codigo : item.key
                }
                renderItem={({ item }) =>
                    search ? (
                        <SubjectCard
                            disciplina={item}
                            onPress={() => navigation.navigate("DetailsSubject", {
                                discipline: item, // Corrija para passar discipline, não id!
                            })}
                        />
                    ) : (
                        <SemesterList
                            period={(item as { period: number }).period}
                            filter={filter}
                            disciplinas={disciplinas}
                            navigation={navigation}
                        />
                    )
                }
                ListHeaderComponent={
                    <SubjectHeader
                        search={search}
                        setSearch={setSearch}
                        filter={filter}
                        setFilter={setFilter}
                        hideFilter={!!search}
                    />
                }
                contentContainerStyle={{ paddingBottom: 20 }}
            />
        </SafeAreaView>
    );
}