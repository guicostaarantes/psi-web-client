import { createState, useState } from "@hookstate/core";
import themes, { ThemeProps } from "@src/styleguide/Theme";
import PinkYellow from "@src/styleguide/Theme/themes/PinkYellow";

type ThemeKey = keyof typeof themes;

const themeState = createState<ThemeProps>(PinkYellow);

const useTheme = () => {
  const themeHook = useState(themeState);

  const theme = themeHook.get();

  const changeTheme = (selectedTheme: ThemeKey) => {
    themeHook.set(themes[selectedTheme]);
  };

  return { theme, changeTheme };
};

export default useTheme;
