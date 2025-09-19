import React, { useEffect, useState, useMemo, useCallback } from "react";
import { FontAwesome, MaterialIcons, Octicons } from '@expo/vector-icons';
import { useNavigation, NavigationProp, useRoute, RouteProp, useFocusEffect } from '@react-navigation/native';
import { DetailsSubjectStyles } from "./DetailsSubjectStyles";
import { GlobalStyles } from "../../global/stylesGlobal";
import { themes } from "../../global/themes";
import { filterStyles } from "../../global/filterStyles";
import AddNotaModal from "../../components/modals/AddNotaModal";
import EditDisciplinaModal from "../../components/modals/EditDisciplinaModal";
import { View, Text, ScrollView, TouchableOpacity, Modal, TextInput, ActivityIndicator } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { Disciplina, Nota, StatusType, SubjectRef } from "../../types";
import { Dropdown } from "react-native-element-dropdown";
import { useSubjects } from '../../context/SubjectsContext';
import { updateDisciplinaDB } from "../../database/subjects.database";

const statusType = [
    { label: "Cursando", value: "Cursando" },
    { label: "Disponível", value: "Disponível" },
    { label: "Concluída", value: "Concluída" },
    { label: "Bloqueada", value: "Bloqueada" },
];

export default function DetailsSubjectScreen() {
    const navigation = useNavigation<NavigationProp<any>>();
    const route = useRoute<RouteProp<any>>();
    const { discipline } = route.params as { discipline: Disciplina };
    const disciplinaId = discipline.id;
    

    const { disciplinas, handleUpdateDisciplina, loading } = useSubjects();
    console.log('disciplinas:', disciplinas);
    console.log('disciplinaId:', disciplinaId);

    const disciplinaOriginal = useMemo(() => {
        return disciplinas.find(d => d.id === disciplinaId);
    }, [disciplinas, disciplinaId]);

    // Inicializa localDisciplina apenas uma vez
    const [localDisciplina, setLocalDisciplina] = useState<Disciplina | null>(disciplinaOriginal ?? null);
    const [modalVisible, setModalVisible] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [statusValue, setStatusValue] = useState<StatusType | null>(disciplinaOriginal?.status ?? null);

    // Remova o useEffect que atualizava localDisciplina

    useEffect(() => {
        // Se não encontrou a disciplina, mostra carregando
        if (!disciplinaOriginal && !loading) {
            setLocalDisciplina(null);
        }
    }, [disciplinaOriginal, loading]);

    if (loading) {
        return <ActivityIndicator />;
    }
    if (!localDisciplina) {
        return <Text>Disciplina não encontrada</Text>;
    }

    // Adiciona nota apenas no estado local
    const handleSaveNota = (novaNota: Nota) => {
        const updatedNotas = localDisciplina.notaParcial ? [...localDisciplina.notaParcial, novaNota] : [novaNota];
        setLocalDisciplina({
            ...localDisciplina,
            notaParcial: updatedNotas,
        });
        setModalVisible(false);
    };

    // Atualiza status apenas no estado local
    const handleUpdateStatus = (newStatus: StatusType) => {
        setStatusValue(newStatus);
        setLocalDisciplina({
            ...localDisciplina,
            status: newStatus,
        });
    };

    const getNotaStyles = (notaFinal: number) => {
        if (notaFinal < 5) {
            return {
                backgroundColor: themes.colors.redLight,
                borderColor: themes.colors.redDark,
                color: themes.colors.redDark,
            };
        } else {
            return {
                backgroundColor: themes.colors.greenLight,
                borderColor: themes.colors.greenDark,
                color: themes.colors.greenDark,
            };
        }
    };

    const notaStyles = getNotaStyles(localDisciplina.notaFinal);

    // Salva no banco ao sair da tela
    useFocusEffect(
        useCallback(() => {
            return () => {
                if (localDisciplina) {
                    updateDisciplinaDB(localDisciplina)
                        .then(() => handleUpdateDisciplina(localDisciplina))
                        .catch((error) => {
                            console.error('Erro ao salvar disciplina ao sair:', error);
                        });
                }
            };
        }, [localDisciplina])
    );

    return (
        <SafeAreaView style={DetailsSubjectStyles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={DetailsSubjectStyles.header}>
                    <TouchableOpacity
                        style={DetailsSubjectStyles.btnBack}
                        onPress={() => navigation.goBack()}
                    >
                        <MaterialIcons name='chevron-left' size={24} color={themes.colors.grayLight} />
                    </TouchableOpacity>

                    <Text style={GlobalStyles.title}>
                        {localDisciplina.nome}
                    </Text>

                    <TouchableOpacity
                        style={DetailsSubjectStyles.btnBack}
                        onPress={() => setEditModalVisible(true)}
                    >
                        <MaterialIcons name="edit" size={24} color={themes.colors.grayLight} />
                    </TouchableOpacity>
                </View>

                <View style={DetailsSubjectStyles.body}>
                    <View style={DetailsSubjectStyles.card}>
                        <View style={DetailsSubjectStyles.cardHeader}>
                            <TouchableOpacity
                                style={DetailsSubjectStyles.btnBack}
                                onPress={() => setEditModalVisible(true)}
                            >
                                <MaterialIcons name="edit" size={24} color={themes.colors.blueDark} />
                            </TouchableOpacity>
                            <Text style={GlobalStyles.title}>Detalhes</Text>
                        </View>
                        <View style={DetailsSubjectStyles.cardBody}>
                            <View style={DetailsSubjectStyles.row}>
                                <Text style={DetailsSubjectStyles.text}>Código: {localDisciplina.codigo}</Text>
                                <Text style={DetailsSubjectStyles.text}>Período: {localDisciplina.period}º</Text>
                            </View>
                            <View style={DetailsSubjectStyles.row}>
                                <Text style={DetailsSubjectStyles.text}>Horário: {localDisciplina.horario}</Text>
                                <Text style={DetailsSubjectStyles.text}>Sala: {localDisciplina.sala}</Text>
                            </View>
                            <View style={DetailsSubjectStyles.row}>
                                <Text style={DetailsSubjectStyles.text}>Professor: {localDisciplina.professor}</Text>
                                <Text style={DetailsSubjectStyles.text}>Email: {localDisciplina.emailProfessor}</Text>
                            </View>

                            <Dropdown
                                style={[DetailsSubjectStyles.dropdown]}
                                containerStyle={DetailsSubjectStyles.dropdownStyle}
                                placeholderStyle={DetailsSubjectStyles.placeholderStyle}
                                selectedTextStyle={DetailsSubjectStyles.text}
                                data={statusType}
                                maxHeight={200}
                                labelField="label"
                                valueField="value"
                                placeholder="Status"
                                value={statusValue}
                                onChange={item => {
                                    handleUpdateStatus(item.value as StatusType);
                                }}
                            />
                        </View>
                    </View>

                    <View style={[DetailsSubjectStyles.card, { width: '97%' }]}>
                        <View style={DetailsSubjectStyles.cardHeader}>
                            <MaterialIcons name='text-fields' size={30} color={themes.colors.purpleDark} style={{ marginRight: 10 }} />
                            <Text style={GlobalStyles.title}>Notas Parciais</Text>
                        </View>
                        <View style={DetailsSubjectStyles.cardBody}>
                            {localDisciplina.notaParcial && localDisciplina.notaParcial.length > 0 ? (
                                localDisciplina.notaParcial.map((nota, index) => (
                                    <View key={index} style={[GlobalStyles.preContainer, { width: '45%' }]}>
                                        <Text style={GlobalStyles.textPre}>{nota.descricao} - {nota.valor}</Text>
                                    </View>
                                ))
                            ) : (
                                <Text style={DetailsSubjectStyles.text}>Nenhuma nota cadastrada</Text>
                            )}
                        </View>
                    </View>

                    <View style={[DetailsSubjectStyles.card, { width: '97%' }]}>
                        <View style={DetailsSubjectStyles.cardHeader}>
                            <MaterialIcons name='school' size={30} color={themes.colors.blueDark} style={{ marginRight: 10 }} />
                            <Text style={GlobalStyles.title}>Disciplinas Desbloqueadas</Text>
                        </View>

                        <View style={DetailsSubjectStyles.cardBody}>
                            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                                {localDisciplina.unlocks?.map((unlock, index) => (
                                    <View style={GlobalStyles.preContainer} key={index}>
                                        <Text style={GlobalStyles.textPre}>{unlock.codigo}</Text>
                                    </View>
                                ))}
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
            <AddNotaModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                disciplina={localDisciplina}
                onSave={handleSaveNota}
            />
            <EditDisciplinaModal
                visible={editModalVisible}
                disciplina={localDisciplina}
                onSave={(disciplinaEditada) => setLocalDisciplina(disciplinaEditada)}
                onClose={() => setEditModalVisible(false)}
            />
        </SafeAreaView>
    );
}