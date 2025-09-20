import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { SubjectStyles } from "./SubjectsStyles";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import DetailsCard from "../../components/Cards/detailsCard"; 
import { Disciplina } from "../../types";
import { GlobalStyles } from "../../global/stylesGlobal";

interface SemesterListProps {
  period: number;
  filter: string;
  disciplinas: Disciplina[];
  navigation: NavigationProp<any>;
}

export default function SemesterList({ filter, period, disciplinas, navigation }: SemesterListProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => setIsExpanded(!isExpanded);

  const periodTitles = [
    "Teste",
    "1º Semestre",
    "2º Semestre",
    "3º Semestre",
    "4º Semestre",
    "5º Semestre",
    "6º Semestre",
    "7º Semestre",
    "8º Semestre",
    "9º Semestre",
    "10º Semestre",
    "Optativas"
  ];

  let filteredSubjects = disciplinas.filter((disciplina) => disciplina.period === period);
  
  if (filter !== "all") {
    filteredSubjects = filteredSubjects.filter((d) => d.status === filter);
  }

  return (
    <View style={{ marginLeft: 10, flex: 1, alignItems: 'center', width: '100%' }}>
      <View style={{flexDirection:'row'}}>
        <View style={SubjectStyles.verticalLine}></View>
          <TouchableOpacity 
            style={[SubjectStyles.btnPeriod, {flexDirection:'row'}]}
            onPress={toggleExpand}
          >
            
          <Text style={[GlobalStyles.text, {paddingLeft: 10}]}>{periodTitles[period]}</Text>
          </TouchableOpacity>
        </View>
      {isExpanded && (
        <View style={SubjectStyles.list}>
          {filteredSubjects.map((item) => (
            <DetailsCard 
              key={item.id}
              disciplina={item}
              onPress={() => navigation.navigate("DetailsSubject", {
                discipline: item, // Corrija para passar discipline, não id!
              })}
            />
          ))}
        </View>
      )}
    </View>
  );
}