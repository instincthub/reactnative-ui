import React, { createContext, useContext } from "react";
import { colors as defaultColors } from "./colors";
import { typography as defaultTypography } from "./typography";
import { spacing as defaultSpacing } from "./spacing";
import { elevation as defaultElevation } from "./elevation";
import { borderRadius as defaultBorderRadius } from "./borderRadius";
import { shadows as defaultShadows } from "./shadows";
export interface Theme {
  colors: typeof defaultColors;
  typography: typeof defaultTypography;
  spacing: typeof defaultSpacing;
  elevation: typeof defaultElevation;
  borderRadius: typeof defaultBorderRadius;
  shadows: typeof defaultShadows;
}

export const defaultTheme: Theme = {
  colors: defaultColors,
  typography: defaultTypography,
  spacing: defaultSpacing,
  elevation: defaultElevation,
  borderRadius: defaultBorderRadius,
  shadows: defaultShadows,
};

export const ThemeContext = createContext<Theme>(defaultTheme);

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
    ...theme,
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
  };

  return (
    <ThemeContext.Provider value={mergedTheme}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
