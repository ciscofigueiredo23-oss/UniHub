// filterStyles.js
import { themes } from "./themes";

export const filterStyles = {
  all: {
    background: themes.colors.blueLight,
    border: themes.colors.blueDark,
    text: themes.colors.blueDark,
  },
  Cursando: {
    background: themes.colors.yellowLight,
    border: themes.colors.yellowDark,
    text: themes.colors.yellowDark,
  },
  Disponível: {
    background: themes.colors.purpleLight,
    border: themes.colors.purpleDark,
    text: themes.colors.purpleDark,
  },
  Concluída: {
    background: themes.colors.greenLight,
    border: themes.colors.greenDark,
    text: themes.colors.greenDark,
  },
  Bloqueada: {
    background: themes.colors.redLight,
    border: themes.colors.redDark,
    text: themes.colors.redDark,
  },
};