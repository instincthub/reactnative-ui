// LoadingOverlay.tsx
import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Modal,
  ActivityIndicator,
  ColorValue,
} from "react-native";

interface LoadingOverlayProps {
  /** Whether the overlay is visible */
  visible: boolean;
  /** Message to display below the spinner */
  message?: string;
  /** Color of the spinner */
  color?: ColorValue;
  /** Text color for the message */
  textColor?: ColorValue;
  /** Background color with opacity */
  backgroundColor?: ColorValue;
}

/**
 * A fullscreen loading overlay with optional message
 */
export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  visible,
  message,
  color = "#2089dc",
  textColor = "#FFFFFF",
  backgroundColor = "rgba(0, 0, 0, 0.7)",
}) => {
  if (!visible) return null;

  return (
    <Modal transparent animationType="fade">
      <View style={[styles.container, { backgroundColor }]}>
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={color} />
          {message && (
            <Text style={[styles.message, { color: textColor }]}>
              {message}
            </Text>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loaderContainer: {
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  message: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },
});
