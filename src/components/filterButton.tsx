import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { SubjectStyles } from "../pages/Subjects/SubjectsStyles";
import { themes } from "../global/themes";

// 🔹 Definição de tipos
interface FilterButtonsProps {
  filter: string;
  setFilter: (value: string) => void;
}

export default function FilterButtons({ filter, setFilter } : FilterButtonsProps) {
  const buttons = [
    { label: "Todas", value: "all", colorLight: themes.colors.blueLight, colorDark: themes.colors.blueDark },
    { label: "Cursando", value: "Cursando", colorLight: themes.colors.yellowLight, colorDark: themes.colors.yellowDark },
    { label: "Disponíveis", value: "Disponível", colorLight: themes.colors.purpleLight, colorDark: themes.colors.purpleDark },
    { label: "Concluídas", value: "Concluída", colorLight: themes.colors.greenLight, colorDark: themes.colors.greenDark },
    { label: "Bloqueadas", value: "Bloqueada", colorLight: themes.colors.redLight, colorDark: themes.colors.redDark },
  ];

  return (
    <View style={SubjectStyles.btnFilter}>
      {buttons.map((btn) => (
        <TouchableOpacity
          key={btn.value}
          style={[
            SubjectStyles.btn,
            {
              backgroundColor: filter === btn.value ? btn.colorLight : "#eee",
              borderColor: filter === btn.value ? btn.colorDark : "#eee",
            },
          ]}
          onPress={() => setFilter(btn.value)}
        >
          <Text
            style={[
              SubjectStyles.btnText,
              { color: filter === btn.value ? btn.colorDark : "#333" },
            ]}
          >
            {btn.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}