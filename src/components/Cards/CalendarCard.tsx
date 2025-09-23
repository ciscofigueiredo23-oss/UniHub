import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ActivityIndicator, FlatList, TouchableOpacity, Modal, Alert } from 'react-native';
import { CalendarList, LocaleConfig } from 'react-native-calendars';
import { useSchedules } from '../../context/SchedulesContext';
import { SchedulesItem } from '../../types';
import { themes } from '../../global/themes'; 
import { GradeStyles } from '../../pages/Grade/GradeStyles';
import { GlobalStyles } from '../../global/stylesGlobal';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import AddEventModal from '../../components/Modal/AddEventModal';

// Converte de YYYY-MM-DD para DD/MM/YYYY
const formatDate = (dateString: string): string => {
  const [year, month, day] = dateString.split('-');
  return `${day}/${month}/${year}`;
};

// Configuração opcional para traduzir o calendário para o português
LocaleConfig.locales['br'] = {
  monthNames: [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
  ],
  monthNamesShort: ['Jan.', 'Fev.', 'Mar.', 'Abr.', 'Mai.', 'Jun.', 'Jul.', 'Ago.', 'Set.', 'Out.', 'Nov.', 'Dez.'],
  dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
  dayNamesShort: ['Dom.', 'Seg.', 'Ter.', 'Qua.', 'Qui.', 'Sex.', 'Sáb.'],
  today: 'Hoje',
};
LocaleConfig.defaultLocale = 'br';

const getCurrentDate = () => {
  const today = new Date();
  return today.toISOString().slice(0, 10);
};

const eventTypeColors = {
  Prova: themes.colors.redDark,
  Trabalho: themes.colors.blueDark,
  Atividade: themes.colors.greenDark,
  Outro: themes.colors.yellowDark,
};

