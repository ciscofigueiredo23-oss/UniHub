import { StyleSheet, Dimensions } from "react-native";
import { themes } from "../../global/themes";

const screenWidth = Dimensions.get("window").width;
const isTablet = screenWidth > 600; // ajustar conforme desejar

export const DetailsSubjectStyles = StyleSheet.create({
  container: { // Estilo adicionado
    flex: 1,
    backgroundColor: themes.colors.background,
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
  body:{
    alignItems: 'center',
    justifyContent: 'center'

  },
  
  btnBack:{
    width: 40,
    height: 40,
    borderWidth: 1, 
    borderColor: themes.colors.grayLight, 
    borderRadius: 10,
    backgroundColor: '#ffffff2d',
    marginRight: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  btn:{
    borderRadius: 10,
    backgroundColor: themes.colors.background,
    marginHorizontal: 10,
    marginVertical: 10,
    height: 50,
    alignItems:'center',
    justifyContent:'center',
    width:'95%'
  },

  card:{
    width: '95%',
    backgroundColor: themes.colors.background,
    borderRadius: 20,
    padding: 20,
    marginVertical: 15,
  },

  cardHeader:{
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderBottomColor: themes.colors.grayLight,
    borderBottomWidth: 1,
    paddingBottom: 10,
  },

  cardBody:{
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  row: { // Estilo adicionado
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },

  text:{
    fontSize: isTablet ? 20 : 16,
    color: themes.colors.fontColor,
    fontFamily: "NunitoSans_400Regular",
    marginBottom: 5,
  },

  dropdown:{
    width: '45%',
    borderColor: themes.colors.grayDark,
    borderWidth: 1,
    borderRadius: 20,
    padding: 10,
    marginVertical: 10,
    backgroundColor: themes.colors.background,
    
  },

  dropdownStyle:{
    marginTop:-20,
    padding: 10,
    backgroundColor: themes.colors.background, // fundo do item
    borderBottomColor: themes.colors.grayDark, // separador
    borderBottomWidth: 1,
    borderRadius: 20,

  },

  placeholderStyle: { // Estilo adicionado
    fontSize: 16,
    color: themes.colors.grayDark,
  },

  adicionarNota:{
    width: "80%",
    backgroundColor: themes.colors.background,
    borderRadius: 10,
    padding: 20,

  },

  textInput:{
    borderWidth: 1,
    borderColor: themes.colors.grayDark,
    borderRadius: 20,
    paddingLeft: 10,
    width: '93%',

  },

  textBtn:{
    color: themes.colors.fontColor,
    fontFamily: "NunitoSans_400Regular",
    fontSize: isTablet ? 18 : 16,
    
  },
});