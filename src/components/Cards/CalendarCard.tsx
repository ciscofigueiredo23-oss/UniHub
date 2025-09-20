import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import { CalendarList, LocaleConfig } from 'react-native-calendars';
import { useSchedules } from '../../context/SchedulesContext';
import { SchedulesItem } from '../../types';
import { themes } from '../../global/themes'; 
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

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

const eventTypeColors = {
  Prova: themes.colors.redDark,
  Trabalho: themes.colors.blueDark,
  Atividade: themes.colors.greenDark,
  Outro: themes.colors.yellowDark,
};

export default function CalendarScreen() {
  const { schedules, loading } = useSchedules();
  const [selectedDayEvents, setSelectedDayEvents] = useState<SchedulesItem[]>([]);
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    if (!loading) {
      const today = new Date().toISOString().slice(0, 10);
      setSelectedDate(today);
      const eventsForToday = schedules.filter(event => event.date === today);
      setSelectedDayEvents(eventsForToday);
    }
  }, [loading, schedules]);

  const onDayPress = (day: { dateString: string }) => {
    setSelectedDate(day.dateString);
    const eventsForSelectedDay = schedules.filter(event => event.date.slice(0,10) === day.dateString);
    setSelectedDayEvents(eventsForSelectedDay);
  };

  const renderEventItem = ({ item }: { item: SchedulesItem }) => {
    return (
      <View style={styles.eventItem}>
        <Text style={styles.eventTitle}>{item.title}</Text>
        <Text style={styles.eventDescription}>{item.description}</Text>
        <Text style={styles.eventTime}>{item.type}</Text>
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
        pagingEnabled={true} // ⚠️ Confirme que está ativado
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
        <Text style={styles.listTitle}>Eventos do Dia: {selectedDate}</Text>
        <FlatList
          data={selectedDayEvents}
          renderItem={renderEventItem}
          keyExtractor={(item, index) => item.id?.toString() || index.toString()}
          ListEmptyComponent={renderEmptyList}
        />
      </View>
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
    fontWeight: 'bold',
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
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: themes.colors.text,
  },
  eventDescription: {
    fontSize: 14,
    color: themes.colors.grayDark,
    marginTop: 5,
  },
  eventTime: {
    fontSize: 12,
    color: themes.colors.blueDark,
    marginTop: 5,
  },
  emptyEventList: {
    alignItems: 'center',
    marginTop: 20,
  },
  emptyEventText: {
    color: themes.colors.grayDark,
  },
});