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
import { Feather } from "@expo/vector-icons";
import { useTheme } from "../../theme/ThemeProvider";

export interface CheckboxProps {
  /** Whether the checkbox is checked */
  checked: boolean;
  /** Function called when checkbox state changes */
  onValueChange: (checked: boolean) => void;
  /** Text label for the checkbox */
  label?: string;
  /** Whether the checkbox is in an indeterminate state */
  indeterminate?: boolean;
  /** Whether the checkbox is disabled */
  disabled?: boolean;
  /** Size of the checkbox */
  size?: "small" | "medium" | "large";
  /** Additional styles for the container */
  containerStyle?: StyleProp<ViewStyle>;
  /** Additional styles for the checkbox */
  checkboxStyle?: StyleProp<ViewStyle>;
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
  checked: boolean,
  indeterminate: boolean,
  disabled: boolean
) => {
  const getCheckboxSize = () => {
    switch (size) {
      case "small":
        return 16;
      case "large":
        return 24;
      default:
        return 20;
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
    checkbox: {
      width: getCheckboxSize(),
      height: getCheckboxSize(),
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 4,
      borderWidth: 2,
      borderColor:
        checked || indeterminate
          ? theme.colors.primary.main
          : theme.colors.neutral.gray400,
      backgroundColor:
        checked || indeterminate ? theme.colors.primary.main : "transparent",
      opacity: disabled ? 0.5 : 1,
    },
    label: {
      fontFamily: theme.typography.fontFamily.primary,
      fontSize: getLabelSize(),
      color: disabled ? theme.colors.text.disabled : theme.colors.text.primary,
      marginLeft: theme.spacing.sm,
    },
  });
};

export const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onValueChange,
  label,
  indeterminate = false,
  disabled = false,
  size = "medium",
  containerStyle,
  checkboxStyle,
  labelStyle,
  accessibilityLabel,
  testID,
}) => {
  const theme = useTheme();
  const styles = getStyles(theme, size, checked, indeterminate, disabled);

  const handlePress = () => {
    if (!disabled) {
      onValueChange(!checked);
    }
  };

  // Determine icon size
  const getIconSize = () => {
    switch (size) {
      case "small":
        return 12;
      case "large":
        return 18;
      default:
        return 14;
    }
  };

  // Render the appropriate icon based on state
  const renderIcon = () => {
    if (checked) {
      return (
        <Feather
          name="check"
          size={getIconSize()}
          color={theme.colors.neutral.white}
        />
      );
    } else if (indeterminate) {
      return (
        <Feather
          name="minus"
          size={getIconSize()}
          color={theme.colors.neutral.white}
        />
      );
    }
    return null;
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      disabled={disabled}
      style={[styles.container, containerStyle]}
      accessibilityRole="checkbox"
      accessibilityState={{ checked, disabled }}
      accessibilityLabel={accessibilityLabel || label}
      testID={testID}
    >
      <View style={[styles.checkbox, checkboxStyle]}>{renderIcon()}</View>

      {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
    </TouchableOpacity>
  );
};
