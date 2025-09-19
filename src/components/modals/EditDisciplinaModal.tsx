import React, { useState } from "react";
import { Modal, View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Disciplina, StatusType } from "../../types";
import { GlobalStyles } from "../../global/stylesGlobal";
import { EditDisciplinaModalStyles } from "../../global/EditDisciplinaModalStyles";

interface EditDisciplinaModalProps {
    visible: boolean;
    disciplina: Disciplina;
    onSave: (disciplinaEditada: Disciplina) => void;
    onClose: () => void;
}

const statusType = [
    { label: "Cursando", value: "Cursando" },
    { label: "Disponível", value: "Disponível" },
    { label: "Concluída", value: "Concluída" },
    { label: "Bloqueada", value: "Bloqueada" },
];

export default function EditDisciplinaModal({
    visible,
    disciplina,
    onSave,
    onClose,
}: EditDisciplinaModalProps) {
    const [editDisciplina, setEditDisciplina] = useState<Disciplina>(disciplina);

    // Atualiza campo editado
    const handleEditField = (field: keyof Disciplina, value: any) => {
        setEditDisciplina(prev => ({ ...prev, [field]: value }));
    };

    // Atualiza status
    const handleStatusChange = (value: StatusType) => {
        setEditDisciplina(prev => ({ ...prev, status: value }));
    };

    // Salvar alterações
    const handleSave = () => {
        onSave(editDisciplina);
        onClose();
    };

    // Atualiza campos ao abrir o modal com nova disciplina
    React.useEffect(() => {
        setEditDisciplina(disciplina);
    }, [disciplina]);

    return (
        <Modal visible={visible} animationType="slide" transparent>
            <View style={EditDisciplinaModalStyles.overlay}>
                <View style={EditDisciplinaModalStyles.modalContent}>
                    <ScrollView>
                        <Text style={EditDisciplinaModalStyles.title}>Editar Disciplina</Text>
                        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
                            <Text style={[GlobalStyles.text, { marginRight:10 }]}>Nome:</Text>
                            <TextInput
                                style={EditDisciplinaModalStyles.input}
                                value={editDisciplina.nome}
                                onChangeText={text => handleEditField("nome", text)}
                                placeholder="Nome"
                            />
                        </View>
                        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
                            <Text style={[GlobalStyles.text, { marginRight:10 }]}>Código:</Text>
                            <TextInput
                                style={EditDisciplinaModalStyles.input}
                                value={editDisciplina.codigo}
                                onChangeText={text => handleEditField("codigo", text)}
                                placeholder="Código"
                            />
                        </View>
                        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
                            <Text style={[GlobalStyles.text, { marginRight:10 }]}>Professor:</Text>
                            <TextInput
                                style={EditDisciplinaModalStyles.input}
                                value={editDisciplina.professor}
                                onChangeText={text => handleEditField("professor", text)}
                                placeholder="Professor"
                            />
                        </View>
                        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
                            <Text style={[GlobalStyles.text, { marginRight:10 }]}>Email do professor:</Text>
                                <TextInput
                                style={EditDisciplinaModalStyles.input}
                                value={editDisciplina.emailProfessor}
                                onChangeText={text => handleEditField("emailProfessor", text)}
                                placeholder="Email do Professor"
                            />
                        </View>
                        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
                            <Text style={[GlobalStyles.text, { marginRight:10 }]}>Horario:</Text>
                            <TextInput
                                style={EditDisciplinaModalStyles.input}
                                value={editDisciplina.horario}
                                onChangeText={text => handleEditField("horario", text)}
                                placeholder="Horário"
                            />
                        </View>
                        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
                            <Text style={[GlobalStyles.text, { marginRight:10 }]}>Sala:</Text>
                            <TextInput
                                style={EditDisciplinaModalStyles.input}
                                value={editDisciplina.sala}
                                onChangeText={text => handleEditField("sala", text)}
                                placeholder="Sala"
                            />
                        </View>
                        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
                            <Text style={[GlobalStyles.text, { marginRight:10 }]}>Período:</Text>
                            <TextInput
                                style={EditDisciplinaModalStyles.input}
                                value={String(editDisciplina.period)}
                                onChangeText={text => handleEditField("period", Number(text))}
                                placeholder="Período"
                                keyboardType="numeric"
                            />
                        </View>
                        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
                            <Text style={[GlobalStyles.text, { marginRight:10 }]}>Nota Final:</Text>
                            <TextInput
                                style={EditDisciplinaModalStyles.input}
                                value={String(editDisciplina.notaFinal)}
                                onChangeText={text => handleEditField("notaFinal", Number(text))}
                                placeholder="Nota Final"
                                keyboardType="numeric"
                            />
                        </View>
                        <View style={EditDisciplinaModalStyles.statusRow}>
                            <Text style={EditDisciplinaModalStyles.statusLabel}>Status:</Text>
                            {statusType.map((item) => (
                                <TouchableOpacity
                                    key={item.value}
                                    style={[
                                        EditDisciplinaModalStyles.statusButton,
                                        editDisciplina.status === item.value && EditDisciplinaModalStyles.statusButtonSelected,
                                    ]}
                                    onPress={() => handleStatusChange(item.value as StatusType)}
                                >
                                    <Text style={[
                                        EditDisciplinaModalStyles.statusButtonText,
                                        editDisciplina.status === item.value && EditDisciplinaModalStyles.statusButtonTextSelected,
                                    ]}>
                                        {item.label}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                        <View style={EditDisciplinaModalStyles.buttonRow}>
                            <TouchableOpacity style={[EditDisciplinaModalStyles.button, { backgroundColor: "#007bff" }]} onPress={handleSave}>
                                <MaterialIcons name="save" size={20} color="#fff" />
                                <Text style={EditDisciplinaModalStyles.buttonText}>Salvar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[EditDisciplinaModalStyles.button, { backgroundColor: "#ccc" }]} onPress={onClose}>
                                <MaterialIcons name="close" size={20} color="#fff" />
                                <Text style={EditDisciplinaModalStyles.buttonText}>Cancelar</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
}

