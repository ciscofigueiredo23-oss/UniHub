import React from "react";
import { View, Text } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

export default function GradeScreen() {
    return (
        <SafeAreaView style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <View><Text>Config Screen</Text></View>
        </SafeAreaView>
    );
}