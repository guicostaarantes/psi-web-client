import { createState, useState } from "@hookstate/core";
import { useEffect } from "react";

import { DEFAULT_THEME, ThemeKey } from "@psi/styleguide/constants/theme";
import themes, { ThemeProps } from "@psi/styleguide/theme";

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
