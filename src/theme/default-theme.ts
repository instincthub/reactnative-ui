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
