import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  StyleProp,
  ViewStyle,
  TextStyle,
} from "react-native";
import { useTheme } from "../../theme/ThemeProvider";

export interface RadioProps {
  /** Whether the radio is selected */
  selected: boolean;
  /** Function called when radio state changes */
  onValueChange: (selected: boolean) => void;
  /** Text label for the radio */
  label?: string;
  /** Whether the radio is disabled */
  disabled?: boolean;
  /** Size of the radio */
  size?: "small" | "medium" | "large";
  /** Additional styles for the container */
  containerStyle?: StyleProp<ViewStyle>;
  /** Additional styles for the radio */
  radioStyle?: StyleProp<ViewStyle>;
  /** Additional styles for the label */
  labelStyle?: StyleProp<TextStyle>;
  /** Accessibility label for screen readers */
  accessibilityLabel?: string;
  /** Test ID for testing */
  testID?: string;
}

const getStyles = (
  theme: ReturnType<typeof useTheme>,
  size: "small" | "medium" | "large",
  selected: boolean,
  disabled: boolean
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
        ? theme.colors.primary.main
        : theme.colors.neutral.gray400,
      opacity: disabled ? 0.5 : 1,
    },
    innerCircle: {
      width: getInnerCircleSize(),
      height: getInnerCircleSize(),
      borderRadius: 999, // Circular shape
      backgroundColor: theme.colors.primary.main,
    },
    label: {
      fontFamily: theme.typography.fontFamily.primary,
      fontSize: getLabelSize(),
      color: disabled ? theme.colors.text.disabled : theme.colors.text.primary,
      marginLeft: theme.spacing.sm,
    },
  });
};

export const Radio: React.FC<RadioProps> = ({
  selected,
  onValueChange,
  label,
  disabled = false,
  size = "medium",
  containerStyle,
  radioStyle,
  labelStyle,
  accessibilityLabel,
  testID,
}) => {
  const theme = useTheme();
  const styles = getStyles(theme, size, selected, disabled);

  const handlePress = () => {
    if (!disabled) {
      onValueChange(!selected);
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      disabled={disabled}
      style={[styles.container, containerStyle]}
      accessibilityRole="radio"
      accessibilityState={{ selected, disabled }}
      accessibilityLabel={accessibilityLabel || label}
      testID={testID}
    >
      <View style={[styles.radio, radioStyle]}>
        {selected && <View style={styles.innerCircle} />}
      </View>

      {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
    </TouchableOpacity>
  );
};
