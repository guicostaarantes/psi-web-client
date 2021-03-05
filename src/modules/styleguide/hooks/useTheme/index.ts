import { useEffect } from "react";
import { createState, useState } from "@hookstate/core";
import {
  DEFAULT_THEME,
  ThemeKey,
} from "@src/modules/styleguide/constants/theme";
import themes, { ThemeProps } from "@src/modules/styleguide/theme";

const themeState = createState<ThemeProps>(themes[DEFAULT_THEME]);

const useTheme = () => {
  const themeHook = useState(themeState);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (Object.keys(themes).includes(savedTheme)) {
      themeHook.set(themes[savedTheme]);
    }
  }, []);

  const theme = themeHook.value;

  const changeTheme = (selectedTheme: ThemeKey) => {
    themeHook.set(themes[selectedTheme]);
  };

  return { theme, changeTheme };
};

export default useTheme;
