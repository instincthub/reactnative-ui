import React from "react";
import { defaultTheme, Theme } from "./default-theme";
import { ThemeContext } from "./theme-context";


export interface ThemeProviderProps {
  theme?: Partial<Theme>;
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  theme,
  children,
}) => {
  const mergedTheme: Theme = {
    ...defaultTheme,
    colors: {
      ...defaultTheme.colors,
      ...(theme?.colors || {}),
    },
    typography: {
      ...defaultTheme.typography,
      ...(theme?.typography || {}),
    },
    spacing: {
      ...defaultTheme.spacing,
      ...(theme?.spacing || {}),
    },
    elevation: {
      ...defaultTheme.elevation,
      ...(theme?.elevation || {}),
    },
    borderRadius: {
      ...defaultTheme.borderRadius,
      ...(theme?.borderRadius || {}),
    },
    ...theme,
  };

  return (
    <ThemeContext.Provider value={mergedTheme}>
      {children}
    </ThemeContext.Provider>
  );
};
