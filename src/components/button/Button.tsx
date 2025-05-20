import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  View,
  StyleProp,
  ViewStyle,
  TextStyle,
} from "react-native";
import { useTheme } from "../../theme/theme-context";
import { Feather } from "@expo/vector-icons";

export type ButtonVariant = "primary" | "secondary" | "outlined" | "text";
export type ButtonSize = "small" | "medium" | "large";

export interface ButtonProps {
  /** The label text of the button */
  label: string;
  /** Function called when button is pressed */
  onPress: () => void;
  /** Visual variant of the button */
  variant?: ButtonVariant;
  /** Size of the button */
  size?: ButtonSize;
  /** Whether the button is in loading state */
  loading?: boolean;
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Icon to display before the label */
  leftIcon?: keyof typeof Feather.glyphMap;
  /** Icon to display after the label */
  rightIcon?: keyof typeof Feather.glyphMap;
  /** Additional styles for the button container */
  style?: StyleProp<ViewStyle>;
  /** Additional styles for the button text */
  textStyle?: StyleProp<TextStyle>;
  /** Accessibility label for screen readers */
  accessibilityLabel?: string;
  /** Test ID for testing */
  testID?: string;
  /** Custom background color for primary variant */
  primaryColor?: string;
  /** Custom background color for secondary variant */
  secondaryColor?: string;
  /** Custom text color for outlined and text variants */
  textColor?: string;
}

const getStyles = (
  theme: ReturnType<typeof useTheme>,
  variant: ButtonVariant,
  size: ButtonSize,
  disabled: boolean,
  loading: boolean,
  primaryColor?: string,
  secondaryColor?: string,
  textColor?: string
) => {
  const baseStyles = StyleSheet.create({
    button: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: theme.borderRadius.medium,
      opacity: disabled || loading ? 0.6 : 1,
    },
    touchable: {
      backgroundColor: "transparent",
      borderColor: "transparent",
    },
    textBase: {
      textAlign: "center",
      fontWeight: "600",
    },
    icon: {
      marginHorizontal: theme.spacing.xs,
    },
  });

  const variantStyles: Record<
    ButtonVariant,
    { button: ViewStyle; text: TextStyle }
  > = {
    primary: {
      button: {
        backgroundColor: primaryColor || theme.colors.primary.main,
      },
      text: {
        color: theme.colors.neutral.white,
      },
    },
    secondary: {
      button: {
        backgroundColor: secondaryColor || theme.colors.secondary.main,
      },
      text: {
        color: theme.colors.neutral.white,
      },
    },
    outlined: {
      button: {
        backgroundColor: "transparent",
        borderWidth: 1,
        borderColor: textColor || theme.colors.primary.main,
      },
      text: {
        color: textColor || theme.colors.primary.main,
      },
    },
    text: {
      button: {
        backgroundColor: "transparent",
      },
      text: {
        color: textColor || theme.colors.primary.main,
      },
    },
  };

  const sizeStyles: Record<ButtonSize, { button: ViewStyle; text: TextStyle }> =
    {
      small: {
        button: {
          paddingVertical: theme.spacing.xs,
          paddingHorizontal: theme.spacing.sm,
        },
        text: {
          fontSize: theme.typography.sizes.small,
        },
      },
      medium: {
        button: {
          paddingVertical: theme.spacing.sm,
          paddingHorizontal: theme.spacing.md,
        },
        text: {
          fontSize: theme.typography.sizes.medium,
        },
      },
      large: {
        button: {
          paddingVertical: theme.spacing.md,
          paddingHorizontal: theme.spacing.lg,
        },
        text: {
          fontSize: theme.typography.sizes.large,
        },
      },
    };

  return {
    ...baseStyles,
    button: {
      ...baseStyles.button,
      ...variantStyles[variant].button,
      ...sizeStyles[size].button,
    },
    text: {
      ...baseStyles.textBase,
      ...variantStyles[variant].text,
      ...sizeStyles[size].text,
    },
  };
};

export const Button: React.FC<ButtonProps> = ({
  label,
  onPress,
  variant = "primary",
  size = "medium",
  loading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  style,
  textStyle,
  accessibilityLabel,
  testID,
  primaryColor,
  secondaryColor,
  textColor,
}) => {
  const theme = useTheme();
  const styles = getStyles(
    theme,
    variant,
    size,
    disabled,
    loading,
    primaryColor,
    secondaryColor,
    textColor
  );

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[styles.button, styles.touchable, style]}
      accessibilityLabel={accessibilityLabel || label}
      accessibilityRole="button"
      accessibilityState={{ disabled, busy: loading }}
      testID={testID}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={
            variant === "outlined" || variant === "text"
              ? textColor || theme.colors.primary.main
              : theme.colors.neutral.white
          }
        />
      ) : (
        <View style={styles.button}>
          {leftIcon && (
            <Feather
              name={leftIcon}
              size={size === "small" ? 16 : size === "medium" ? 20 : 24}
              color={styles.text.color}
              style={styles.icon}
            />
          )}
          <Text style={[styles.text, textStyle]}>{label}</Text>
          {rightIcon && (
            <Feather
              name={rightIcon}
              size={size === "small" ? 16 : size === "medium" ? 20 : 24}
              color={styles.text.color}
              style={styles.icon}
            />
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};
