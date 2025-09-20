import React from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { Octicons } from '@expo/vector-icons';
import { GlobalStyles } from "../../global/stylesGlobal";
import { themes } from '../../global/themes';
import { HomeStyles } from "../../pages/Home/HomeStyles";
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { useSchedules } from "../../context/SchedulesContext";

export default function EventsCard() {
  const navigation = useNavigation<NavigationProp<any>>();
  const { schedules, loading } = useSchedules();

  if (loading) {
    return (
      <View style={[GlobalStyles.card, { alignItems: 'center', justifyContent: 'center' }]}>
        <ActivityIndicator size="large" color={themes.colors.purpleDark} />
        <Text style={[GlobalStyles.text, { marginTop: 10 }]}>Carregando eventos...</Text>
      </View>
    );
  }

  return (
    <View style={GlobalStyles.card}>
      {/* Cabeçalho */}
      <View style={GlobalStyles.cardHeader}>
        <View style={[GlobalStyles.iconContainer, { backgroundColor: themes.colors.purpleLight }]}>
          <Octicons name="calendar" size={30} color={themes.colors.purpleDark} />
        </View>
        <Text style={GlobalStyles.title}>Próximos Eventos</Text>
      </View>

      {/* Corpo */}
      <View style={[GlobalStyles.cardBody, { paddingBottom: 10 }]}>
        {schedules.length === 0 ? (
          <>
            <Octicons name="calendar" size={40} color={themes.colors.grayDark} style={{ padding: 10 }} />
            <Text style={[GlobalStyles.text, { fontWeight: "bold", paddingTop: 15 }]}>
              Sua agenda está vazia
            </Text>
            <Text style={[GlobalStyles.text, { textAlign: 'center' }]}>
              Você pode cadastrar novos eventos na tela de calendário para lembretes
              importantes como provas, trabalhos e atividades.
            </Text>
            <TouchableOpacity
              style={[GlobalStyles.btn, { backgroundColor: themes.colors.purpleLight }]}
              onPress={() => navigation.navigate("Grade")}
            >
              <Octicons name="calendar" size={24} color={themes.colors.purpleDark} />
              <Text style={[GlobalStyles.text, { color: themes.colors.purpleDark, paddingLeft: 10 }]}>
                Ir para o Calendário
              </Text>
            </TouchableOpacity>
          </>
        ) : (
          schedules.map((schedule, index) => (
            <TouchableOpacity
              key={index}
              style={[GlobalStyles.itemCard, { justifyContent: 'flex-start' }]}
              onPress={() => navigation.navigate("Grade")}
            >
              <View style={{ marginHorizontal: 10, justifyContent: 'space-between' }}>
                <Text style={[HomeStyles.titleSubject, { marginBottom: 10 }]}>{schedule.title}</Text>
                <Text style={HomeStyles.subjectInformations}>{schedule.description}</Text>
                <Text style={HomeStyles.subjectInformations}>{schedule.date}</Text>
                <Text style={HomeStyles.subjectInformations}>{schedule.type}</Text>
              </View>
            </TouchableOpacity>
          ))
        )}
      </View>
    </View>
  );
}