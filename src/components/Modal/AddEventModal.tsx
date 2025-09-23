import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import DateTimePicker from '@react-native-community/datetimepicker';
import { addSchedulesItem } from '../../database/schedules.database';
import { useSchedules } from '../../context/SchedulesContext';
import { themes } from '../../global/themes';

interface AddEventModalProps {
  onClose: () => void;
  defaultDate: string;
}

const eventTypes = [
  { label: 'Prova', value: 'Prova' },
  { label: 'Trabalho', value: 'Trabalho' },
  { label: 'Atividade', value: 'Atividade' },
  { label: 'Outro', value: 'Outro' },
];

const AddEventModal: React.FC<AddEventModalProps> = ({ onClose, defaultDate }) => {
  const { refreshSchedules } = useSchedules();

  // 💡 Correção: Inicializa a data com o fuso horário local
  const [year, month, day] = defaultDate.split('-').map(Number);
  const [date, setDate] = useState(new Date(year, month - 1, day));

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState(eventTypes[0].value);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onDateChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const handleAddEvent = async () => {
    if (!title || !date) {
      Alert.alert('Erro', 'Título e data são obrigatórios.');
      return;
    }

    try {
      await addSchedulesItem({
        title,
        description,
        date: date.toISOString().slice(0, 10),
        type,
      });
      await refreshSchedules();
      onClose();
      Alert.alert('Sucesso', 'Evento adicionado com sucesso!');
    } catch (error) {
      console.error('Erro ao adicionar evento:', error);
      Alert.alert('Erro', 'Não foi possível adicionar o evento.');
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={true}
      onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Adicionar Evento</Text>
          <TextInput
            style={styles.input}
            placeholder="Título"
            placeholderTextColor={themes.colors.grayDark}
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            style={styles.input}
            placeholder="Descrição (opcional)"
            placeholderTextColor={themes.colors.grayDark}
            value={description}
            onChangeText={setDescription}
            multiline
          />
          <TouchableOpacity
            style={styles.datePickerButton}
            onPress={() => setShowDatePicker(true)}>
            <Text style={styles.datePickerText}>
              Data: {date.toLocaleDateString('pt-BR')}
            </Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={onDateChange}
            />
          )}
          <Text style={styles.pickerLabel}>Tipo de Evento:</Text>
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            data={eventTypes}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Selecione o tipo"
            value={type}
            onChange={item => {
              setType(item.value);
            }}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={onClose}>
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.addButton]}
              onPress={handleAddEvent}>
              <Text style={styles.buttonText}>Adicionar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: themes.colors.background,
    borderRadius: 20,
    padding: 20,
    elevation: 10,
  },
  title: {
    fontSize: 22,
    fontFamily: "NunitoSans_700Bold",
    marginBottom: 20,
    textAlign: 'center',
    color: themes.colors.text,
  },
  input: {
    borderWidth: 1,
    borderColor: themes.colors.grayLight,
    backgroundColor: themes.colors.grayLight,
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    color: themes.colors.fontColor,
  },
  datePickerButton: {
    backgroundColor: themes.colors.blueLight,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  datePickerText: {
    fontSize: 16,
    color: themes.colors.blueDark,
    fontFamily: "NunitoSans_700Bold",
  },
  pickerLabel: {
    fontSize: 16,
    fontFamily: "NunitoSans_700Bold",
    marginBottom: 5,
    color: themes.colors.text,
  },
  dropdown: {
    height: 50,
    backgroundColor: themes.colors.grayLight,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: themes.colors.grayLight,
  },
  placeholderStyle: {
    fontSize: 16,
    color: themes.colors.grayDark,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: themes.colors.fontColor,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: themes.colors.redDark,
  },
  addButton: {
    backgroundColor: themes.colors.blueDark,
  },
  buttonText: {
    color: themes.colors.background,
    fontFamily: "NunitoSans_700Bold",
  },
});

export default AddEventModal;