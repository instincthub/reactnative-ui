# React Native Typography System

A comprehensive, customizable typography system for React Native applications that ensures consistent text styling across your app.

## Features

- ✅ Consistent, theme-based typography
- ✅ Multiple text variants (headings, body, captions, etc.)
- ✅ Responsive font sizing based on screen dimensions
- ✅ Accessibility scaling support
- ✅ Rich formatting options (weight, italics, underline, etc.)
- ✅ Special components for advanced text formatting
- ✅ Fully typed with TypeScript

## Installation

```bash
# Using npm
npm install @instincthub/reactnative-ui

# Using yarn
yarn add @instincthub/reactnative-ui

# Using Expo
expo install @instincthub/reactnative-ui
```

## Basic Usage

1. Wrap your app with the `ThemeProvider`:

```tsx
import { ThemeProvider } from '@instincthub/reactnative-ui';

const App = () => {
  return (
    <ThemeProvider>
      {/* Your app components */}
    </ThemeProvider>
  );
};
```

2. Use typography components in your screens:

```tsx
import { H1, Body1, Caption } from '@instincthub/reactnative-ui';

const MyScreen = () => {
  return (
    <View>
      <H1>Welcome to My App</H1>
      <Body1>This is the main content of the screen.</Body1>
      <Caption>Additional information goes here.</Caption>
    </View>
  );
};
```

## Typography Components

### Base Component

- `Typography` - The base component that all other components use

### Heading Components

- `H1` - Largest heading
- `H2` - Second-level heading
- `H3` - Third-level heading
- `H4` - Fourth-level heading
- `H5` - Fifth-level heading
- `H6` - Smallest heading

### Text Components

- `Subtitle1` - Larger subtitle text
- `Subtitle2` - Smaller subtitle text
- `Body1` - Primary body text
- `Body2` - Secondary body text
- `ButtonText` - Text styled for buttons
- `Caption` - Small text for captions
- `Overline` - Smallest text, often used above components

### Special Components

- `FormattedText` - For text with mixed styling
- `HighlightedText` - For highlighting parts of text
- `TextWithIcon` - For text with an icon

## Props

All typography components accept these props:

| Prop | Type | Description | Default |
|------|------|-------------|---------|
| `color` | string | Text color | Theme default |
| `align` | 'auto' \| 'left' \| 'right' \| 'center' \| 'justify' | Text alignment | undefined |
| `weight` | 'normal' \| 'bold' \| '100'-'900' | Font weight | Variant default |
| `italic` | boolean | Whether text is italic | false |
| `underline` | boolean | Whether text is underlined | false |
| `strikethrough` | boolean | Whether text has strikethrough | false |
| `responsive` | boolean | Whether to use responsive sizing | true |
| `accessibilityScaling` | boolean | Whether to respect device accessibility settings | true |

Plus all standard React Native `Text` props.

## Advanced Usage

### Custom Theme

You can customize the typography theme:

```tsx
import { ThemeProvider } from '@instincthub/reactnative-ui';

const customTheme = {
  typography: {
    fontFamily: {
      primary: 'Montserrat',
      secondary: 'Merriweather',
    },
    variants: {
      h1: {
        fontFamily: 'Montserrat',
        fontSize: 32,
        fontWeight: '700',
        lineHeight: 40,
      },
      // Override other variants as needed
    },
  },
  colors: {
    text: {
      primary: '#222222',
      // Override other colors as needed
    },
  },
};

const App = () => {
  return (
    <ThemeProvider theme={customTheme}>
      {/* Your app components */}
    </ThemeProvider>
  );
};
```

### Formatted Text

For text with mixed styling:

```tsx
import { FormattedText } from '@instincthub/reactnative-ui';

const MyComponent = () => {
  return (
    <FormattedText
      variant="body1"
      segments={[
        { text: "This is " },
        { text: "bold", style: { fontWeight: 'bold' } },
        { text: " and " },
        { text: "colored", style: { color: '#E91E63' } },
        { text: " text in one line." }
      ]}
    />
  );
};
```

### Highlighted Text

For highlighting search terms:

```tsx
import { HighlightedText } from '@instincthub/reactnative-ui';

const SearchResult = ({ text, searchTerm }) => {
  return (
    <HighlightedText
      text={text}
      highlight={searchTerm}
      highlightStyle={{ backgroundColor: '#FFEB3B', fontWeight: 'bold' }}
    />
  );
};
```

### Text with Icon

For text with an icon:

```tsx
import { TextWithIcon } from '@instincthub/reactnative-ui';

const IconExample = () => {
  return (
    <TextWithIcon 
      iconName="checkmark-circle" 
      iconColor="#4CAF50"
    >
      Task completed successfully
    </TextWithIcon>
  );
};
```

## Accessing the Theme

You can access the theme in your components:

```tsx
import { useTheme } from '@instincthub/reactnative-ui';

const MyComponent = () => {
  const theme = useTheme();
  
  return (
    <View style={{ backgroundColor: theme.colors.background.default }}>
      {/* Your component content */}
    </View>
  );
};
```

## Responsive Hooks

For custom text components:

```tsx
import { useResponsiveFont, useAccessibilityFont } from '@instincthub/reactnative-ui';
import { Text } from 'react-native';

const CustomText = ({ size, children }) => {
  // Apply responsive scaling
  const responsiveSize = useResponsiveFont(size);
  
  // Apply accessibility scaling
  const finalSize = useAccessibilityFont(responsiveSize);
  
  return (
    <Text style={{ fontSize: finalSize }}>
      {children}
    </Text>
  );
};
```