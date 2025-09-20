import { StyleSheet, Dimensions } from "react-native";
import { themes } from "../../global/themes";

const screenWidth = Dimensions.get("window").width;
const isTablet = screenWidth > 600; // ajustar conforme desejar

export const HomeStyles = StyleSheet.create({
    titleSubject:{
        fontSize: isTablet ? 24 : 16,
        color: themes.colors.fontColor,
        fontFamily: "NunitoSans_700Bold",
    },
    subjectInformations: {
        
        fontSize: isTablet ? 16 : 16, 
        color: themes.colors.grayDark,
        fontFamily: "NunitoSans_400Regular",
    },
});
