# @instincthub/reactnative-ui

A comprehensive React Native UI component library for InstinctHub applications, built with TypeScript and modern testing practices.

## Installation

```bash
npm install @instincthub/reactnative-ui
# or
yarn add @instincthub/reactnative-ui
```

## Features

- Cross-platform compatibility (iOS and Android)
- TypeScript integration for type safety
- Comprehensive accessibility support
- Customizable theming system
- Component-specific documentation and examples
- Thorough test coverage using React Native Testing Library
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
npm run build
# or
yarn build
```

### Testing

We use Jest and React Native Testing Library for our test suite:

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

Example test:

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
