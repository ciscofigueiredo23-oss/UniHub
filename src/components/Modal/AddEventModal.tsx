import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Platform, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { themes } from '../../global/themes';
import { GlobalStyles } from '../../global/stylesGlobal';
import { addSchedulesItem } from '../../database/schedules.database';
import { SchedulesItem } from '../../types';
import { Dropdown } from 'react-native-element-dropdown';
import { useSchedules } from '../../context/SchedulesContext';

interface AddEventModalProps {
    onClose: () => void;
}

const eventTypes = [
    { label: 'Prova', value: 'Prova' },
    { label: 'Trabalho', value: 'Trabalho' },
    { label: 'Atividade', value: 'Atividade' },
    { label: 'Outro', value: 'Outro' },
];

export default function AddEventModal({ onClose }: AddEventModalProps) {
    const { refreshSchedules } = useSchedules(); // ⚠️ Usando o novo hook
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState(new Date());
    const [type, setType] = useState('Prova');
    const [showDatePicker, setShowDatePicker] = useState(false);

    const handleAddEvent = async () => {
        if (!title || !date) {
            Alert.alert('Erro', 'Título e data são obrigatórios.');
            return;
        }

        const newEvent: Omit<SchedulesItem, 'id'> = {
            title,
            description,
            date: date.toISOString().slice(0, 10), // ⚠️ Garante o formato YYYY-MM-DD
            type,
        };

        try {
            await addSchedulesItem(newEvent);
            await refreshSchedules(); // ⚠️ Recarrega os dados do calendário
            onClose();
            Alert.alert('Sucesso', 'Evento adicionado com sucesso!');
        } catch (error) {
            console.error(error);
            Alert.alert('Erro', 'Não foi possível adicionar o evento.');
        }
    };

    const onChangeDate = (event: any, selectedDate?: Date) => {
        const currentDate = selectedDate || date;
        setShowDatePicker(Platform.OS === 'ios');
        setDate(currentDate);
    };

    return (
        <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Adicionar Novo Evento</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Título do Evento"
                    value={title}
                    onChangeText={setTitle}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Descrição (Opcional)"
                    value={description}
                    onChangeText={setDescription}
                />
                <TouchableOpacity
                    onPress={() => setShowDatePicker(true)}
                    style={styles.datePickerButton}
                >
                    <Text style={styles.datePickerText}>
                        Data: {date.toISOString().slice(0, 10)}
                    </Text>
                </TouchableOpacity>
                {showDatePicker && (
                    <DateTimePicker
                        value={date}
                        mode="date"
                        display="default"
                        onChange={onChangeDate}
                    />
                )}
                <Dropdown
                    style={styles.dropdown}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    data={eventTypes}
                    labelField="label"
                    valueField="value"
                    placeholder="Selecione o Tipo"
                    value={type}
                    onChange={item => setType(item.value)}
                />

                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={[GlobalStyles.btn, styles.cancelButton]} onPress={onClose}>
                        <Text style={GlobalStyles.text}>Cancelar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[GlobalStyles.btn, styles.addButton]} onPress={handleAddEvent}>
                        <Text style={[GlobalStyles.text, { color: 'white' }]}>Adicionar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '90%',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        elevation: 10,
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: themes.colors.blueDark,
    },
    input: {
        height: 50,
        borderColor: themes.colors.grayLight,
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 15,
        marginBottom: 15,
        fontSize: 16,
    },
    dropdown: {
        height: 50,
        borderColor: themes.colors.grayLight,
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 15,
        marginBottom: 15,
    },
    placeholderStyle: {
        fontSize: 16,
        color: themes.colors.grayDark,
    },
    selectedTextStyle: {
        fontSize: 16,
        color: 'black',
    },
    datePickerButton: {
        height: 50,
        borderColor: themes.colors.grayLight,
        borderWidth: 1,
        borderRadius: 8,
        justifyContent: 'center',
        paddingHorizontal: 15,
        marginBottom: 15,
    },
    datePickerText: {
        fontSize: 16,
        color: themes.colors.grayDark,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    cancelButton: {
        backgroundColor: themes.colors.grayLight,
        flex: 1,
        marginRight: 10,
        borderColor: themes.colors.grayDark,
    },
    addButton: {
        backgroundColor: themes.colors.blueDark,
        flex: 1,
    },
});