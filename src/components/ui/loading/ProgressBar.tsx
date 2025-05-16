// ProgressBar.tsx
import React, { useEffect, useRef } from "react";
import {
  View,
  Animated,
  StyleSheet,
  StyleProp,
  ViewStyle,
  ColorValue,
  Text,
} from "react-native";

interface ProgressBarProps {
  /** Progress value (0-1) */
  progress: number;
  /** Width of the progress bar */
  width?: number | string;
  /** Height of the progress bar */
  height?: number;
  /** Color of the progress indicator */
  color?: ColorValue;
  /** Background color of the progress bar */
  backgroundColor?: ColorValue;
  /** Whether to show percentage text */
  showPercentage?: boolean;
  /** Text color for percentage */
  textColor?: ColorValue;
  /** Style for the container */
  containerStyle?: StyleProp<ViewStyle>;
  /** Animation duration in ms */
  animationDuration?: number;
  /** Whether to use rounded corners */
  rounded?: boolean;
}

/**
 * A customizable animated progress bar component
 */
export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  width = "100%",
  height = 10,
  color = "#2089dc",
  backgroundColor = "#E1E9EE",
  showPercentage = false,
  textColor = "#000",
  containerStyle,
  animationDuration = 500,
  rounded = true,
}) => {
  const progressAnim = useRef(new Animated.Value(0)).current;
  const clampedProgress = Math.min(Math.max(progress, 0), 1);

  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: clampedProgress,
      duration: animationDuration,
      useNativeDriver: false, // Width animations can't use native driver
    }).start();
  }, [progressAnim, clampedProgress, animationDuration]);

  const animatedWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  const percentage = Math.round(clampedProgress * 100);

  const borderRadius = rounded ? height / 2 : 0;

  return (
    <View style={[styles.container, containerStyle]}>
      <View
        style={[
          styles.background,
          {
            width: width as number,
            height,
            backgroundColor,
            borderRadius,
          },
        ]}
      >
        <Animated.View
          style={[
            styles.progress,
            {
              width: animatedWidth,
              height,
              backgroundColor: color,
              borderRadius,
            },
          ]}
        />
      </View>
      {showPercentage && (
        <Text style={[styles.percentageText, { color: textColor }]}>
          {percentage}%
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  background: {
    overflow: "hidden",
  },
  progress: {
    position: "absolute",
    left: 0,
  },
  percentageText: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: "bold",
  },
});
