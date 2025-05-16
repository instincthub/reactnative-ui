import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Typography, { TypographyProps } from "./Typography";

/**
 * Props for TextWithIcon component
 */
interface TextWithIconProps extends TypographyProps {
  /** Name of the Ionicons icon */
  iconName: keyof typeof Ionicons.glyphMap;
  /** Size of the icon */
  iconSize?: number;
  /** Color of the icon */
  iconColor?: string;
  /** Position of the icon relative to text */
  iconPosition?: "left" | "right";
  /** Space between icon and text */
  spacing?: number;
  /** Style for the container */
  containerStyle?: ViewStyle;
  /** Style for the icon */
  iconStyle?: ViewStyle;
}

/**
 * A component that renders text with an icon
 */
export const TextWithIcon: React.FC<TextWithIconProps> = ({
  iconName,
  iconSize = 16,
  iconColor,
  iconPosition = "left",
  spacing = 8,
  containerStyle,
  iconStyle,
  children,
  ...typographyProps
}) => {
  const { color } = typographyProps;

  return (
    <View
      style={[
        styles.container,
        { flexDirection: iconPosition === "left" ? "row" : "row-reverse" },
        containerStyle,
      ]}
    >
      <Ionicons
        name={iconName}
        size={iconSize}
        color={iconColor || color}
        style={[
          iconPosition === "left"
            ? { marginRight: spacing }
            : { marginLeft: spacing },
          iconStyle,
        ]}
      />
      <Typography {...typographyProps}>{children}</Typography>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
});
