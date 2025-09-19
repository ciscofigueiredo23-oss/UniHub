import { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Routes from './src/routes/context.routes';
import { initDB } from './src/database/database';
import { syncData } from './src/utils/dataProcessor';
import  initialSubjects  from './src/database/subjects';
import  historicoData  from './src/database/historico';
import { SubjectsProvider } from './src/context/SubjectsContext';
import { SchedulesProvider } from './src/context/SchedulesContext';

export default function App() {
  const [dbReady, setDbReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeDB = async () => {
      try {
        await initDB();
        await syncData(initialSubjects, historicoData);
        setDbReady(true);
      } catch (e) {
        console.error("Erro na inicialização do banco de dados:", e);
        setError("Erro ao inicializar o banco de dados.");
      }
    };
    initializeDB();
  }, []);

  if (error) {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.loadingContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  if (!dbReady) {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Carregando dados...</Text>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <SubjectsProvider>
        <SchedulesProvider>
          <SafeAreaView style={{ flex: 1 }}>
            <Routes />
          </SafeAreaView>
        </SchedulesProvider>
      </SubjectsProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
  },
});