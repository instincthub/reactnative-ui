# React Native Loading and Animation Components for @instincthub/reactnative-ui

A collection of customizable, TypeScript-based loading and animation components for React Native applications, part of the @instincthub/reactnative-ui package.

## Table of Contents

- [Installation](#installation)
- [Components](#components)
  - [LoadingSpinner](#loadingspinner)
  - [SkeletonLoader](#skeletonloader)
  - [FadeIn](#fadein)
  - [ProgressBar](#progressbar)
  - [LoadingOverlay](#loadingoverlay)
- [Usage Examples](#usage-examples)
- [API Reference](#api-reference)
- [Contributing](#contributing)
- [License](#license)

## Installation

```bash
# Using npm
npm install @instincthub/reactnative-ui

# Using yarn
yarn add @instincthub/reactnative-ui
```

This package has peer dependencies on `react` and `react-native`, which should already be installed in your project.

## Components

### LoadingSpinner

A versatile loading spinner with multiple animation types including circle, dots, pulse, and wave.

```tsx
import { LoadingSpinner } from '@instincthub/reactnative-ui';

// Basic usage
<LoadingSpinner />

// Custom configuration
<LoadingSpinner
  size={50}
  color="#8A2BE2"
  type="dots"
  dotCount={5}
  duration={1000}
/>
```

![LoadingSpinner Demo](https://example.com/loading-spinner.gif)

### SkeletonLoader

A skeleton placeholder component with shimmer effect for content loading states.

```tsx
import { SkeletonLoader } from '@instincthub/reactnative-ui';

// Basic usage
<SkeletonLoader />

// Custom configuration
<SkeletonLoader
  width="80%"
  height={20}
  borderRadius={8}
  backgroundColor="#E1E9EE"
  highlightColor="#F2F8FC"
  animationDuration={1500}
/>
```

![SkeletonLoader Demo](https://example.com/skeleton-loader.gif)

### FadeIn

A component that applies a fade-in animation to its children.

```tsx
import { FadeIn } from "@instincthub/reactnative-ui";

<FadeIn duration={500} delay={200}>
  <Text>This content will fade in</Text>
</FadeIn>;
```

### ProgressBar

A customizable animated progress bar component.

```tsx
import { ProgressBar } from '@instincthub/reactnative-ui';

// Basic usage with progress value (0-1)
<ProgressBar progress={0.75} />

// Custom configuration
<ProgressBar
  progress={0.75}
  width="90%"
  height={15}
  color="#8A2BE2"
  backgroundColor="#E1E9EE"
  showPercentage
  animationDuration={500}
  rounded
/>
```

![ProgressBar Demo](https://example.com/progress-bar.gif)

### LoadingOverlay

A fullscreen loading overlay with optional message for blocking operations.

```tsx
import { LoadingOverlay } from "@instincthub/reactnative-ui";

<LoadingOverlay
  visible={isLoading}
  message="Processing your request..."
  color="#2089dc"
  textColor="#FFFFFF"
  backgroundColor="rgba(0, 0, 0, 0.7)"
/>;
```

![LoadingOverlay Demo](https://example.com/loading-overlay.gif)

## Usage Examples

### Basic Example

```tsx
import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import {
  LoadingSpinner,
  SkeletonLoader,
  FadeIn,
  ProgressBar,
  LoadingOverlay,
} from "@instincthub/reactnative-ui";

const ExampleScreen: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [overlayVisible, setOverlayVisible] = useState(false);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Simulate progress incrementing
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 0.1;
        return next > 1 ? 0 : next;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const showOverlay = () => {
    setOverlayVisible(true);
    setTimeout(() => {
      setOverlayVisible(false);
    }, 3000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Loading Components Demo</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>LoadingSpinner</Text>
        <LoadingSpinner size={40} color="#8A2BE2" />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>SkeletonLoader</Text>
        {loading ? (
          <View>
            <SkeletonLoader width="80%" height={20} style={styles.skeleton} />
            <SkeletonLoader width="60%" height={20} style={styles.skeleton} />
            <SkeletonLoader width="70%" height={20} style={styles.skeleton} />
          </View>
        ) : (
          <FadeIn>
            <Text>Content has loaded successfully!</Text>
          </FadeIn>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>ProgressBar</Text>
        <ProgressBar
          progress={progress}
          width="90%"
          height={15}
          color="#8A2BE2"
          showPercentage
        />
      </View>

      <Button title="Show Loading Overlay" onPress={showOverlay} />

      <LoadingOverlay
        visible={overlayVisible}
        message="Processing your request..."
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  section: {
    width: "100%",
    marginBottom: 30,
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
    alignSelf: "flex-start",
  },
  skeleton: {
    marginBottom: 10,
  },
});

export default ExampleScreen;
```

### Loading Spinner Types Example

```tsx
import React, { useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { LoadingSpinner } from "@instincthub/reactnative-ui";

const SpinnerExample: React.FC = () => {
  const [spinnerType, setSpinnerType] = useState<
    "circle" | "dots" | "pulse" | "wave"
  >("circle");

  const cycleSpinnerType = () => {
    setSpinnerType((current) => {
      switch (current) {
        case "circle":
          return "dots";
        case "dots":
          return "pulse";
        case "pulse":
          return "wave";
        case "wave":
          return "circle";
      }
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>LoadingSpinner: {spinnerType}</Text>

      <LoadingSpinner
        size={50}
        color="#8A2BE2"
        type={spinnerType}
        dotCount={5}
      />

      <Button
        title="Change Spinner Type"
        onPress={cycleSpinnerType}
        color="#8A2BE2"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

export default SpinnerExample;
```

## API Reference

### LoadingSpinner Props

| Prop             | Type                                      | Default     | Description                                  |
| ---------------- | ----------------------------------------- | ----------- | -------------------------------------------- |
| `size`           | `number`                                  | `40`        | Size of the spinner in pixels                |
| `color`          | `ColorValue`                              | `'#2089dc'` | Color of the spinner                         |
| `containerStyle` | `StyleProp<ViewStyle>`                    | -           | Additional styles for the container          |
| `duration`       | `number`                                  | `1200`      | Animation duration in milliseconds           |
| `visible`        | `boolean`                                 | `true`      | Whether spinner is currently visible         |
| `type`           | `'circle' \| 'dots' \| 'pulse' \| 'wave'` | `'circle'`  | Type of spinner animation                    |
| `dotCount`       | `number`                                  | `3`         | Number of dots (for 'dots' and 'wave' types) |

### SkeletonLoader Props

| Prop                | Type                   | Default     | Description                                       |
| ------------------- | ---------------------- | ----------- | ------------------------------------------------- |
| `width`             | `number \| string`     | `'100%'`    | Width of the skeleton                             |
| `height`            | `number \| string`     | `20`        | Height of the skeleton                            |
| `borderRadius`      | `number`               | `4`         | Border radius of the skeleton                     |
| `backgroundColor`   | `ColorValue`           | `'#E1E9EE'` | Base color of the skeleton                        |
| `highlightColor`    | `ColorValue`           | `'#F2F8FC'` | Highlight color for the shimmer effect            |
| `style`             | `StyleProp<ViewStyle>` | -           | Additional styles for the skeleton                |
| `animationDuration` | `number`               | `1500`      | Duration of the shimmer animation in milliseconds |

### FadeIn Props

| Prop             | Type                   | Default | Description                                   |
| ---------------- | ---------------------- | ------- | --------------------------------------------- |
| `duration`       | `number`               | `500`   | Duration of fade animation in milliseconds    |
| `delay`          | `number`               | `0`     | Delay before animation starts in milliseconds |
| `initialOpacity` | `number`               | `0`     | Initial opacity value (0-1)                   |
| `finalOpacity`   | `number`               | `1`     | Final opacity value (0-1)                     |
| `autoStart`      | `boolean`              | `true`  | Whether the animation should trigger on mount |
| `children`       | `React.ReactNode`      | -       | Child components to animate                   |
| `style`          | `StyleProp<ViewStyle>` | -       | Additional styles for the container           |

### ProgressBar Props

| Prop                | Type                   | Default     | Description                          |
| ------------------- | ---------------------- | ----------- | ------------------------------------ |
| `progress`          | `number`               | -           | Progress value (0-1)                 |
| `width`             | `number \| string`     | `'100%'`    | Width of the progress bar            |
| `height`            | `number`               | `10`        | Height of the progress bar           |
| `color`             | `ColorValue`           | `'#2089dc'` | Color of the progress indicator      |
| `backgroundColor`   | `ColorValue`           | `'#E1E9EE'` | Background color of the progress bar |
| `showPercentage`    | `boolean`              | `false`     | Whether to show percentage text      |
| `textColor`         | `ColorValue`           | `'#000'`    | Text color for percentage            |
| `containerStyle`    | `StyleProp<ViewStyle>` | -           | Additional styles for the container  |
| `animationDuration` | `number`               | `500`       | Animation duration in milliseconds   |
| `rounded`           | `boolean`              | `true`      | Whether to use rounded corners       |

### LoadingOverlay Props

| Prop              | Type         | Default                | Description                          |
| ----------------- | ------------ | ---------------------- | ------------------------------------ |
| `visible`         | `boolean`    | -                      | Whether the overlay is visible       |
| `message`         | `string`     | -                      | Message to display below the spinner |
| `color`           | `ColorValue` | `'#2089dc'`            | Color of the spinner                 |
| `textColor`       | `ColorValue` | `'#FFFFFF'`            | Text color for the message           |
| `backgroundColor` | `ColorValue` | `'rgba(0, 0, 0, 0.7)'` | Background color with opacity        |

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
