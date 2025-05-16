// FadeIn.tsx
import React, { useEffect } from "react";
import { Animated, ViewProps } from "react-native";

interface FadeInProps extends ViewProps {
  /** Duration of fade animation in ms */
  duration?: number;
  /** Delay before animation starts */
  delay?: number;
  /** Initial opacity value */
  initialOpacity?: number;
  /** Final opacity value */
  finalOpacity?: number;
  /** Whether the animation should trigger on mount */
  autoStart?: boolean;
  /** Children components */
  children: React.ReactNode;
}

/**
 * A component that applies a fade-in animation to its children
 */
export const FadeIn: React.FC<FadeInProps> = ({
  duration = 500,
  delay = 0,
  initialOpacity = 0,
  finalOpacity = 1,
  autoStart = true,
  children,
  style,
  ...props
}) => {
  const opacity = new Animated.Value(initialOpacity);

  const startAnimation = () => {
    Animated.timing(opacity, {
      toValue: finalOpacity,
      duration,
      delay,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    if (autoStart) {
      startAnimation();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Animated.View style={[{ opacity }, style]} {...props}>
      {children}
    </Animated.View>
  );
};
