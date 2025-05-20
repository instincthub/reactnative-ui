# @instincthub/reactnative-ui

A comprehensive React Native UI component library for InstinctHub applications, built with TypeScript and modern testing practices.

## Installation

```bash
npm install @instincthub/reactnative-ui
# or
yarn add @instincthub/reactnative-ui
```

## Required Dependencies

This package requires the following peer dependencies to be installed in your project:

```bash
npm install react@>=19.0.0 react-native@>=0.79.0 react-native-gesture-handler@^2.24.0 react-native-reanimated@^3.17.5 @expo/vector-icons@^14.1.0 @react-navigation/native@^7.1.9 prop-types@^15.8.1
# or
yarn add react@>=19.0.0 react-native@>=0.79.0 react-native-gesture-handler@^2.24.0 react-native-reanimated@^3.17.5 @expo/vector-icons@^14.1.0 @react-navigation/native@^7.1.9 prop-types@^15.8.1
```

## TypeScript Configuration

To use this package with TypeScript, ensure your `tsconfig.json` includes the following settings:

```json
{
  "compilerOptions": {
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "jsx": "react-native"
  }
}
```

## Features

- Cross-platform compatibility (iOS and Android)
- TypeScript integration for type safety
- Comprehensive accessibility support
- Customizable theming system
- Component-specific documentation and examples
- Thorough test coverage using React Native Testing Library
- Storybook integration for component development and documentation
- Modern development practices and tooling

## Quick Start

### Basic Example

```jsx
import React, { useState } from "react";
import { View } from "react-native";
import { Button, TextInput, ThemeProvider } from "@instincthub/reactnative-ui";

const App = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    console.log("Email:", email);
  };

  return (
    <ThemeProvider>
      <View style={{ padding: 16 }}>
        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Button
          label="Submit"
          onPress={handleSubmit}
          variant="primary"
          style={{ marginTop: 16 }}
        />
      </View>
    </ThemeProvider>
  );
};
```

### Custom Theme

```jsx
import { ThemeProvider } from "@instincthub/reactnative-ui";

const customTheme = {
  colors: {
    primary: {
      main: "#00838F",
      light: "#4FB3BF",
      dark: "#005662",
      contrast: "#FFFFFF",
    },
    secondary: {
      main: "#BC658D",
      light: "#F19EC2",
      dark: "#883A5E",
      contrast: "#FFFFFF",
    },
  },
  typography: {
    fontFamily: {
      primary: "Nunito",
      secondary: "Montserrat",
    },
  },
};

const App = () => (
  <ThemeProvider theme={customTheme}>{/* Your app components */}</ThemeProvider>
);
```

## Development

### Prerequisites

- Node.js >= 18
- React >= 18.2.0
- React Native >= 0.79.0

### Setup

1. Clone the repository:

```bash
git clone https://github.com/instincthub/reactnative-ui.git
cd reactnative-ui
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Start development:

```bash
# Build the package
npm run build

# Run Storybook for component development
npm run storybook

# Run tests
npm test
```

### Publish to NPM

```bash
npm publish --access public
```

## 🔄 Local Development with `yalc`

If you're actively working on this package and want to test changes in a separate React Native project, follow these steps using [`yalc`](https://github.com/wclr/yalc), which is better suited than `npm link` for React Native environments.

### 📦 Step 1: Install `yalc` (once globally)

```bash
npm install -g yalc
```

### 🚀 Step 2: Publish the package locally

From the root of the `@instincthub/reactnative-ui` package:

```bash
yalc publish
```

### 🧩 Step 3: Add it to your React Native project

In the consuming app (e.g., `workboku`):

```bash
yalc add @instincthub/reactnative-ui
```

### 🔁 Step 4: Push changes after edits

Whenever you make changes to the UI package, just run:

```bash
yalc push
```

This updates the consuming app with the latest version.

### 🧹 Cleanup (optional)

To remove the linked package and clean up:

```bash
yalc remove @instincthub/reactnative-ui
rm -rf .yalc yalc.lock
```

### Available Scripts

- `npm run build` - Build the package
- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Generate test coverage report
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run storybook` - Start Storybook development server
- `npm run build-storybook` - Build Storybook for production

### Testing

We use Jest and React Native Testing Library for our test suite:

```jsx
import { render, screen, fireEvent } from "@testing-library/react-native";
import { Button } from "@instincthub/reactnative-ui";

describe("Button", () => {
  it("renders correctly", () => {
    render(<Button label="Test" onPress={() => {}} />);
    expect(screen.getByText("Test")).toBeOnTheScreen();
  });

  it("handles press events", () => {
    const onPress = jest.fn();
    render(<Button label="Test" onPress={onPress} />);
    fireEvent.press(screen.getByText("Test"));
    expect(onPress).toHaveBeenCalled();
  });
});
```

## Components

### Available Components

- Button
- TextInput
- Card
- List
- Checkbox
- Modal
- Typography
- Alert
- And more...

### Component Documentation

Each component includes:

- TypeScript types and interfaces
- Props documentation
- Usage examples
- Accessibility features
- Test coverage
- Storybook documentation

## Dependencies

### Peer Dependencies

- React >= 18.2.0
- React Native >= 0.79.0

### Key Dependencies

- @expo/vector-icons
- @react-navigation/native
- react-native-gesture-handler
- react-native-reanimated

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Update documentation
6. Submit a pull request

See our [contributing guidelines](CONTRIBUTING.md) for more details.

## License

MIT © InstinctHub
