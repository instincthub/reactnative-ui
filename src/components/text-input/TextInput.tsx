import React, { useState } from "react";
import {
  View,
  TextInput as RNTextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  TextStyle,
  NativeSyntheticEvent,
  TextInputFocusEventData,
} from "react-native";
import { useTheme } from "../../theme/ThemeProvider";
import { Feather } from "@expo/vector-icons";

export type ValidationState = "default" | "error" | "success" | "warning";
export type InputVariant = "outlined" | "filled" | "underlined";
export type KeyboardType =
  | "default"
  | "email-address"
  | "numeric"
  | "phone-pad"
  | "number-pad";

export interface TextInputProps {
  /** Input label */
  label: string;
  /** Current value of the input */
  value: string;
  /** Function called when text changes */
  onChangeText: (text: string) => void;
  /** Placeholder text when input is empty */
  placeholder?: string;
  /** Whether the input is required */
  required?: boolean;
  /** Helper text below the input */
  helperText?: string;
  /** Visual validation state */
  validationState?: ValidationState;
  /** Error message (displayed when validationState is 'error') */
  errorMessage?: string;
  /** Whether the input is disabled */
  disabled?: boolean;
  /** The visual variant of the input */
  variant?: InputVariant;
  /** The type of keyboard to display */
  keyboardType?: KeyboardType;
  /** Whether the input should auto-capitalize */
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  /** Whether the input should auto-correct */
  autoCorrect?: boolean;
  /** Whether the input should be a password field */
  secureTextEntry?: boolean;
  /** Maximum length of input */
  maxLength?: number;
  /** Icon to display at the start of the input */
  leftIcon?: keyof typeof Feather.glyphMap;
  /** Icon to display at the end of the input */
  rightIcon?: keyof typeof Feather.glyphMap;
  /** Additional styles for the container */
  containerStyle?: StyleProp<ViewStyle>;
  /** Additional styles for the input */
  inputStyle?: StyleProp<TextStyle>;
  /** Additional styles for the label */
  labelStyle?: StyleProp<TextStyle>;
  /** Function called when input is focused */
  onFocus?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  /** Function called when input is blurred */
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  /** Accessibility label for screen readers */
  accessibilityLabel?: string;
  /** Test ID for testing */
  testID?: string;
}

const getStyles = (
  theme: ReturnType<typeof useTheme>,
  variant: InputVariant,
  validationState: ValidationState,
  isFocused: boolean,
  disabled: boolean
) => {
  const baseStyles = StyleSheet.create({
    container: {
      marginBottom: theme.spacing.md,
    },
    labelContainer: {
      flexDirection: "row",
      marginBottom: theme.spacing.xs,
      alignItems: "center",
    },
    label: {
      fontFamily: theme.typography.fontFamily.primary,
      fontSize: theme.typography.sizes.small,
      color: theme.colors.text.primary,
      fontWeight: theme.typography.fontWeight.medium as "normal",
    },
    requiredIndicator: {
      color: theme.colors.semantic.error,
      marginLeft: theme.spacing.xs,
    },
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      borderRadius: theme.borderRadius.medium,
      minHeight: 48,
    },
    input: {
      flex: 1,
      fontFamily: theme.typography.fontFamily.primary,
      fontSize: theme.typography.sizes.medium,
      color: theme.colors.text.primary,
      paddingVertical: theme.spacing.sm,
      paddingHorizontal: theme.spacing.md,
    },
    helperText: {
      fontFamily: theme.typography.fontFamily.primary,
      fontSize: theme.typography.sizes.small,
      color: theme.colors.text.secondary,
      marginTop: theme.spacing.xs,
    },
  });

  const variantStyles: Record<InputVariant, ViewStyle> = {
    outlined: {
      borderWidth: 1,
      borderColor: theme.colors.neutral.gray300,
      backgroundColor: "transparent",
    },
    filled: {
      borderWidth: 0,
      backgroundColor: theme.colors.neutral.gray100,
    },
    underlined: {
      borderWidth: 0,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.neutral.gray300,
      borderRadius: 0,
      backgroundColor: "transparent",
    },
  };

  const stateStyles: Record<
    ValidationState,
    { borderColor: string; textColor: string }
  > = {
    default: {
      borderColor: isFocused
        ? theme.colors.primary.main
        : theme.colors.neutral.gray300,
      textColor: theme.colors.text.secondary,
    },
    error: {
      borderColor: theme.colors.semantic.error,
      textColor: theme.colors.semantic.error,
    },
    success: {
      borderColor: theme.colors.semantic.success,
      textColor: theme.colors.semantic.success,
    },
    warning: {
      borderColor: theme.colors.semantic.warning,
      textColor: theme.colors.semantic.warning,
    },
  };

  return {
    ...baseStyles,
    inputContainer: {
      ...baseStyles.inputContainer,
      ...variantStyles[variant],
      borderColor: stateStyles[validationState].borderColor,
      opacity: disabled ? 0.6 : 1,
    },
    helperText: {
      ...baseStyles.helperText,
      color: stateStyles[validationState].textColor,
    },
  };
};

