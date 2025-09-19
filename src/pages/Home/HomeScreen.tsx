// src/pages/Home/HomeScreen.tsx
import { StyleSheet, Text, View, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useSubjects } from '../../context/SubjectsContext';
import { useSchedules } from '../../context/SchedulesContext';
import { useNavigation } from '@react-navigation/native';
import { Disciplina } from '../../types';
import { StackParamList } from '../../routes/context.routes'; // ⚠️ Importe a tipagem ⚠️
import { NativeStackNavigationProp } from '@react-navigation/native-stack'; // ⚠️ Importe o tipo de prop ⚠️

// ⚠️ Adicione a tipagem para o hook de navegação ⚠️
type HomeScreenNavigationProp = NativeStackNavigationProp<StackParamList, 'DetailsSubject'>;

export default function HomeScreen() {
  const { disciplinas, loading: subjectsLoading } = useSubjects();
  const { schedules, loading: schedulesLoading } = useSchedules();
  const navigation = useNavigation<HomeScreenNavigationProp>(); // ⚠️ Use a tipagem aqui ⚠️

  const loading = subjectsLoading || schedulesLoading;

  const handleDisciplinePress = (discipline: Disciplina) => {
    navigation.navigate('DetailsSubject', { discipline });
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Carregando dados...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Text style={styles.title}>Disciplinas</Text>
        {disciplinas.length > 0 ? (
          disciplinas.map((d) => (
            <TouchableOpacity key={d.id} onPress={() => handleDisciplinePress(d)}>
              <View style={styles.item}>
                <Text style={styles.itemText}>Nome: {d.nome}</Text>
                <Text style={styles.itemText}>Código: {d.codigo}</Text>
                <Text style={styles.itemText}>Status: {d.status}</Text>
                <Text style={styles.itemText}>Nota Final: {d.notaFinal}</Text>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <Text>Nenhuma disciplina encontrada.</Text>
        )}

        <Text style={styles.title}>Agenda</Text>
        {schedules.length > 0 ? (
          schedules.map((s) => (
            <View key={s.id} style={styles.item}>
              <Text style={styles.itemText}>Título: {s.title}</Text>
              <Text style={styles.itemText}>Descrição: {s.description}</Text>
              <Text style={styles.itemText}>Data: {s.date}</Text>
            </View>
          ))
        ) : (
          <Text>Nenhum item de agenda encontrado.</Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  item: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginVertical: 5,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  itemText: {
    fontSize: 16,
    color: '#333',
  },
});