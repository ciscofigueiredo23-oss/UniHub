// src/pages/Grade/GradeStyles.ts

import { StyleSheet, Dimensions } from "react-native";
import { themes } from "../../global/themes";

const screenWidth = Dimensions.get("window").width;
const isTablet = screenWidth > 600;

export const GradeStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: themes.colors.background,
  },
  container: { 
    flex: 1,
    width: '100%',
    backgroundColor: themes.colors.background,
  },
  addButton: {
    width: '100%',
    height: 60,
    borderRadius: 30,
    backgroundColor: themes.colors.grayLight,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    marginVertical: 40,
    marginHorizontal: 15, // ⚠️ Adicionando espaçamento horizontal aqui
    
    //-------Sombra
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    
    // 🔑 Comportamento responsivo:
    width: "auto", // ⚠️ Permite que a largura seja definida por margens
    flexShrink: 1,
  },
});