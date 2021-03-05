import PinkYellow from "@psi/styleguide/theme/themes/PinkYellow";
import PinkYellowDark from "@psi/styleguide/theme/themes/PinkYellowDark";

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
  disabledColor: string;
  focusBackgroundColor: string;
  focusBackgroundColorHover: string;
  focusBackgroundColorTextForeground: string;
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

export default themes;
