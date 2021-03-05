import themes from "@src/modules/styleguide/theme";

export type ThemeKey = keyof typeof themes;

export const DEFAULT_THEME: ThemeKey = "pinkYellow";
