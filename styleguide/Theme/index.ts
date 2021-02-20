import PinkYellow from "styleguide/Theme/themes/PinkYellow";
import PinkYellowDark from "styleguide/Theme/themes/PinkYellowDark";
import { createState } from "@hookstate/core";

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

export const changeTheme = (selectedTheme: string) => {
  themeState.set(themes[selectedTheme]);
};

const themeState = createState(PinkYellow);

export default themeState;
