// styles/global.js
import { StyleSheet, Dimensions } from "react-native";
import { themes } from "./themes";

const { width, height } = Dimensions.get("window");

// Detecta se a tela é "grande" (tablet ou paisagem)
const isTablet = width > 800; // ajuste esse valor conforme seu layout


export const EditDisciplinaModalStyles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.3)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContent: {
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 20,
        width: "90%",
        maxHeight: "90%",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
    },
    statusRow: {
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        marginBottom: 15,
    },
    statusLabel: {
        marginRight: 10,
        fontWeight: "bold",
    },
    statusButton: {
        borderWidth: 1,
        borderColor: "#007bff",
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginRight: 8,
        marginBottom: 5,
    },
    statusButtonSelected: {
        backgroundColor: "#007bff",
    },
    statusButtonText: {
        color: "#007bff",
    },
    statusButtonTextSelected: {
        color: "#fff",
        fontWeight: "bold",
    },
    buttonRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
    },
    button: {
        flexDirection: "row",
        alignItems: "center",
        padding: 12,
        borderRadius: 8,
        minWidth: 100,
        justifyContent: "center",
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
        marginLeft: 8,
    },
  
});
