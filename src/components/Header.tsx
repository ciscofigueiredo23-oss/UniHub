import React from "react";
import { View, Text } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import { GlobalStyles } from "../global/stylesGlobal";
import { themes } from "../global/themes";

interface HomeHeaderProps {
  title: string;
  subtitle?: string;
}

export default function HomeHeader({ title, subtitle }: HomeHeaderProps) {
  return (
    <View style={GlobalStyles.header}>
      <View>
        <Text style={[GlobalStyles.title, { color: 'white' }]}>{title}</Text>
        {subtitle && (
          <Text style={[GlobalStyles.text, { color: 'white' }]}>{subtitle}</Text>
        )}
      </View>
      <View
        style={[
          GlobalStyles.iconContainer,
          { backgroundColor: '#ffffff2d', width: 50, height: 50, borderRadius: 50 },
        ]}
      >
        <FontAwesome name="user-o" size={30} color={themes.colors.background} /> 
      </View>
    </View>
  );
}