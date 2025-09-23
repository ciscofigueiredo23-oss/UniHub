// styles/global.js
import { StyleSheet, Dimensions } from "react-native";
import { themes } from "./themes";

const { width, height } = Dimensions.get("window");

// Detecta se a tela é "grande" (tablet ou paisagem)
const isTablet = width > 800; // ajuste esse valor conforme seu layout


export const GlobalStyles = StyleSheet.create({
    
    container: { 
        flex: 1,
        width: '100%',
        backgroundColor: themes.colors.background,
        justifyContent: 'center',
        alignItems: 'center',
    },

    header:{
        width: '100%',
        backgroundColor: themes.colors.blueDark,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingBottom: 30,
        paddingTop: 30,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },

    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 16,
        marginTop: 40,

        //-------Sombra
        elevation: 2, // sombra no Android
        shadowColor: "#000", // sombra no iOS
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,


        // 🔑 Comportamento responsivo:
        width: "100%",
        maxWidth: isTablet ? "95%" : "90%", // em tablets limita a largura

        // Altura se adapta ao conteúdo
        flexShrink: 1,

    },
    itemCard: {
        backgroundColor: themes.colors.grayLight,
        borderRadius: 25,
        paddingHorizontal: 15,
        paddingVertical: 20,
        marginVertical: 10,
        flexDirection:"row",
        justifyContent: isTablet ? 'space-between' : 'space-around',
        alignItems: "center",

        //-------Sombra
        elevation: 2, // sombra no Android
        shadowColor: "#000", // sombra no iOS
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        

        // 🔑 Comportamento responsivo:
        width: "100%",

        // Altura se adapta ao conteúdo
        flexShrink: 1,
    },

    cardHeader:{
        flexDirection: "row",
        alignItems: "center",
        paddingBottom: 10,
    },

    cardBody:{
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',

    },

    miniCard: {
        width: isTablet ? "50%" : "100%", // lado a lado no tablet, empilhado no celular
        marginBottom: 10,
    },

    itemMiniCard: {
        borderRadius: 25,
        padding: 15,
        marginVertical: 10,
        flexDirection:"row",
        justifyContent: "space-between",
        alignItems: "center",

        //-------Sombra
        elevation: 2, // sombra no Android
        shadowColor: "#000", // sombra no iOS
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        

        // 🔑 Comportamento responsivo:
        width: "100%",

        // Altura se adapta ao conteúdo
        flexShrink: 1,
    },

    title: {
        fontSize: isTablet ? 24 : 20,
        fontWeight: "bold",
        color: themes.colors.fontColor,
        fontFamily: "NunitoSans_700Bold",
    },

    text:{
        fontSize: isTablet ? 20 : 16,
        color: themes.colors.fontColor,
        fontFamily: "NunitoSans_400Regular",
    },

    iconContainer:{
        width: 50, 
        height: 50, 
        borderRadius: 15,
        marginRight: 10,
        justifyContent: "center",
        alignItems: "center"
    },

    btn:{
        padding: 10,

        borderWidth: 1,
        borderRadius: 10,
        borderColor: themes.colors.purpleDark,

        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'

    },

    separadorVertical:{
        backgroundColor: themes.colors.grayLight,
        height: '80%',
        width: 1 ,
    },

    separadorHorizontal:{
        backgroundColor: themes.colors.grayDark,
        height: 1,
        width: '100%' ,
        marginVertical: 20,
    },


    boxNota:{
        backgroundColor: themes.colors.greenLight,
        borderWidth: 1,
        borderColor: themes.colors.greenDark,
        paddingHorizontal: 15,
        paddingVertical: 1,
        borderRadius: 20,
    },

    preContainer:{
    flexDirection: 'row',
    backgroundColor: themes.colors.grayLight,
    marginHorizontal: 10,
    marginVertical: 5,
    paddingVertical: 2,
    paddingHorizontal: 10,
    borderRadius: 10,

  },
  textPre:{
    fontSize: isTablet ? 16 : 14,
    color: themes.colors.fontColor,
    fontFamily: "NunitoSans_400Regular",

  },
  
});
