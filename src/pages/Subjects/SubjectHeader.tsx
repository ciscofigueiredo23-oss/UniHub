import React, { useState } from "react";
import { View, Text, TextInput, useWindowDimensions } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { themes } from "../../global/themes";
import { SubjectStyles } from "./SubjectsStyles";
import Header from "../../components/Header";
import FilterButtons from "../../components/filterButton";

type Props = {
  search: string;
  setSearch: (value: string) => void;
  filter: string;
  setFilter: (value: string) => void;
  hideFilter?: boolean; 
};


export default function SubjectHeader({
  search,
  setSearch,
  filter,
  setFilter,
  hideFilter = false,
}: Props) {
  const { width } = useWindowDimensions();

  const filterOptions = [
    { label: "Todas", value: "all" },
    { label: "Cursando", value: "Cursando" },
    { label: "Disponíveis", value: "Disponível" },
    { label: "Concluídas", value: "Concluída" },
    { label: "Bloqueadas", value: "Bloqueada" },
  ];

  return (
    <>
      {/* Header principal */}
      <Header 
        title="Disciplinas" 
        subtitle="Engenharia Elétrica - UFBA" 
      />

      {/* Campo de pesquisa */}
      <TextInput
        placeholder="Pesquisar disciplina..."
        value={search}
        onChangeText={setSearch}
        style={SubjectStyles.textInput}
      />

      {/* Filtro responsivo */}
    {!hideFilter && (
      <View style={{ marginVertical: 10 }}>
        {width > 600 ? (
          <FilterButtons filter={filter} setFilter={setFilter} />
        ) : (
          <Dropdown
            style={SubjectStyles.dropdown}
            data={filterOptions}
            labelField="label"
            valueField="value"
            placeholder="Selecione o filtro"
            value={filter}
            onChange={(item) => setFilter(item.value)}
            placeholderStyle={{ color: themes.colors.fontColor }}
            selectedTextStyle={{ color: themes.colors.fontColor }}
            itemTextStyle={{ color: themes.colors.fontColor }}
            renderItem={(item) => (
              <View style={SubjectStyles.dropdownStyle}>
                <Text style={{ color: themes.colors.fontColor }}>{item.label}</Text>
              </View>
            )}
          />
        )}
      </View>
      )}
    </>
  );
}
