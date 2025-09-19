import React, { useState } from "react";
import { View, Text, Modal, TouchableOpacity, TextInput, Alert } from "react-native";
import { GlobalStyles } from "../../global/stylesGlobal";
import { themes } from "../../global/themes";
import { Dropdown } from "react-native-element-dropdown";
import { DetailsSubjectStyles } from "../../pages/DetailsSubjects/DetailsSubjectStyles";
import { MaterialIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

interface Nota {
  tipo: string;
  valor: number; // O valor será 0, pois será preenchido depois
  peso: string;
  data: string;
  descricao: string;
}

interface AddNotaModalProps {
  visible: boolean;
  onClose: () => void;
  disciplina: any;
  onSave: (nota: Nota) => void;
}

export default function AddNotaModal({ visible, onClose, disciplina, onSave }: AddNotaModalProps) {
  const [tipoNota, setTipoNota] = useState<string | null>(null);
  const [data, setData] = useState<string>("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [pesoInput, setPesoInput] = useState("");
  const [descricaoInput, setDescricaoInput] = useState("");

  const handleDateChange = (_: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const formattedDate = selectedDate.toLocaleDateString("pt-BR");
      setData(formattedDate);
    }
  };

  const tiposDeNota = [
    { label: "Prova", value: "Prova" },
    { label: "Trabalho", value: "Trabalho" },
    { label: "Projeto", value: "Projeto" },
    { label: "Participação", value: "Participacao" },
  ];

  const handleSave = () => {
    if (!tipoNota || !data) {
      Alert.alert("Erro", "Por favor, preencha o tipo de avaliação e a data.");
      return;
    }

    const novaNota: Nota = {
      tipo: tipoNota,
      valor: 0, // Definido como 0, pois será preenchido em outro lugar
      peso: pesoInput,
      data,
      descricao: descricaoInput,
    };

    onSave(novaNota);
    
    // Limpar os estados do formulário após salvar
    setTipoNota(null);
    setData("");
    setPesoInput("");
    setDescricaoInput("");
    
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
      }}>
        <View style={[DetailsSubjectStyles.adicionarNota]}>
          <View style={{flexDirection: 'row'}}>
            <MaterialIcons name='event-note' size={28} color={themes.colors.blueDark} />
            <Text style={[GlobalStyles.title, { marginLeft: 10 }]}>Adicionar Avaliação</Text>
          </View>
          <Text style={[GlobalStyles.text, { marginBottom: 10 }]}>Adicione uma nova avaliação para {disciplina.nome}</Text>

          <Text style={GlobalStyles.text}>Tipo da Avaliação:</Text>
          <Dropdown
            style={DetailsSubjectStyles.dropdown}
            data={tiposDeNota}
            labelField="label"
            valueField="value"
            placeholder="Selecione o tipo"
            value={tipoNota}
            onChange={(item) => setTipoNota(item.value)}
            placeholderStyle={{ color: themes.colors.fontColor }}
            selectedTextStyle={{ color: themes.colors.fontColor }}
            itemTextStyle={{ color: themes.colors.fontColor }}
            renderItem={(item) => (
              <View style={{ padding: 10, borderBottomWidth: 1, borderColor: themes.colors.grayLight }}>
                <Text style={[DetailsSubjectStyles.text, { color: themes.colors.fontColor }]}>
                  {item.label}
                </Text>
              </View>
            )}
            containerStyle={DetailsSubjectStyles.dropdownStyle}
          />

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10, }}>
            <View style={{ flex: 1, marginRight: 10 }}>
              <Text style={DetailsSubjectStyles.text}>Peso:</Text>
              <TextInput
                style={DetailsSubjectStyles.textInput}
                placeholder="Ex.: 2.5"
                placeholderTextColor={'#b9b9b9ff'}
                value={pesoInput}
                onChangeText={setPesoInput}
              />
            </View>
            <View style={{ flex: 1, marginRight: 10 }}>
              <Text style={DetailsSubjectStyles.text}>Data:</Text>
              <TouchableOpacity
                style={[DetailsSubjectStyles.textInput, { flexDirection: "row", alignItems: "center", paddingRight: 10, }]}
                onPress={() => setShowDatePicker(true)}
              >
                <Text style={{ flex: 1, color: data ? themes.colors.fontColor : "#b9b9b9ff" }}>
                  {data || "DD/MM/AAAA"}
                </Text>
                <MaterialIcons name="calendar-today" size={22} color={themes.colors.blueDark} />
              </TouchableOpacity>

              {showDatePicker && (
                <DateTimePicker
                  value={new Date()}
                  mode="date"
                  display="calendar"
                  onChange={handleDateChange}
                />
              )}
            </View>
          </View>

          <View style={{ marginRight: 10 }}>
            <Text style={DetailsSubjectStyles.text}>Descrição:</Text>
            <TextInput
              placeholder="Ex.: Prova 1"
              placeholderTextColor={'#b9b9b9ff'}
              onChangeText={setDescricaoInput}
            />
          </View>
          
          <View style={{ flexDirection: "row", justifyContent: "flex-end", marginTop: 20 }}>
            <TouchableOpacity onPress={onClose} style={{ backgroundColor: themes.colors.redLight, marginRight: 20, borderColor: themes.colors.redDark }}>
              <Text style={[GlobalStyles.text, { color: themes.colors.redDark }]}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ backgroundColor: themes.colors.greenLight, borderColor: themes.colors.greenDark }}
              onPress={handleSave}
            >
              <Text style={[GlobalStyles.text, { color: themes.colors.greenDark }]}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}