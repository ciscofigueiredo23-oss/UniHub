// src/pages/Grade/GradeScreen.tsx

import React, { useState } from "react";
import { themes } from "../../global/themes";
import { View, StyleSheet, TouchableOpacity, Modal, Text } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather, FontAwesome } from '@expo/vector-icons';
import CalendarCard from "../../components/Cards/CalendarCard";
import AddEventModal from "../../components/Modal/AddEventModal";
import { GradeStyles } from "./GradeStyles";
import { GlobalStyles } from "../../global/stylesGlobal";

export default function GradeScreen() {
    const [isModalVisible, setModalVisible] = useState(false);

    const openModal = () => setModalVisible(true);
    const closeModal = () => setModalVisible(false);

    return (
        <SafeAreaView style={GradeStyles.safeArea}>
            <View style={GlobalStyles.header}>
              <View>
                <Text style={[GlobalStyles.title, { color: 'white' }]}>Grade Curricular</Text>
                <Text style={[GlobalStyles.text, { color: 'white' }]}>Engenharia Elétrica</Text>
              </View>
              <View
                style={[
                  GlobalStyles.iconContainer,
                  { backgroundColor: '#ffffff2d', width: 50, height: 50, borderRadius: 50 },
                ]}
                >
                {/* Botão flutuante para adicionar evento */}
                <TouchableOpacity style={GradeStyles.addButton} onPress={openModal}>
                    <Feather name="plus" size={30} color="white" />
                </TouchableOpacity> 
              </View>
            </View>
            <View style={GradeStyles.container}>
                <View style={[GradeStyles.card]}>
                    <Text>Sei lá</Text>
                </View>
                <CalendarCard />
            </View>

            

            {/* Modal para adicionar evento */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={closeModal}
            >
                <AddEventModal onClose={closeModal} />
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: themes.colors.background,
    },
});