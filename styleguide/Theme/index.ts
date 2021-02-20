import PinkYellow from "styleguide/Theme/themes/PinkYellow";
import PinkYellowDark from "styleguide/Theme/themes/PinkYellowDark";
import { createState, useState } from "@hookstate/core";

export interface ThemeProps {
  backgroundColor: string;
  backgroundColorHover: string;
  backgroundColorTextForeground: string;
  dangerColor: string;
  dangerColorHover: string;
  dangerColorTextForeground: string;
  defaultColor: string;
  defaultColorHover: string;
  defaultColorTextForeground: string;
  primaryColor: string;
  primaryColorHover: string;
  primaryColorTextForeground: string;
  secondaryColor: string;
  secondaryColorHover: string;
  secondaryColorTextForeground: string;
}

const themes = {
  pinkYellow: PinkYellow,
  pinkYellowDark: PinkYellowDark,
};

const themeState = createState(PinkYellow);

const useTheme = () => {
  const themeHook = useState(themeState);

  const theme = themeHook.get();

  const changeTheme = (selectedTheme: string) => {
    themeHook.set(themes[selectedTheme]);
  };

  return { theme, changeTheme };
};

export default useTheme;
