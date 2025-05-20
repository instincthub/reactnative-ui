import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { useTheme } from "../../theme/theme-context";

export interface RadioProps {
  /** The label text of the radio button */
  label: string;
  /** Whether the radio button is selected */
  selected: boolean;
  /** Function called when radio button is pressed */
  onPress: () => void;
  /** Size of the radio button */
  size?: "small" | "medium" | "large";
  /** Whether the radio button is disabled */
  disabled?: boolean;
  /** Custom color for selected state */
  selectedColor?: string;
  /** Custom color for unselected state */
  unselectedColor?: string;
  /** Custom color for label text */
  labelColor?: string;
  /** Custom color for disabled state */
  disabledColor?: string;
}

const getStyles = (
  theme: ReturnType<typeof useTheme>,
  size: "small" | "medium" | "large",
  selected: boolean,
  disabled: boolean,
  selectedColor?: string,
  unselectedColor?: string,
  labelColor?: string,
  disabledColor?: string
) => {
  const getRadioSize = () => {
    switch (size) {
      case "small":
        return 16;
      case "large":
        return 24;
      default:
        return 20;
    }
  };

  const getInnerCircleSize = () => {
    switch (size) {
      case "small":
        return 8;
      case "large":
        return 12;
      default:
        return 10;
    }
  };

  const getLabelSize = () => {
    switch (size) {
      case "small":
        return theme.typography.sizes.small;
      case "large":
        return theme.typography.sizes.medium;
      default:
        return theme.typography.sizes.small;
    }
  };

  return StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      marginVertical: theme.spacing.xs,
    },
    radio: {
      width: getRadioSize(),
      height: getRadioSize(),
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 999, // Circular shape
      borderWidth: 2,
      borderColor: selected
        ? selectedColor || theme.colors.primary.main
        : unselectedColor || theme.colors.neutral.gray400,
      opacity: disabled ? 0.5 : 1,
    },
    innerCircle: {
      width: getInnerCircleSize(),
      height: getInnerCircleSize(),
      borderRadius: 999, // Circular shape
      backgroundColor: selectedColor || theme.colors.primary.main,
    },
    label: {
      fontFamily: theme.typography.fontFamily.primary,
      fontSize: getLabelSize(),
      color: disabled
        ? disabledColor || theme.colors.text.disabled
        : labelColor || theme.colors.text.primary,
      marginLeft: theme.spacing.sm,
    },
  });
};

export const Radio: React.FC<RadioProps> = ({
  label,
  selected,
  onPress,
  size = "medium",
  disabled = false,
  selectedColor,
  unselectedColor,
  labelColor,
  disabledColor,
}) => {
  const theme = useTheme();
  const styles = getStyles(
    theme,
    size,
    selected,
    disabled,
    selectedColor,
    unselectedColor,
    labelColor,
    disabledColor
  );

  const handlePress = () => {
    if (!disabled) {
      onPress();
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      disabled={disabled}
      style={styles.container}
      accessibilityRole="radio"
      accessibilityState={{ selected, disabled }}
    >
      <View style={styles.radio}>
        {selected && <View style={styles.innerCircle} />}
      </View>

      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};
