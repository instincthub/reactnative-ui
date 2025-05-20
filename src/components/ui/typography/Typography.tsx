import React from "react";
import { Text, TextStyle, TextProps } from "react-native";
import { useTheme } from "../../../theme/theme-context";
import { useResponsiveFont } from "./useResponsiveFont";
import { useAccessibilityFont } from "./useAccessibilityFont";

/**
 * Available typography variants
 */
export type TypographyVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "subtitle1"
  | "subtitle2"
  | "body1"
  | "body2"
  | "button"
  | "caption"
  | "overline";

/**
 * Props for the Typography component
 */
export interface TypographyProps extends TextProps {
  /** The typography variant to use */
  variant?: TypographyVariant;
  /** Text color */
  color?: string;
  /** Text alignment */
  align?: "auto" | "left" | "right" | "center" | "justify";
  /** Font weight */
  weight?:
    | "normal"
    | "bold"
    | "100"
    | "200"
    | "300"
    | "400"
    | "500"
    | "600"
    | "700"
    | "800"
    | "900";
  /** Whether text should be italic */
  italic?: boolean;
  /** Whether text should be underlined */
  underline?: boolean;
  /** Whether text should have strikethrough */
  strikethrough?: boolean;
  /** Whether to apply responsive sizing */
  responsive?: boolean;
  /** Whether to respect device accessibility settings */
  accessibilityScaling?: boolean;
  /** The content to display */
  children: React.ReactNode;
}

/**
 * A component for displaying text with consistent styling
 */
export const Typography: React.FC<TypographyProps> = ({
  variant = "body1",
  color,
  align,
  weight,
  italic,
  underline,
  strikethrough,
  style,
  children,
  responsive = true,
  accessibilityScaling = true,
  ...rest
}) => {
  const theme = useTheme();

  // Get styles based on variant from theme
  const variantStyle = theme.typography.variants[variant];

  // Apply responsive and accessibility scaling
  let fontSize = variantStyle.fontSize;
  if (responsive) {
    fontSize = useResponsiveFont(fontSize);
  }
  if (accessibilityScaling) {
    fontSize = useAccessibilityFont(fontSize);
  }

  // Build the combined style
  const textStyle: TextStyle = {
    fontFamily: variantStyle.fontFamily,
    fontSize,
    lineHeight: variantStyle.lineHeight,
    color: color || theme.colors.text.primary,
    textAlign: align,
    fontWeight: (weight || variantStyle.fontWeight) as TextStyle["fontWeight"],
    fontStyle: italic ? "italic" : "normal",
    textDecorationLine: underline
      ? "underline"
      : strikethrough
      ? "line-through"
      : "none",
  };

  return (
    <Text style={[textStyle, style]} {...rest}>
      {children}
    </Text>
  );
};

export default Typography;
