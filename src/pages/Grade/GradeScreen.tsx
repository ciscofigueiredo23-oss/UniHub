import React from "react";
import { themes } from "../../global/themes";
import { View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";
import CalendarCard from "../../components/Cards/CalendarCard";
import { GradeStyles } from "./GradeStyles";

export default function GradeScreen() {
    return (
        <SafeAreaView style={GradeStyles.safeArea}>
            <Header
                title="Grade Curricular"
                subtitle="Engenharia Elétrica - UFBA"
            />
            <CalendarCard />
        </SafeAreaView>
    );
}