export default function CalendarScreen() {
  const { schedules, loading, handleDeleteScheduleItem } = useSchedules();
  const [selectedDayEvents, setSelectedDayEvents] = useState<SchedulesItem[]>([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    // Apenas define a data inicial na primeira renderização, se não houver uma data selecionada
    if (!loading && !selectedDate) {
      const today = getCurrentDate();
      setSelectedDate(today);
      const eventsForToday = schedules.filter(event => event.date === today);
      setSelectedDayEvents(eventsForToday);
    }
  }, [loading]);

  useEffect(() => {
    if (!loading && selectedDate) {
      const eventsForSelectedDay = schedules.filter(event => event.date.slice(0, 10) === selectedDate);
      setSelectedDayEvents(eventsForSelectedDay);
    }
  }, [schedules, selectedDate, loading]);

  const onDayPress = (day: { dateString: string }) => {
    setSelectedDate(day.dateString);
    const eventsForSelectedDay = schedules.filter(event => event.date.slice(0,10) === day.dateString);
    setSelectedDayEvents(eventsForSelectedDay);
  };
  
  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleDeleteAlert = (id: number) => {
    Alert.alert(
      "Confirmar Exclusão",
      "Tem certeza que deseja excluir este evento?",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        { 
          text: "Excluir", 
          style: "destructive", 
          onPress: () => handleDeleteScheduleItem(id)
        }
      ]
    );
  };

  const renderEventItem = ({ item }: { item: SchedulesItem }) => {
    return (
      <View style={styles.eventItem}>
        <View>
          <Text style={styles.eventTitle}>{item.title}</Text>
          <Text style={styles.eventDescription}>{item.description}</Text>
          <Text style={styles.eventDate}>{formatDate(item.date)}</Text>
          <Text style={styles.eventTime}>{item.type}</Text>
        </View>
        <TouchableOpacity 
          onPress={() => handleDeleteAlert(item.id)}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 10,
            borderRadius: 8,
            backgroundColor: themes.colors.redLight
          }}
        >
          <MaterialIcons name="delete" size={24} color={themes.colors.redDark} />
        </TouchableOpacity>
      </View>
    );
  };

  const renderEmptyList = () => {
    return (
      <View style={styles.emptyEventList}>
        <Text style={styles.emptyEventText}>Nenhum evento para este dia.</Text>
      </View>
    );
  };

  const markedDates = schedules.reduce((acc, event) => {
    const formattedDate = event.date.slice(0, 10);
    const eventDotColor = eventTypeColors[event.type] || themes.colors.grayDark;
    
    if (!acc[formattedDate]) {
      acc[formattedDate] = { dots: [] };
    }
    
    acc[formattedDate].dots.push({
      key: `${formattedDate}-${event.type}-${event.id}`,
      color: eventDotColor,
      selectedDotColor: '#ffffff'
    });
    return acc;
  }, {} as any);

  markedDates[selectedDate] = {
    ...(markedDates[selectedDate] || {}),
    selected: true,
    selectedColor: themes.colors.blueDark,
    selectedTextColor: '#ffffff'
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={themes.colors.blueDark} />
        <Text style={styles.loadingText}>Carregando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CalendarList
        onDayPress={onDayPress}
        markedDates={markedDates}
        markingType={'multi-dot'}
        horizontal={true}
        pagingEnabled={true}
        hideArrows={true}
        theme={{
          backgroundColor: themes.colors.background,
          calendarBackground: themes.colors.background,
          textSectionTitleColor: themes.colors.blueDark,
          textSectionTitleDisabledColor: themes.colors.grayLight,
          selectedDayBackgroundColor: themes.colors.blueDark,
          selectedDayTextColor: '#ffffff',
          todayTextColor: themes.colors.blueDark,
          dayTextColor: themes.colors.grayDark,
          textDisabledColor: themes.colors.grayLight,
          monthTextColor: themes.colors.blueDark,
          indicatorColor: themes.colors.blueDark,
          textDayFontFamily: 'Roboto',
          textMonthFontFamily: 'Roboto',
          textDayHeaderFontFamily: 'Roboto',
          textDayFontWeight: '300',
          textMonthFontWeight: 'bold',
          textDayHeaderFontWeight: '300',
          textDayFontSize: 16,
          textMonthFontSize: 18,
          textDayHeaderFontSize: 14
        }}
      />
      <View style={styles.card}>
        <Text style={styles.listTitle}>Eventos do Dia: {formatDate(selectedDate)}</Text>
        
        <TouchableOpacity style={GradeStyles.addButton} onPress={openModal}>
          <Feather name="plus" size={40} color={themes.colors.blueDark} />
          <Text style={GlobalStyles.text}> Adicionar Evento</Text>
        </TouchableOpacity>
        <FlatList
          data={selectedDayEvents}
          renderItem={renderEventItem}
          keyExtractor={(item, index) => item.id?.toString() || index.toString()}
          ListEmptyComponent={renderEmptyList}
        />
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={closeModal}
      >
        <AddEventModal onClose={closeModal} defaultDate={selectedDate} />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff', 
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    marginTop: 40,
    marginHorizontal: 15,
    
    //-------Sombra
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    
    // 🔑 Comportamento responsivo:
    width: "auto",
    flexShrink: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: themes.colors.grayDark,
  },
  listTitle: {
    fontSize: 20,
    fontFamily: "NunitoSans_700Bold",
    marginBottom: 10,
    color: themes.colors.blueDark,
  },
  eventItem: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  eventTitle: {
    fontSize: 16,
    fontFamily: "NunitoSans_700Bold",
    color: themes.colors.text,
  },
  eventDescription: {
    fontSize: 14,
    color: themes.colors.grayDark,
    marginTop: 5,
    fontFamily: "NunitoSans_700Bold",
  },
  eventDate: {
    fontSize: 14,
    color: themes.colors.textSecondary,
    marginBottom: 5,
    fontFamily: "NunitoSans_700Bold",
  },
  eventType: {
    fontSize: 14,
    color: themes.colors.blueDark,
    fontFamily: "NunitoSans_700Bold",
  },
  eventTime: {
    fontSize: 12,
    color: themes.colors.blueDark,
    marginTop: 5,
    fontFamily: "NunitoSans_700Bold",
  },
  emptyEventList: {
    alignItems: 'center',
    marginTop: 20,
  },
  emptyEventText: {
    color: themes.colors.grayDark,
    fontFamily: "NunitoSans_700Bold",
  },
});