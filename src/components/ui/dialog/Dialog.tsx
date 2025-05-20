import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  TextStyle,
} from "react-native";
import { Modal, ModalProps } from "../modal/Modal";
import { useTheme } from "../../../theme/theme-context";

export type DialogVariant =
  | "default"
  | "alert"
  | "success"
  | "warning"
  | "info";
export type DialogActionLayout = "vertical" | "horizontal";

export interface DialogAction {
  /** Text label for the action button */
  label: string;
  /** Function called when the action is selected */
  onPress: () => void;
  /** Whether this is the primary action */
  primary?: boolean;
  /** Whether this action dismisses the dialog */
  dismissOnPress?: boolean;
  /** Whether the action is in a loading state */
  loading?: boolean;
  /** Whether the action is disabled */
  disabled?: boolean;
}

export interface DialogProps extends Omit<ModalProps, "children"> {
  /** Dialog title */
  title: string;
  /** Dialog message content */
  message: string;
  /** Dialog variant affecting visual styling */
  variant?: DialogVariant;
  /** Array of action buttons to display */
  actions?: DialogAction[];
  /** Layout orientation for actions */
  actionLayout?: DialogActionLayout;
  /** Icon to display beside the title */
  icon?: React.ReactNode;
  /** Custom primary color for buttons and accents */
  primaryColor?: string;
  /** Additional content to render below the message */
  children?: React.ReactNode;
  /** Additional styles for the actions container */
  actionsContainerStyle?: StyleProp<ViewStyle>;
  /** Additional styles for the buttons */
  buttonStyle?: StyleProp<ViewStyle>;
  /** Additional styles for the button text */
  buttonTextStyle?: StyleProp<TextStyle>;
  /** Additional styles for the message text */
  messageStyle?: StyleProp<TextStyle>;
}

export const Dialog: React.FC<DialogProps> = ({
  title,
  message,
  variant = "default",
  actions = [],
  actionLayout = "horizontal",
  icon,
  primaryColor,
  children,
  actionsContainerStyle,
  buttonStyle,
  buttonTextStyle,
  messageStyle,
  ...modalProps
}) => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      width: "100%",
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: theme.spacing.md,
    },
    iconContainer: {
      marginRight: theme.spacing.md,
    },
    contentContainer: {
      paddingBottom: theme.spacing.lg,
    },
    message: {
      fontFamily: theme.typography.fontFamily.primary,
      fontSize: theme.typography.sizes.medium,
      lineHeight: 24,
      color: theme.colors.text.primary,
      marginBottom: theme.spacing.md,
    },
    actionsContainer: {
      marginTop: theme.spacing.md,
      ...(actionLayout === "horizontal"
        ? {
            flexDirection: "row",
            justifyContent: "flex-end",
            flexWrap: "wrap",
          }
        : {
            flexDirection: "column",
          }),
    },
    button: {
      paddingVertical: theme.spacing.md,
      paddingHorizontal: theme.spacing.lg,
      borderRadius: theme.borderRadius.medium,
      marginLeft: actionLayout === "horizontal" ? theme.spacing.sm : 0,
      marginTop: actionLayout === "vertical" ? theme.spacing.sm : 0,
      justifyContent: "center",
      alignItems: "center",
    },
    primaryButton: {
      backgroundColor: primaryColor || theme.colors.primary.main,
    },
    secondaryButton: {
      backgroundColor: "transparent",
      borderWidth: 1,
      borderColor: primaryColor || theme.colors.neutral.gray300,
    },
    buttonText: {
      fontFamily: theme.typography.fontFamily.primary,
      fontSize: theme.typography.sizes.medium,
      fontWeight: theme.typography.fontWeight.medium as any,
    },
    primaryButtonText: {
      color: theme.colors.neutral.white,
    },
    secondaryButtonText: {
      color: primaryColor || theme.colors.text.primary,
    },
    disabledButton: {
      opacity: 0.5,
    },
  });

  return (
    <Modal {...modalProps}>
      <View style={styles.container}>
        {icon && (
          <View style={styles.header}>
            <View style={styles.iconContainer}>{icon}</View>
            {/* Title is handled by Modal component */}
          </View>
        )}

        <View style={styles.contentContainer}>
          <Text style={[styles.message, messageStyle]}>{message}</Text>
          {children}
        </View>

        {actions.length > 0 && (
          <View style={[styles.actionsContainer, actionsContainerStyle]}>
            {actions.map((action, index) => (
              <TouchableOpacity
                key={`dialog-action-${index}`}
                style={[
                  styles.button,
                  action.primary
                    ? styles.primaryButton
                    : styles.secondaryButton,
                  action.disabled && styles.disabledButton,
                  buttonStyle,
                ]}
                onPress={() => {
                  action.onPress();
                  if (action.dismissOnPress !== false) {
                    modalProps.onDismiss();
                  }
                }}
                disabled={action.disabled || action.loading}
                accessibilityRole="button"
                accessibilityLabel={action.label}
                accessibilityState={{
                  disabled: action.disabled || action.loading,
                  busy: action.loading,
                }}
              >
                <Text
                  style={[
                    styles.buttonText,
                    action.primary
                      ? styles.primaryButtonText
                      : styles.secondaryButtonText,
                    buttonTextStyle,
                  ]}
                >
                  {action.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    </Modal>
  );
};
