import { useEffect, useState } from "react";
import { AccessibilityInfo, PixelRatio } from "react-native";

/**
 * Hook to adjust font size based on device accessibility settings
 * @param size Base font size
 * @returns Accessibility-adjusted font size
 */
export const useAccessibilityFont = (size: number): number => {
  const [scale, setScale] = useState<number>(1);

  useEffect(() => {
    // Get initial font scale
    const getInitialScale = async () => {
      const fontScale = PixelRatio.getFontScale();
      setScale(fontScale);
    };

    getInitialScale();

    // Listen for font scale changes
    const fontScaleListener = AccessibilityInfo.addEventListener(
      "screenReaderChanged",
      () => {
        const fontScale = PixelRatio.getFontScale();
        setScale(fontScale);
      }
    );

    return () => {
      fontScaleListener.remove();
    };
  }, []);

  return size * scale;
};
