// SkeletonLoader.tsx
import React, { useEffect, useRef } from "react";
import {
  View,
  Animated,
  StyleSheet,
  StyleProp,
  ViewStyle,
  ColorValue,
} from "react-native";

interface SkeletonLoaderProps {
  /** Width of the skeleton */
  width?: number | string;
  /** Height of the skeleton */
  height?: number | string;
  /** Border radius of the skeleton */
  borderRadius?: number;
  /** Base color of the skeleton */
  backgroundColor?: ColorValue;
  /** Highlight color of the skeleton */
  highlightColor?: ColorValue;
  /** Style for the container */
  style?: StyleProp<ViewStyle>;
  /** Animation speed (in ms) */
  animationDuration?: number;
}

/**
 * A skeleton loader component with shimmer effect
 */
export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  width = "100%",
  height = 20,
  borderRadius = 4,
  backgroundColor = "#E1E9EE",
  highlightColor = "#F2F8FC",
  style,
  animationDuration = 1500,
}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: animationDuration,
        useNativeDriver: true,
      })
    ).start();
  }, [animatedValue, animationDuration]);

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-width as number, width as number],
  });

  return (
    <View
      style={[
        styles.container,
        {
          width: width as number,
          height: height as number,
          borderRadius,
          backgroundColor,
        },
        style,
      ]}
    >
      <Animated.View
        style={[
          StyleSheet.absoluteFill,
          {
            transform: [{ translateX }],
            backgroundColor: highlightColor,
          },
          styles.shimmer,
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
  },
  shimmer: {
    width: "100%",
    opacity: 0.4,
  },
});
