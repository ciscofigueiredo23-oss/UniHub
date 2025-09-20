// ProgressCard.tsx

import React from "react"
import { View, Text, StyleSheet } from "react-native";
import { MaterialIcons, FontAwesome, Octicons } from '@expo/vector-icons';
import PieChart from 'react-native-pie-chart';
import { GlobalStyles } from "../../global/stylesGlobal";
import { themes } from "../../global/themes"

interface ProgressCardProps {
    disciplinasConcluidas: number;
    disciplinasTotais: number;
    semestreAtual: number; // 👈 Adicionamos o semestre aqui
}

export default function ProgressCard({ disciplinasConcluidas, disciplinasTotais, semestreAtual }: ProgressCardProps) {
    const widthAndHeight = 200;
    const seriesSum = disciplinasTotais;
    const series =
        seriesSum > 0
            ? [
                { value: disciplinasTotais - disciplinasConcluidas, color: themes.colors.blueLight },
                { value: disciplinasConcluidas, color: themes.colors.blueDark },
            ]
            : [
                { value: 1, color: themes.colors.grayLight },
            ];
    const percent = disciplinasTotais > 0 ? Math.round((disciplinasConcluidas / disciplinasTotais) * 100) : 0;

    return (
        <View style={[GlobalStyles.card, { overflow: "hidden", borderRadius: 20 }]}>
            {/* Cabeçalho */}
            <View style={GlobalStyles.cardHeader}>
                <View style={[GlobalStyles.iconContainer, { backgroundColor: themes.colors.blueLight }]}>
                    <MaterialIcons name="bar-chart" size={40} color={themes.colors.blueDark} />
                </View>
                <Text style={GlobalStyles.title}>Progresso Acadêmico</Text>
            </View>

            {/* Corpo */}
            <View style={[GlobalStyles.cardBody, { flexDirection: 'row', flexWrap: 'wrap' }]}>
                {/* Gráfico */}
                <View style={[GlobalStyles.miniCard, { justifyContent: 'center', alignItems: 'center' }]}>
                    <PieChart widthAndHeight={widthAndHeight} series={series} cover={0.7} />
                    <View style={[StyleSheet.absoluteFillObject, { justifyContent: 'center', alignItems: 'center' }]}>
                        <Text style={{ fontSize: 28, fontFamily: 'NunitoSans_700Bold', color: themes.colors.blueDark }}>
                            {percent}%
                        </Text>
                    </View>
                </View>

                {/* MiniCards */}
                <View style={GlobalStyles.miniCard}>
                    {/* Disciplinas concluídas */}
                    <View style={[GlobalStyles.itemMiniCard, { backgroundColor: themes.colors.greenLight }]}>
                        <View>
                            <Text style={[GlobalStyles.text, { color: themes.colors.greenDark, fontFamily: 'NunitoSans_700Bold' }]}>
                                Disciplinas Concluídas
                            </Text>
                            <Text style={{ fontSize: 20, color: themes.colors.greenDark, fontFamily: 'NunitoSans_400Regular' }}>
                                {disciplinasConcluidas}
                            </Text>
                        </View>
                        <MaterialIcons name="check-circle-outline" size={40} color={themes.colors.greenDark} />
                    </View>

                    {/* Semestre atual */}
                    <View style={[GlobalStyles.itemMiniCard, { backgroundColor: themes.colors.grayLight }]}>
                        <View>
                            <Text style={[GlobalStyles.text, { color: themes.colors.grayDark, fontFamily: 'NunitoSans_700Bold' }]}>
                                Semestre Atual
                            </Text>
                            <Text style={[GlobalStyles.text, { color: themes.colors.grayDark, fontFamily: 'NunitoSans_400Regular' }]}>
                                {semestreAtual}
                            </Text>
                        </View>
                        <Octicons name="book" size={35} color={themes.colors.grayDark} />
                    </View>

                    {/* CRA */}
                    <View style={[GlobalStyles.itemMiniCard, { backgroundColor: themes.colors.blueLight }]}>
                        <View>
                            <Text style={[GlobalStyles.text, { color: themes.colors.blueDark, fontFamily: 'NunitoSans_700Bold' }]}>
                                CRA
                            </Text>
                            <Text style={[GlobalStyles.text, { color: themes.colors.blueDark, fontFamily: 'NunitoSans_400Regular' }]}>
                                30 {/* Este valor ainda precisa de uma lógica de cálculo */}
                            </Text>
                        </View>
                        <FontAwesome name="line-chart" size={30} color={themes.colors.blueDark} />
                    </View>
                </View>
            </View>
        </View>
    );
}