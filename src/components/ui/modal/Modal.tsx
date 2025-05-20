import React, { useEffect, useState } from "react";
import {
  Modal as RNModal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  TouchableWithoutFeedback,
  StatusBar,
  StyleProp,
  ViewStyle,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "../../../theme/theme-context";

export type ModalPosition = "center" | "bottom" | "top";

export interface ModalProps {
  /** Controls whether the modal is visible */
  visible: boolean;
  /** Function called when the modal is dismissed */
  onDismiss: () => void;
  /** Modal content */
  children: React.ReactNode;
  /** Title displayed at the top of the modal */
  title?: string;
  /** Whether to show the close button */
  showCloseButton?: boolean;
  /** Whether to dismiss when clicking outside */
  dismissable?: boolean;
  /** Position of the modal on screen */
  position?: ModalPosition;
  /** Additional styles for the container */
  containerStyle?: StyleProp<ViewStyle>;
  /** Additional styles for the content area */
  contentStyle?: StyleProp<ViewStyle>;
  /** Animation duration in ms */
  animationDuration?: number;
  /** Test ID for testing */
  testID?: string;
}

export const Modal: React.FC<ModalProps> = ({
  visible,
  onDismiss,
  children,
  title,
  showCloseButton = true,
  dismissable = true,
  position = "center",
  containerStyle,
  contentStyle,
  animationDuration = 200,
  testID,
}) => {
  const theme = useTheme();
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(
    new Animated.Value(
      position === "bottom" ? 100 : position === "top" ? -100 : 0
    )
  );

  useEffect(() => {
    if (visible) {
      // Animate in
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: animationDuration,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: animationDuration,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // Animate out
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: animationDuration,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: position === "bottom" ? 100 : position === "top" ? -100 : 0,
          duration: animationDuration,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, fadeAnim, slideAnim, position, animationDuration]);

  const getModalPosition = (): object => {
    switch (position) {
      case "top":
        return { justifyContent: "flex-start", paddingTop: 50 };
      case "bottom":
        return { justifyContent: "flex-end", paddingBottom: 20 };
      case "center":
      default:
        return { justifyContent: "center" };
    }
  };

  const styles = StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      ...getModalPosition(),
      padding: 20,
    },
    contentContainer: {
      backgroundColor: theme.colors.background.default,
      borderRadius: theme.borderRadius.large,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      maxWidth: 500,
      width: "100%",
      alignSelf: "center",
      overflow: "hidden",
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.neutral.gray200,
      paddingHorizontal: theme.spacing.lg,
      paddingVertical: theme.spacing.md,
    },
    title: {
      fontFamily: theme.typography.fontFamily.primary,
      fontSize: theme.typography.sizes.large,
      fontWeight: theme.typography.fontWeight.bold as any,
      color: theme.colors.text.primary,
      flex: 1,
    },
    closeButton: {
      padding: theme.spacing.sm,
    },
    content: {
      padding: theme.spacing.lg,
    },
  });

  return (
    <RNModal
      transparent
      visible={visible}
      onRequestClose={onDismiss}
      animationType="none"
      statusBarTranslucent
      testID={testID}
    >
      <StatusBar
        backgroundColor="rgba(0, 0, 0, 0.5)"
        barStyle="light-content"
      />
      <TouchableWithoutFeedback onPress={dismissable ? onDismiss : undefined}>
        <Animated.View
          style={[styles.overlay, { opacity: fadeAnim }, containerStyle]}
        >
          <TouchableWithoutFeedback onPress={() => {}}>
            <Animated.View
              style={[
                styles.contentContainer,
                {
                  transform: [{ translateY: slideAnim }],
                },
                contentStyle,
              ]}
            >
              {(title || showCloseButton) && (
                <View style={styles.header}>
                  {title && <Text style={styles.title}>{title}</Text>}
                  {showCloseButton && (
                    <TouchableOpacity
                      onPress={onDismiss}
                      style={styles.closeButton}
                      accessibilityRole="button"
                      accessibilityLabel="Close modal"
                    >
                      <Feather
                        name="x"
                        size={24}
                        color={theme.colors.text.secondary}
                      />
                    </TouchableOpacity>
                  )}
                </View>
              )}
              <View style={styles.content}>{children}</View>
            </Animated.View>
          </TouchableWithoutFeedback>
        </Animated.View>
      </TouchableWithoutFeedback>
    </RNModal>
  );
};
