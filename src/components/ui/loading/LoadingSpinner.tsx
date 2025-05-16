// LoadingSpinner.tsx
import React, { useEffect, useRef } from "react";
import {
  View,
  Animated,
  Easing,
  StyleSheet,
  StyleProp,
  ViewStyle,
  ColorValue,
} from "react-native";

type SpinnerType = "circle" | "dots" | "pulse" | "wave";

interface LoadingSpinnerProps {
  /** Size of the spinner */
  size?: number;
  /** Color of the spinner */
  color?: ColorValue;
  /** Style for the container */
  containerStyle?: StyleProp<ViewStyle>;
  /** Animation duration in milliseconds */
  duration?: number;
  /** Whether spinner is currently visible */
  visible?: boolean;
  /** Type of spinner animation */
  type?: SpinnerType;
  /** Number of dots (for 'dots' and 'wave' types) */
  dotCount?: number;
}

/**
 * A versatile loading spinner with multiple animation types
 */
export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 40,
  color = "#2089dc",
  containerStyle,
  duration = 1200,
  visible = true,
  type = "circle",
  dotCount = 3,
}) => {
  // Animation values
  const spinValue = useRef(new Animated.Value(0)).current;
  const scaleValues = useRef(
    Array(dotCount)
      .fill(0)
      .map(() => new Animated.Value(0))
  ).current;

  useEffect(() => {
    if (visible) {
      if (type === "circle") {
        startSpinAnimation();
      } else if (type === "dots" || type === "pulse") {
        startDotsAnimation();
      } else if (type === "wave") {
        startWaveAnimation();
      }
    }
    return () => {
      // Cleanup animations if needed
    };
  }, [visible, type]);

  // Circle spinner animation
  const startSpinAnimation = () => {
    spinValue.setValue(0);
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  };

  // Dots/pulse animation
  const startDotsAnimation = () => {
    // Reset all values
    scaleValues.forEach((value) => value.setValue(0));

    // Create sequence of animations
    const animations = scaleValues.map((value, i) => {
      return Animated.sequence([
        // Delay based on position
        Animated.delay(i * (duration / (scaleValues.length * 2))),
        // Scale up
        Animated.timing(value, {
          toValue: 1,
          duration: duration / 2,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        // Scale down
        Animated.timing(value, {
          toValue: 0,
          duration: duration / 2,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
      ]);
    });

    // Run animation loop
    Animated.loop(
      Animated.stagger(duration / scaleValues.length, animations)
    ).start();
  };

  // Wave animation
  const startWaveAnimation = () => {
    // Reset all values
    scaleValues.forEach((value) => value.setValue(0));

    // Create sequence of animations
    const animations = scaleValues.map((value, i) => {
      return Animated.sequence([
        // Delay based on position
        Animated.delay(i * (duration / scaleValues.length)),
        // Move up
        Animated.timing(value, {
          toValue: 1,
          duration: duration / 2,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        // Move down
        Animated.timing(value, {
          toValue: 0,
          duration: duration / 2,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
      ]);
    });

    // Run animation loop
    Animated.loop(Animated.parallel(animations)).start();
  };

  // Rotation animation
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  if (!visible) return null;

  // Render different spinner types
  const renderSpinner = () => {
    switch (type) {
      case "circle":
        return (
          <Animated.View
            style={[
              styles.spinner,
              {
                borderColor: color,
                width: size,
                height: size,
                borderRadius: size / 2,
                borderWidth: size / 10,
                transform: [{ rotate: spin }],
              },
            ]}
          />
        );

      case "dots":
      case "pulse":
        return (
          <View style={styles.dotsContainer}>
            {scaleValues.map((value, index) => (
              <Animated.View
                key={index}
                style={[
                  styles.dot,
                  {
                    backgroundColor: color,
                    width: size / 5,
                    height: size / 5,
                    borderRadius: size / 5 / 2,
                    margin: size / 15,
                    transform: [{ scale: value }],
                  },
                ]}
              />
            ))}
          </View>
        );

      case "wave":
        return (
          <View style={styles.dotsContainer}>
            {scaleValues.map((value, index) => (
              <Animated.View
                key={index}
                style={[
                  styles.dot,
                  {
                    backgroundColor: color,
                    width: size / 6,
                    height: size / 3,
                    borderRadius: size / 12,
                    margin: size / 15,
                    transform: [
                      {
                        translateY: value.interpolate({
                          inputRange: [0, 1],
                          outputRange: [0, -size / 4],
                        }),
                      },
                    ],
                  },
                ]}
              />
            ))}
          </View>
        );
    }
  };

  return (
    <View style={[styles.container, containerStyle]}>{renderSpinner()}</View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  spinner: {
    borderTopColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "transparent",
  },
  dotsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  dot: {
    opacity: 0.8,
  },
});
