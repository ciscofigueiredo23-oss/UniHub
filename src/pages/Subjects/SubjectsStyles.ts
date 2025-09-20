import { StyleSheet, Dimensions } from "react-native";
import { themes } from "../../global/themes";

const screenWidth = Dimensions.get("window").width;
const isTablet = screenWidth > 600; // ajustar conforme desejar


export const SubjectStyles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: themes.colors.background, 
    paddingBottom: 20,
  },

  textInput:{
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 15,
    paddingVertical: 10,
    margin: 15,
    borderRadius: 50,
    backgroundColor: "#fff",
  },

  btn:{
    paddingVertical: 5,
    paddingHorizontal: isTablet ? 20 : 0,
    borderRadius: 50,
    marginHorizontal: isTablet ? 20 : 5,
    borderWidth: 1, 
  },

  btnText:{
    fontSize: isTablet ? 20 : 16,
    color: themes.colors.fontColor,
    fontFamily: "NunitoSans_400Regular",
    paddingHorizontal: 15,
  },

  btnFilter:{
    flexDirection: "row",
    marginBottom: 15,
  },

  iconContainer:{
    paddingVertical: 3,
    paddingHorizontal : 8,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center"
  },

  subject: {
    backgroundColor: themes.colors.background,
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 20,
    marginVertical: 10,
    flexDirection:"row",
    alignItems: 'center',
    justifyContent: isTablet ? 'space-between' : 'space-around', 
  
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

  subjectLeft:{
    flexDirection: "column", 
    justifyContent: 'space-between',
    marginBottom: 10,
  },

  subjectRight:{
    flex: 1,
    alignItems: 'flex-end'
  },

  list:{
    paddingHorizontal: 10,
  },

  status:{
    paddingVertical: 5,
    paddingHorizontal: 15,
    marginVertical: 15, 
    borderRadius: 20,
    borderWidth: 1,
    
  },

  text:{
    fontSize: isTablet ? 20 : 22,
    fontFamily: "NunitoSans_700bond",
  },

  dropdown:{
    width: '50%',
    borderColor: themes.colors.grayDark,
    borderWidth: 1,
    borderRadius: 20,
    padding: 10,
    marginLeft: 20,
    backgroundColor: themes.colors.background,
    
  },

  dropdownStyle:{
    padding: 10,
    backgroundColor: themes.colors.background, // fundo do item
    borderBottomColor: themes.colors.grayDark, // separador
    borderBottomWidth: 1,
  },
  
  btnPeriod:{
    width: '95%',
    height: 50,
    alignItems: 'center',
    marginVertical: 15, 
    backgroundColor: themes.colors.grayLight,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,

   

  },

  verticalLine:{
    width: 4,       // tamanho horizontal
    height: 50,          // espessura do traço
    marginVertical: 15, 
    backgroundColor: themes.colors.blueDark, // cor do traço
    paddingVertical: 20,
    borderRadius: 5,
  },

  horizontalLine:{
    height: 2,
    backgroundColor: themes.colors.grayLight,
    
  },


});
