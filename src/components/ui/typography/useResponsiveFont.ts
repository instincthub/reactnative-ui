import { useWindowDimensions } from "react-native";

/**
 * Hook to calculate font size based on screen width
 * @param size Base font size
 * @param scaleFactor How much to scale the font (0-1)
 * @returns Responsive font size
 */
export const useResponsiveFont = (size: number, scaleFactor = 0.5): number => {
  const { width } = useWindowDimensions();

  // Base font sizes on different screen widths
  const smallScreen = 320; // iPhone SE
  const mediumScreen = 375; // iPhone X/11 Pro
  const largeScreen = 414; // iPhone 11 Pro Max

  // Scale font based on screen width
  if (width <= smallScreen) {
    return size * (1 - scaleFactor * 0.15);
  } else if (width <= mediumScreen) {
    return size;
  } else if (width <= largeScreen) {
    return size * (1 + scaleFactor * 0.1);
  } else {
    return size * (1 + scaleFactor * 0.2);
  }
};
