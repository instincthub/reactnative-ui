import React from "react";
import {
  View,
  Modal,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
  StyleProp,
  ViewStyle,
  TextStyle,
} from "react-native";
import { useTheme } from "../../../theme/ThemeProvider";

export type AlertType = "default" | "success" | "error" | "warning" | "info";
export type AlertButton = {
  /** Text to display on the button */
  text: string;
  /** Function to call when button is pressed */
  onPress: () => void;
  /** Style of button - primary is highlighted, secondary is subtle */
  style?: "primary" | "secondary";
  /** Additional custom styles for the button */
  buttonStyle?: StyleProp<ViewStyle>;
  /** Additional custom styles for the button text */
  textStyle?: StyleProp<TextStyle>;
};

export interface AlertProps {
  /** Whether the alert is visible */
  visible: boolean;
  /** Function to call when the alert is dismissed */
  onClose: () => void;
  /** Title of the alert */
  title: string;
  /** Message to display in the alert body */
  message: string;
  /** Visual type of the alert which determines colors */
  type?: AlertType;
  /** Array of buttons to display in the alert */
  buttons?: AlertButton[];
  /** Whether to allow closing the alert by tapping outside */
  dismissable?: boolean;
  /** Custom styles for the alert container */
  containerStyle?: StyleProp<ViewStyle>;
  /** Custom styles for the title text */
  titleStyle?: StyleProp<TextStyle>;
  /** Custom styles for the message text */
  messageStyle?: StyleProp<TextStyle>;
  /** Accessibility label for screen readers */
  accessibilityLabel?: string;
  /** Test ID for testing */
  testID?: string;
}

export const Alert: React.FC<AlertProps> = ({
  visible,
  onClose,
  title,
  message,
  type = "default",
  buttons = [{ text: "OK", onPress: onClose, style: "primary" }],
  dismissable = true,
  containerStyle,
  titleStyle,
  messageStyle,
  accessibilityLabel,
  testID,
}) => {
  const theme = useTheme();
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const scaleAnim = React.useRef(new Animated.Value(0.9)).current;

  // When visible changes, animate the alert
  React.useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0.9,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, fadeAnim, scaleAnim]);

  const getTypeStyles = () => {
    switch (type) {
      case "success":
        return {
          color: theme.colors.semantic.success,
          backgroundColor:
            theme.colors.semantic.successLight || "rgba(0, 200, 83, 0.1)",
        };
      case "error":
        return {
          color: theme.colors.semantic.error,
          backgroundColor:
            theme.colors.semantic.errorLight || "rgba(255, 53, 53, 0.1)",
        };
      case "warning":
        return {
          color: theme.colors.semantic.warning,
          backgroundColor:
            theme.colors.semantic.warningLight || "rgba(255, 171, 0, 0.1)",
        };
      case "info":
        return {
          color: theme.colors.primary.main,
          backgroundColor:
            theme.colors.primary.light || "rgba(33, 150, 243, 0.1)",
        };
      default:
        return {
          color: theme.colors.text.primary,
          backgroundColor: "transparent",
        };
    }
  };

  const typeStyles = getTypeStyles();

  const styles = StyleSheet.create({
    backdrop: {
      flex: 1,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      justifyContent: "center",
      alignItems: "center",
    },
    container: {
      width: Dimensions.get("window").width * 0.85,
      maxWidth: 400,
      backgroundColor: theme.colors.background.default,
      borderRadius: theme.borderRadius.large,
      overflow: "hidden",
      ...theme.shadows.medium,
    },
    typeBar: {
      height: 4,
      backgroundColor: typeStyles.color,
    },
    content: {
      padding: theme.spacing.lg,
    },
    title: {
      fontFamily: theme.typography.fontFamily.primary,
      fontSize: theme.typography.sizes.large,
      fontWeight: theme.typography.fontWeight.bold as "normal",
      color: theme.colors.text.primary,
      marginBottom: theme.spacing.sm,
    },
    message: {
      fontFamily: theme.typography.fontFamily.primary,
      fontSize: theme.typography.sizes.medium,
      color: theme.colors.text.secondary,
      marginBottom: theme.spacing.md,
    },
    buttonsContainer: {
      flexDirection: buttons.length > 2 ? "column" : "row",
      justifyContent: "flex-end",
      marginTop: theme.spacing.md,
    },
    button: {
      paddingVertical: theme.spacing.sm,
      paddingHorizontal: theme.spacing.md,
      borderRadius: theme.borderRadius.medium,
      marginLeft: buttons.length <= 2 ? theme.spacing.sm : 0,
      marginTop: buttons.length > 2 ? theme.spacing.sm : 0,
      minWidth: 80,
      alignItems: "center",
    },
    primaryButton: {
      backgroundColor: typeStyles.color,
    },
    secondaryButton: {
      backgroundColor: "transparent",
      borderWidth: 1,
      borderColor: typeStyles.color,
    },
    buttonText: {
      fontFamily: theme.typography.fontFamily.primary,
      fontSize: theme.typography.sizes.medium,
      fontWeight: theme.typography.fontWeight.medium as "normal",
    },
    primaryButtonText: {
      color: "#FFFFFF",
    },
    secondaryButtonText: {
      color: typeStyles.color,
    },
  });

  const handleBackdropPress = () => {
    if (dismissable) {
      onClose();
    }
  };

  const renderButtons = () => {
    return buttons.map((button, index) => {
      const isSecondary = button.style === "secondary";

      return (
        <TouchableOpacity
          key={index}
          style={[
            styles.button,
            isSecondary ? styles.secondaryButton : styles.primaryButton,
            button.buttonStyle,
          ]}
          onPress={button.onPress}
          accessibilityRole="button"
          accessibilityLabel={button.text}
        >
          <Text
            style={[
              styles.buttonText,
              isSecondary
                ? styles.secondaryButtonText
                : styles.primaryButtonText,
              button.textStyle,
            ]}
          >
            {button.text}
          </Text>
        </TouchableOpacity>
      );
    });
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
      accessibilityLabel={accessibilityLabel || title}
      testID={testID}
    >
      <TouchableOpacity
        style={styles.backdrop}
        activeOpacity={1}
        onPress={handleBackdropPress}
      >
        <Animated.View
          style={[
            styles.container,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            },
            containerStyle,
          ]}
        >
          <View style={styles.typeBar} />
          <View style={styles.content}>
            <Text style={[styles.title, titleStyle]}>{title}</Text>
            <Text style={[styles.message, messageStyle]}>{message}</Text>
            <View style={styles.buttonsContainer}>{renderButtons()}</View>
          </View>
        </Animated.View>
      </TouchableOpacity>
    </Modal>
  );
};

export default Alert;
