import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  TextStyle,
  Dimensions,
} from "react-native";
import { useTheme } from "../../../theme/theme-context";

export type NotificationType = "success" | "error" | "warning" | "info";
export type NotificationPosition = "top" | "bottom";

export interface NotificationProps {
  /** Whether the notification is visible */
  visible: boolean;
  /** Function to call when the notification is closed */
  onClose: () => void;
  /** Title of the notification (optional) */
  title?: string;
  /** Message to display in the notification */
  message: string;
  /** Type of notification which determines colors */
  type?: NotificationType;
  /** Position to display the notification */
  position?: NotificationPosition;
  /** Duration in milliseconds before auto-closing (0 for no auto-close) */
  duration?: number;
  /** Whether to show a close button */
  showCloseButton?: boolean;
  /** Custom icon to display (component) */
  icon?: React.ReactNode;
  /** Custom primary color for info variant */
  primaryColor?: string;
  /** Custom styles for the notification container */
  containerStyle?: StyleProp<ViewStyle>;
  /** Custom styles for the title text */
  titleStyle?: StyleProp<TextStyle>;
  /** Custom styles for the message text */
  messageStyle?: StyleProp<TextStyle>;
  /** Additional action to display at the end */
  action?: {
    text: string;
    onPress: () => void;
  };
  /** Accessibility label for screen readers */
  accessibilityLabel?: string;
  /** Test ID for testing */
  testID?: string;
}

export const Notification: React.FC<NotificationProps> = ({
  visible,
  onClose,
  title,
  message,
  type = "info",
  position = "top",
  duration = 3000,
  showCloseButton = true,
  icon,
  primaryColor,
  containerStyle,
  titleStyle,
  messageStyle,
  action,
  accessibilityLabel,
  testID,
}) => {
  const theme = useTheme();
  const translateY = useRef(
    new Animated.Value(position === "top" ? -100 : 100)
  ).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();

      // Auto-dismiss after duration
      if (duration > 0) {
        timeoutRef.current = setTimeout(() => {
          handleClose();
        }, duration);
      }
    } else {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: position === "top" ? -100 : 100,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }

    // Cleanup timeout on unmount
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [visible, translateY, opacity, duration, position]);

  const handleClose = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    onClose();
  };

  const getTypeStyles = () => {
    switch (type) {
      case "success":
        return {
          backgroundColor: theme.colors.semantic.success,
          color: "#FFFFFF",
          icon: "check-circle",
        };
      case "error":
        return {
          backgroundColor: theme.colors.semantic.error,
          color: "#FFFFFF",
          icon: "alert-circle",
        };
      case "warning":
        return {
          backgroundColor: theme.colors.semantic.warning,
          color: "#000000",
          icon: "alert-triangle",
        };
      case "info":
      default:
        return {
          backgroundColor: primaryColor || theme.colors.primary.main,
          color: "#FFFFFF",
          icon: "info",
        };
    }
  };

  const typeStyles = getTypeStyles();

  const styles = StyleSheet.create({
    container: {
      position: "absolute",
      [position]: theme.spacing.lg,
      left: theme.spacing.md,
      right: theme.spacing.md,
      backgroundColor: typeStyles.backgroundColor,
      borderRadius: theme.borderRadius.medium,
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: theme.spacing.md,
      paddingHorizontal: theme.spacing.md,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      maxWidth: 600,
      alignSelf: "center",
      width: Dimensions.get("window").width - theme.spacing.md * 2,
    },
    content: {
      flex: 1,
      marginRight: showCloseButton ? theme.spacing.sm : 0,
    },
    title: {
      fontFamily: theme.typography.fontFamily.primary,
      fontSize: theme.typography.sizes.medium,
      fontWeight: theme.typography.fontWeight.bold as "normal",
      color: typeStyles.color,
      marginBottom: title ? theme.spacing.xs : 0,
    },
    message: {
      fontFamily: theme.typography.fontFamily.primary,
      fontSize: theme.typography.sizes.small,
      color: typeStyles.color,
    },
    closeButton: {
      marginLeft: theme.spacing.sm,
      padding: theme.spacing.xs,
    },
    closeButtonText: {
      fontFamily: theme.typography.fontFamily.primary,
      fontSize: theme.typography.sizes.medium,
      color: typeStyles.color,
      fontWeight: theme.typography.fontWeight.bold as "normal",
    },
    actionContainer: {
      marginLeft: theme.spacing.md,
      paddingLeft: theme.spacing.md,
      borderLeftWidth: 1,
      borderLeftColor: "rgba(255, 255, 255, 0.3)",
    },
    actionText: {
      fontFamily: theme.typography.fontFamily.primary,
      fontSize: theme.typography.sizes.small,
      fontWeight: theme.typography.fontWeight.bold as "normal",
      color: typeStyles.color,
      textDecorationLine: "underline",
    },
    iconContainer: {
      marginRight: theme.spacing.sm,
    },
  });

  if (!visible) {
    return null;
  }

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ translateY }],
          opacity,
        },
        containerStyle,
      ]}
      accessibilityLabel={accessibilityLabel || message}
      testID={testID}
    >
      {icon && <View style={styles.iconContainer}>{icon}</View>}

      <View style={styles.content}>
        {title && <Text style={[styles.title, titleStyle]}>{title}</Text>}
        <Text style={[styles.message, messageStyle]}>{message}</Text>
      </View>

      {action && (
        <TouchableOpacity
          style={styles.actionContainer}
          onPress={() => {
            action.onPress();
            handleClose();
          }}
          accessibilityRole="button"
          accessibilityLabel={action.text}
        >
          <Text style={styles.actionText}>{action.text}</Text>
        </TouchableOpacity>
      )}

      {showCloseButton && (
        <TouchableOpacity
          style={styles.closeButton}
          onPress={handleClose}
          accessibilityRole="button"
          accessibilityLabel="Close notification"
        >
          <Text style={styles.closeButtonText}>×</Text>
        </TouchableOpacity>
      )}
    </Animated.View>
  );
};

export default Notification;
