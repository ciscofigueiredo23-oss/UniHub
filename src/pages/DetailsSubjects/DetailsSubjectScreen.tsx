import React, { useEffect, useState, useMemo, useCallback } from "react";
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation, NavigationProp, useRoute, RouteProp, useFocusEffect } from '@react-navigation/native';
import { DetailsSubjectStyles } from "./DetailsSubjectStyles";
import { GlobalStyles } from "../../global/stylesGlobal";
import { themes } from "../../global/themes";
import AddNotaModal from "../../components/Modal/AddNotaModal";
import EditDisciplinaModal from "../../components/Modal/EditDisciplinaModal";
import { View, Text, ScrollView, TouchableOpacity, TextInput, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { Disciplina, Nota, StatusType } from "../../types";
import { Dropdown } from "react-native-element-dropdown";
import { useSubjects } from '../../context/SubjectsContext';
import { updateDisciplinaDB } from "../../database/subjects.database";

const statusType = [
    { label: "Cursando", value: "Cursando" },
    { label: "Disponível", value: "Disponível" },
    { label: "Concluída", value: "Concluída" },
    { label: "Bloqueada", value: "Bloqueada" },
];

// Função helper para calcular a média das notas parciais
const calculateFinalGrade = (notas: Nota[]): number => {
    if (!notas || notas.length === 0) {
        return 0;
    }
    const sum = notas.reduce((acc, current) => acc + current.valor, 0);
    return parseFloat((sum / notas.length).toFixed(1));
};

export default function DetailsSubjectScreen() {
    const navigation = useNavigation<NavigationProp<any>>();
    const route = useRoute<RouteProp<any>>();
    const { discipline } = route.params as { discipline: Disciplina };
    const disciplinaId = discipline.id;
    const { disciplinas, handleUpdateDisciplina, loading } = useSubjects();

    const disciplinaOriginal = useMemo(() => {
        return disciplinas.find(d => d.id === disciplinaId);
    }, [disciplinas, disciplinaId]);

    const [localDisciplina, setLocalDisciplina] = useState<Disciplina | null>(disciplinaOriginal ?? null);
    const [modalVisible, setModalVisible] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState(false);
    
    const [statusValue, setStatusValue] = useState<StatusType | null>(disciplinaOriginal?.status ?? null);

    useEffect(() => {
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

    const handleSaveNota = (novaNota: Nota) => {
        const updatedNotas = localDisciplina.notaParcial ? [...localDisciplina.notaParcial, novaNota] : [novaNota];
        const newFinalGrade = calculateFinalGrade(updatedNotas);

        setLocalDisciplina({
            ...localDisciplina,
            notaParcial: updatedNotas,
            notaFinal: newFinalGrade,
        });
        setModalVisible(false);
    };

    const handleUpdateStatus = (newStatus: StatusType) => {
        setStatusValue(newStatus);
        setLocalDisciplina({
            ...localDisciplina,
            status: newStatus,
        });
    };

    const handleEndEditing = useCallback((index: number, newValue: string) => {
        // Garantindo que newValue é uma string
        const safeNewValue = newValue || '';
        
        setLocalDisciplina(prevState => {
            if (!prevState) {
                return null;
            }
            const updatedNotas = [...prevState.notaParcial];
            updatedNotas[index] = {
                ...updatedNotas[index],
                valor: parseFloat(safeNewValue.replace(',', '.') || '0')
            };
            const newFinalGrade = calculateFinalGrade(updatedNotas);
            return {
                ...prevState,
                notaParcial: updatedNotas,
                notaFinal: newFinalGrade,
            };
        });
    }, []);

    const handleDeleteNota = (index: number) => {
        Alert.alert(
            "Confirmar Exclusão",
            "Tem certeza que deseja excluir esta nota?",
            [
                {
                    text: "Cancelar",
                    style: "cancel"
                },
                { 
                    text: "Excluir", 
                    style: "destructive", 
                    onPress: () => {
                        setLocalDisciplina(prevState => {
                            if (!prevState) {
                                return null;
                            }
                            const updatedNotas = [...prevState.notaParcial];
                            updatedNotas.splice(index, 1);
                            const newFinalGrade = calculateFinalGrade(updatedNotas);
                            return {
                                ...prevState,
                                notaParcial: updatedNotas,
                                notaFinal: newFinalGrade,
                            };
                        });
                    }
                }
            ]
        );
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
    const statusData = statusType.find(item => item.value === localDisciplina.status);

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
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={[GlobalStyles.title, { color: themes.colors.background}]}>
                            {localDisciplina.nome}
                        </Text>
                        <Text style={[DetailsSubjectStyles.text, { color: themes.colors.background}]}>
                            Código: {localDisciplina.codigo}
                        </Text>
                    </View>

                    <TouchableOpacity
                        style={DetailsSubjectStyles.btnBack}
                        onPress={() => setEditModalVisible(true)}
                    >
                        <MaterialIcons name="edit" size={24} color={themes.colors.grayLight} />
                    </TouchableOpacity>
                </View>

                <View style={DetailsSubjectStyles.body}>
                    <View style={DetailsSubjectStyles.btnBox}>
                        <TouchableOpacity
                            style={[DetailsSubjectStyles.btn, {borderWidth: 1, borderColor: themes.colors.grayDark, borderRadius: 20}]}
                            onPress={() => setModalVisible(true)}
                        >
                            <MaterialIcons name="add" size={24} color={themes.colors.blueDark} />
                            <Text style={[GlobalStyles.text]}>Adicionar Nota</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[DetailsSubjectStyles.btn, {borderWidth: 1, borderColor: themes.colors.grayDark, borderRadius: 20}]}
                            onPress={() => setModalVisible(true)}
                        >
                            <MaterialIcons name="remove" size={24} color={themes.colors.blueDark} />
                            <Text style={[GlobalStyles.text, { marginLeft: 10 }]}>Adicionar Falta</Text>
                        </TouchableOpacity>
                        
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
                                <View style={{width: '50%'}}>
                                    <Text style={DetailsSubjectStyles.text}>Dias: {localDisciplina.date}</Text>
                                    <Text style={DetailsSubjectStyles.text}>Sala: {localDisciplina.sala}</Text>
                                    <Text style={DetailsSubjectStyles.text}>Horário: {localDisciplina.horario}</Text>
                                    <View style={{flexDirection: 'row'}}>
                                        <Text style={DetailsSubjectStyles.text}>Pré-requisitos: </Text>
                                        {localDisciplina.preRequirements?.map((preReq, index) => (
                                        <View style={GlobalStyles.preContainer} key={index}>
                                            <Text style={GlobalStyles.textPre}>{preReq.codigo}</Text>
                                        </View>
                                        ))}
                                    </View>
                                    <View style={{flexDirection: 'row'}}>
                                        <Text style={DetailsSubjectStyles.text}>Nota Final: </Text>
                                        <Text style={[DetailsSubjectStyles.text, { color: notaStyles.color }]}>{localDisciplina.notaFinal}</Text>
                                    </View>
                                </View>
                                <View>
                                    <Text style={DetailsSubjectStyles.text}>Professor: {localDisciplina.professor}</Text>
                                    <Text style={DetailsSubjectStyles.text}>Email: {localDisciplina.emailProfessor}</Text>
                                    <Text style={DetailsSubjectStyles.text}>Período: {localDisciplina.period}º</Text>
                                    <Text style={DetailsSubjectStyles.text}>Faltas: {localDisciplina.falta}/</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    
                    {localDisciplina.notaParcial && localDisciplina.notaParcial.length > 0 && (
                        <View style={[DetailsSubjectStyles.card, { width: '97%' }]}>
                            <View style={DetailsSubjectStyles.cardHeader}>
                                <MaterialIcons name='text-fields' size={30} color={themes.colors.purpleDark} style={{ marginRight: 10 }} />
                                <Text style={GlobalStyles.title}>Notas Parciais</Text>
                            </View>
                            <View style={DetailsSubjectStyles.cardBody}>
                                {localDisciplina.notaParcial.map((nota, index) => (
                                    <View key={index}>
                                        <View  style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                            <View>
                                                <Text style={GlobalStyles.title}>{nota.tipo}</Text>
                                                <Text style={GlobalStyles.text}>Peso: {nota.peso}</Text>
                                                <Text style={GlobalStyles.text}>Data: {nota.data}</Text>
                                                <Text style={GlobalStyles.text}>Descrição: {nota.descricao}</Text>
                                            </View>
                                            <View>
                                                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                        <Text style={GlobalStyles.text}>Nota: </Text>
                                                        <TextInput 
                                                            defaultValue={String(nota.valor)}
                                                            placeholder="Digite a nota"
                                                            style={[DetailsSubjectStyles.textInput, { width: 40 }]}
                                                            keyboardType="decimal-pad"
                                                            onEndEditing={(e) => handleEndEditing(index, e.nativeEvent.text)}
                                                        />
                                                    </View>
                                                    <TouchableOpacity 
                                                        onPress={() => handleDeleteNota(index)}
                                                        style={{ marginVertical: 10 }}
                                                    >
                                                        <MaterialIcons name="delete" size={30} color={themes.colors.redDark} />
                                                    </TouchableOpacity>
                                                </View>
                                                
                                            </View>
                                        </View>
                                        <View style={GlobalStyles.separadorHorizontal}></View>
                                    </View>
                                ))}
                            </View>
                        </View>
                    )}

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