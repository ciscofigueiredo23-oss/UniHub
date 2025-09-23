import React from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { Octicons } from '@expo/vector-icons';
import { GlobalStyles } from "../../global/stylesGlobal";
import { themes } from '../../global/themes';
import { HomeStyles } from "../../pages/Home/HomeStyles";
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { useSubjects } from "../../context/SubjectsContext";

export default function SubjectsCard() {
    const navigation = useNavigation<NavigationProp<any>>();
    const { disciplinas, loading } = useSubjects();

    const subjectsCursando = disciplinas.filter(disciplina => disciplina.status === "Cursando");

    const getNotaStyles = (notaFinal: number) => {
        if (notaFinal < 5) {
            return {
                backgroundColor: themes.colors.redLight,
                borderColor: themes.colors.redDark,
                color: themes.colors.redDark,
            };
        } else {
            return {
                backgroundColor: themes.colors.greenLight,
                borderColor: themes.colors.greenDark,
                color: themes.colors.greenDark,
            };
        }
    };

    if (loading) {
        return (
            <View style={[GlobalStyles.card, { alignItems: 'center', justifyContent: 'center' }]}>
                <ActivityIndicator size="large" color={themes.colors.yellowDark} />
                <Text style={[GlobalStyles.text, { marginTop: 10 }]}>Carregando disciplinas...</Text>
            </View>
        );
    }

    return (
        <View style={GlobalStyles.card}>
            <View style={GlobalStyles.cardHeader}>
                <View style={[GlobalStyles.iconContainer, { backgroundColor: themes.colors.yellowLight }]}>
                    <Octicons name="book" size={30} color={themes.colors.yellowDark} />
                </View>
                <Text style={GlobalStyles.title}>Disciplinas em Andamento</Text>
            </View>

            <View style={GlobalStyles.cardBody}>
                {subjectsCursando.length === 0 ? (
                    <>
                        <Octicons name="clock" size={40} color={themes.colors.grayDark} />
                        <Text style={[GlobalStyles.text, { fontFamily: 'NunitoSans_700Bold', paddingTop: 15 }]}>
                            Nenhuma disciplina marcada como cursando.
                        </Text>
                        <Text style={[GlobalStyles.text, { paddingBottom: 10 }]}>
                            Marque suas disciplinas atuais na aba Disciplinas.
                        </Text>
                    </>
                ) : (
                    subjectsCursando.map((disciplina, index) => {
                        const notaStyles = getNotaStyles(disciplina.notaFinal);

                        return (
                            <TouchableOpacity
                                key={index}
                                style={GlobalStyles.itemCard}
                                onPress={() => navigation.navigate("DetailsSubject", { discipline: disciplina })}
                            >
                                <View style={{ marginHorizontal: 10, justifyContent: 'space-between' }}>
                                    <Text style={[HomeStyles.titleSubject, { marginBottom: 10 }]}>{disciplina.nome}</Text>
                                    <Text style={HomeStyles.subjectInformations}>{disciplina.codigo}</Text>
                                    <Text style={HomeStyles.subjectInformations}>{disciplina.horario}</Text>
                                    <Text style={HomeStyles.subjectInformations}>{disciplina.sala}</Text>
                                </View>

                                <View style={{ marginHorizontal: 10, alignItems: "center" }}>
                                    <View style={[GlobalStyles.boxNota, { backgroundColor: notaStyles.backgroundColor, borderColor: notaStyles.borderColor }]}>
                                        <Text style={[HomeStyles.subjectInformations, { color: notaStyles.color }]}>
                                            {disciplina.notaFinal?.toFixed(1) ?? 'N/A'}
                                        </Text>
                                    </View>
                                    <Text style={HomeStyles.subjectInformations}>{disciplina.falta}</Text>
                                </View>
                            </TouchableOpacity>
                        );
                    })
                )}
            </View>
        </View>
    );
}