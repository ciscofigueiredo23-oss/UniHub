// src/routes/context.routes.tsx
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Disciplina } from "../types"; // Importe a interface Disciplina

import { TabRoutes } from "./tab.routes";
import DetailsSubjectScreen from "../pages/DetailsSubjects/DetailsSubjectScreen";
import  SubjectsScreen  from "../pages/Subjects/SubjectsScreen";
import GradeScreen from "../pages/Grade/GradeScreen";

// ⚠️ Adicione esta tipagem ⚠️
export type StackParamList = {
  Main: undefined; // A tela 'Main' não tem parâmetros
  DetailsSubject: { discipline: Disciplina }; // A tela 'DetailsSubject' recebe um objeto com a chave 'discipline'
  SubjectsScreen: undefined; // A tela 'SubjectsScreen' não tem parâmetros
  GradeScreen: undefined; // A tela 'GradeScreen' não tem parâmetros

};

// ⚠️ Use a tipagem ao criar o navegador ⚠️
const Stack = createNativeStackNavigator<StackParamList>();

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        screenOptions={{ headerShown: false, statusBarHidden: true }}
      >
        <Stack.Screen name="Main" component={TabRoutes} />
        <Stack.Screen name="SubjectsScreen" component={SubjectsScreen} />
        <Stack.Screen name="DetailsSubject" component={DetailsSubjectScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}