export const TextInput: React.FC<TextInputProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  required = false,
  helperText,
  validationState = "default",
  errorMessage,
  disabled = false,
  variant = "outlined",
  keyboardType = "default",
  autoCapitalize = "none",
  autoCorrect = false,
  secureTextEntry = false,
  maxLength,
  leftIcon,
  rightIcon,
  containerStyle,
  inputStyle,
  labelStyle,
  onFocus,
  onBlur,
  accessibilityLabel,
  testID,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(!secureTextEntry);
  const theme = useTheme();
  const styles = getStyles(
    theme,
    variant,
    validationState,
    isFocused,
    disabled
  );

  const handleFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const renderValidationIcon = () => {
    if (validationState === "success") {
      return (
        <Feather
          name="check-circle"
          size={18}
          color={theme.colors.semantic.success}
        />
      );
    } else if (validationState === "error") {
      return (
        <Feather
          name="alert-circle"
          size={18}
          color={theme.colors.semantic.error}
        />
      );
    } else if (validationState === "warning") {
      return (
        <Feather
          name="alert-triangle"
          size={18}
          color={theme.colors.semantic.warning}
        />
      );
    }
    return null;
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.labelContainer}>
        <Text style={[styles.label, labelStyle]}>{label}</Text>
        {required && <Text style={styles.requiredIndicator}>*</Text>}
      </View>

      <View style={styles.inputContainer}>
        {leftIcon && (
          <Feather
            name={leftIcon}
            size={18}
            color={theme.colors.text.secondary}
            style={{ marginLeft: theme.spacing.md }}
          />
        )}

        <RNTextInput
          value={value}
          onChangeText={onChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.text.hint}
          style={[styles.input, inputStyle]}
          editable={!disabled}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          autoCorrect={autoCorrect}
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          maxLength={maxLength}
          accessibilityLabel={accessibilityLabel || label}
          testID={testID}
        />

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {renderValidationIcon()}

          {secureTextEntry && (
            <TouchableOpacity
              onPress={togglePasswordVisibility}
              style={{ padding: theme.spacing.sm }}
              accessibilityRole="button"
              accessibilityLabel={
                isPasswordVisible ? "Hide password" : "Show password"
              }
            >
              <Feather
                name={isPasswordVisible ? "eye-off" : "eye"}
                size={18}
                color={theme.colors.text.secondary}
              />
            </TouchableOpacity>
          )}

          {rightIcon && (
            <Feather
              name={rightIcon}
              size={18}
              color={theme.colors.text.secondary}
              style={{ marginRight: theme.spacing.md }}
            />
          )}
        </View>
      </View>

      {(helperText || errorMessage) && (
        <Text style={styles.helperText}>
          {validationState === "error" ? errorMessage : helperText}
        </Text>
      )}
    </View>
  );
};
