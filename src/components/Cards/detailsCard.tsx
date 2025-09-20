import React, { useState } from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { SubjectStyles } from "../../pages/Subjects/SubjectsStyles";
import { GlobalStyles } from "../../global/stylesGlobal";
import { themes } from "../../global/themes";
import { Octicons } from "@expo/vector-icons";
import { Disciplina } from "../../types";


interface SubjectCardProps {
    disciplina: Disciplina;
    onPress: () => void; // 👈 Já existe, vamos usá-la corretamente
}

export default function detailsCard({ disciplina, onPress }: SubjectCardProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    
    // A chamada de navegação foi removida daqui
    // const navigation = useNavigation<NavigationProp<any>>();

    type PeriodKeys =
        | "period1"
        | "period2"
        | "period3"
        | "period4"
        | "period5"
        | "period6"
        | "period7"
        | "period8"
        | "period9"
        | "period10";


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
        "10º Semestre"
    ];

    let iconName = "check-circle";
    let iconColor = themes.colors.greenDark;
    let iconBgColor = themes.colors.greenLight;
    let borderColor = themes.colors.greenLight;
    let fontColor = themes.colors.greenDark;

    if (disciplina.status === "Cursando") {
        iconName = "book";
        iconColor = themes.colors.yellowDark;
        iconBgColor = themes.colors.yellowLight;
        borderColor = themes.colors.yellowDark;
        fontColor = themes.colors.yellowDark;
    } else if (disciplina.status === "Disponível") {
        iconName = "check-circle";
        iconColor = themes.colors.purpleDark;
        iconBgColor = themes.colors.purpleLight;
        borderColor = themes.colors.purpleDark;
        fontColor = themes.colors.purpleDark;
    } else if (disciplina.status === "Concluída") {
        iconName = "check-circle";
        iconColor = themes.colors.greenDark;
        iconBgColor = themes.colors.greenLight;
        borderColor = themes.colors.greenDark;
        fontColor = themes.colors.greenDark;
    } else if (disciplina.status === "Bloqueada") {
        iconName = "lock";
        iconColor = themes.colors.grayDark;
        iconBgColor = themes.colors.grayLight;
        borderColor = themes.colors.grayDark;
        fontColor = themes.colors.grayDark;
    }

    const notaBgColor =
        (disciplina.notaFinal !== undefined && disciplina.notaFinal < 5) ? themes.colors.redLight : themes.colors.greenLight;

    return (
        <TouchableOpacity
            style={SubjectStyles.subject}
            onPress={onPress} // 👈 Use a prop `onPress` que foi passada
        >
            <View style={SubjectStyles.subjectLeft}>
                <View
                    style={{
                        marginHorizontal: 10,
                        flexDirection: "row",
                        alignItems: "center",
                        marginBottom: 10,
                    }}
                >
                    <View
                        style={[
                            GlobalStyles.iconContainer,
                            { backgroundColor: iconBgColor },
                        ]}
                    >
                        <Octicons name={iconName as any} size={30} color={iconColor} />
                    </View>
                    <View style={{ marginHorizontal: 10, flexDirection: "column" }}>
                        <Text style={[GlobalStyles.title, { marginBottom: 10 }]}>
                            {disciplina.nome}
                        </Text>
                        <Text style={GlobalStyles.text}>{disciplina.codigo}</Text>
                    </View>
                </View>
                <Text style={[GlobalStyles.textPre, { paddingHorizontal: 10, }]}>Pré-requisitos: </Text>
                <View style={{ flexDirection: 'row' }}>
                    {disciplina.preRequirements?.map((preRequisito, index) => (
                        <View style={GlobalStyles.preContainer} key={index}>
                            <Text style={GlobalStyles.textPre}>{preRequisito.codigo}</Text>
                        </View>
                    ))}
                </View>

                <View style={{ flexDirection: 'row' }}>
                    <Text style={[SubjectStyles.text, { paddingHorizontal: 10, }]}>Nota: </Text>
                    {disciplina.status === "Bloqueada" ? (
                        <>
                            <View style={[SubjectStyles.iconContainer, { backgroundColor: themes.colors.grayLight }]}>
                                <Text style={[GlobalStyles.text]}>--</Text>
                            </View>
                        </>
                    ) : disciplina.status === "Disponível" ? (
                        <>
                            <View style={[SubjectStyles.iconContainer, { backgroundColor: themes.colors.purpleLight }]}>
                                <Text style={[GlobalStyles.text]}>--</Text>
                            </View>
                        </>
                    ) : (
                        <>
                            <View style={[SubjectStyles.iconContainer, { backgroundColor: notaBgColor }]}>
                                <Text style={[GlobalStyles.text]}>{disciplina.notaFinal?.toFixed(1) ?? '--'}</Text>
                            </View>
                        </>
                    )}
                </View>
            </View>
            <View style={SubjectStyles.subjectRight}>
                <View style={[SubjectStyles.status, { backgroundColor: iconBgColor, borderColor: borderColor, }]}>
                    <Text style={[SubjectStyles.text, { color: fontColor }]}>{disciplina.status}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}