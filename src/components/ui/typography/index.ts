// Base Typography component
export { default as Typography } from "./Typography";
export type { TypographyProps, TypographyVariant } from "./Typography";

// Typography variants
export {
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  Subtitle1,
  Subtitle2,
  Body1,
  Body2,
  ButtonText,
  Caption,
  Overline,
} from "./TypographyVariants";

// Special text components
export { FormattedText, HighlightedText } from "./FormattedText";
export { TextWithIcon } from "./TextWithIcon";

// Hooks
export { useResponsiveFont } from "./useResponsiveFont";
export { useAccessibilityFont } from "./useAccessibilityFont";

// Theme provider
export { ThemeProvider, useTheme } from "../../../theme/ThemeProvider";
