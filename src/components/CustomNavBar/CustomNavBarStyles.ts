import { StyleSheet, Dimensions } from "react-native";
import { themes } from "../../global/themes";

const screenWidth = Dimensions.get("window").width;
const isTablet = screenWidth > 600; // ajustar conforme desejar

const activeColor = themes.colors.blueDark;

export const CustomNavBarStyles = StyleSheet.create({
    container: {
      position: 'absolute',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: activeColor,
      width: isTablet ? '60%' : '80%',
      alignSelf: 'center',
      bottom: isTablet? 60 : 20,
      borderRadius: 40,
      paddingHorizontal: 12,
      paddingVertical: 15,
      
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 5,
      elevation: 3,
    },
  tabItem: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 36,
    paddingHorizontal: isTablet ? 50 : 20,
    borderRadius: 30,
    },
  text: {
    color: activeColor,
    marginLeft: 8,
    fontSize: 14,
    fontWeight: 'bold',
  },
});
