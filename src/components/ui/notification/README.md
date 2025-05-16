# React Native Feedback Components

A collection of customizable, accessible feedback components for React Native applications.

## Overview

This library provides two essential feedback components for React Native applications:

1. **Alert** - Modal dialogs for important information or confirmations
2. **Notification** - Toast-style messages that appear and automatically disappear

Both components are built with TypeScript, fully customizable, and integrate with your theme system. They provide smooth animations and complete accessibility support.

## Installation

```bash
# If using npm
npm install @instincthub/reactnative-ui

# If using yarn
yarn add @instincthub/reactnative-ui
```

## Components

### Alert

A modal dialog component for important information or confirmations.

#### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| visible | boolean | Yes | - | Whether the alert is visible |
| onClose | () => void | Yes | - | Function to call when the alert is dismissed |
| title | string | Yes | - | Title of the alert |
| message | string | Yes | - | Message to display in the alert body |
| type | 'default' \| 'success' \| 'error' \| 'warning' \| 'info' | No | 'default' | Visual type of the alert which determines colors |
| buttons | AlertButton[] | No | [{text: 'OK', onPress: onClose, style: 'primary'}] | Array of buttons to display in the alert |
| dismissable | boolean | No | true | Whether to allow closing the alert by tapping outside |
| containerStyle | StyleProp<ViewStyle> | No | - | Custom styles for the alert container |
| titleStyle | StyleProp<TextStyle> | No | - | Custom styles for the title text |
| messageStyle | StyleProp<TextStyle> | No | - | Custom styles for the message text |
| accessibilityLabel | string | No | - | Accessibility label for screen readers |
| testID | string | No | - | Test ID for testing |

#### AlertButton Interface

```typescript
interface AlertButton {
  text: string;
  onPress: () => void;
  style?: "primary" | "secondary";
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}
```

#### Basic Usage Example

```tsx
import React, { useState } from 'react';
import { View, Button } from 'react-native';
import { Alert } from '@instincthub/reactnative-ui';

const ExampleScreen = () => {
  const [visible, setVisible] = useState(false);

  return (
    <View>
      <Button title="Show Alert" onPress={() => setVisible(true)} />
      
      <Alert
        visible={visible}
        onClose={() => setVisible(false)}
        title="Confirmation"
        message="Are you sure you want to proceed with this action?"
        type="info"
        buttons={[
          {
            text: "Cancel",
            onPress: () => setVisible(false),
            style: "secondary"
          },
          {
            text: "OK",
            onPress: () => {
              console.log("OK pressed");
              setVisible(false);
            },
            style: "primary"
          }
        ]}
      />
    </View>
  );
};
```

### Notification

A toast-style message component that appears and automatically disappears.

#### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| visible | boolean | Yes | - | Whether the notification is visible |
| onClose | () => void | Yes | - | Function to call when the notification is closed |
| title | string | No | - | Title of the notification |
| message | string | Yes | - | Message to display in the notification |
| type | 'success' \| 'error' \| 'warning' \| 'info' | No | 'info' | Type of notification which determines colors |
| position | 'top' \| 'bottom' | No | 'top' | Position to display the notification |
| duration | number | No | 3000 | Duration in ms before auto-closing (0 for no auto-close) |
| showCloseButton | boolean | No | true | Whether to show a close button |
| icon | React.ReactNode | No | - | Custom icon to display |
| containerStyle | StyleProp<ViewStyle> | No | - | Custom styles for the notification container |
| titleStyle | StyleProp<TextStyle> | No | - | Custom styles for the title text |
| messageStyle | StyleProp<TextStyle> | No | - | Custom styles for the message text |
| action | { text: string, onPress: () => void } | No | - | Additional action to display at the end |
| accessibilityLabel | string | No | - | Accessibility label for screen readers |
| testID | string | No | - | Test ID for testing |

#### Basic Usage Example

```tsx
import React, { useState } from 'react';
import { View, Button } from 'react-native';
import { Notification } from '@instincthub/reactnative-ui';

const ExampleScreen = () => {
  const [visible, setVisible] = useState(false);

  return (
    <View>
      <Button 
        title="Show Notification" 
        onPress={() => setVisible(true)} 
      />
      
      <Notification
        visible={visible}
        onClose={() => setVisible(false)}
        title="Success"
        message="Your profile has been updated successfully!"
        type="success"
        duration={3000}
      />
    </View>
  );
};
```

### NotificationProvider

A context provider that makes it easy to show notifications from anywhere in your app.

#### Setup

Wrap your app with the NotificationProvider:

```tsx
import React from 'react';
import { NotificationProvider } from '@instincthub/reactnative-ui';

const App = () => {
  return (
    <NotificationProvider>
      {/* Your app components */}
    </NotificationProvider>
  );
};
```

#### Usage with useNotification Hook

```tsx
import React from 'react';
import { View, Button } from 'react-native';
import { useNotification } from '@instincthub/reactnative-ui';

const MyComponent = () => {
  const notification = useNotification();

  const showSuccessMessage = () => {
    notification.showSuccess(
      'Your profile has been updated successfully!',
      'Success'
    );
  };

  return (
    <View>
      <Button 
        title="Save Profile" 
        onPress={() => {
          // Save profile logic
          showSuccessMessage();
        }} 
      />
    </View>
  );
};
```

#### Available Methods

The `useNotification` hook provides the following methods:

| Method | Parameters | Description |
|--------|------------|-------------|
| showNotification | (options: NotificationOptions) | Show a notification with custom options |
| showSuccess | (message: string, title?: string, duration?: number) | Show a success notification |
| showError | (message: string, title?: string, duration?: number) | Show an error notification |
| showWarning | (message: string, title?: string, duration?: number) | Show a warning notification |
| showInfo | (message: string, title?: string, duration?: number) | Show an info notification |
| hideNotification | () | Hide the current notification |

## Advanced Usage Examples

### Alert with Custom Styling

```tsx
import React, { useState } from 'react';
import { View, Button } from 'react-native';
import { Alert } from '@instincthub/reactnative-ui';

const CustomStyledAlert = () => {
  const [visible, setVisible] = useState(false);

  return (
    <View>
      <Button title="Show Custom Alert" onPress={() => setVisible(true)} />
      
      <Alert
        visible={visible}
        onClose={() => setVisible(false)}
        title="Custom Alert"
        message="This alert has custom styling applied to it."
        type="warning"
        containerStyle={{
          backgroundColor: '#FFFAF0',
          borderWidth: 1,
          borderColor: '#FFD700',
        }}
        titleStyle={{
          color: '#B8860B',
          fontWeight: 'bold',
        }}
        messageStyle={{
          fontStyle: 'italic',
        }}
        buttons={[
          {
            text: "OK",
            onPress: () => setVisible(false),
            buttonStyle: { backgroundColor: '#FFD700' },
            textStyle: { color: '#8B4513' },
          }
        ]}
      />
    </View>
  );
};
```

### Notification with Action

```tsx
import React, { useState } from 'react';
import { View, Button } from 'react-native';
import { Notification } from '@instincthub/reactnative-ui';

const NotificationWithAction = () => {
  const [visible, setVisible] = useState(false);

  return (
    <View>
      <Button 
        title="Show Notification with Action" 
        onPress={() => setVisible(true)} 
      />
      
      <Notification
        visible={visible}
        onClose={() => setVisible(false)}
        title="New Message"
        message="You received a new message from John."
        type="info"
        duration={0} // Won't auto-close
        action={{
          text: "View",
          onPress: () => {
            console.log("View message pressed");
            // Navigate to message screen
          }
        }}
      />
    </View>
  );
};
```

### Using NotificationProvider for Global Notifications

```tsx
import React from 'react';
import { View, Button } from 'react-native';
import { useNotification } from '@instincthub/reactnative-ui';

const ApiComponent = () => {
  const notification = useNotification();

  const fetchData = async () => {
    try {
      // Show loading state
      notification.showInfo("Loading data...", "Please wait");
      
      // API call
      const response = await fetch('https://api.example.com/data');
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const data = await response.json();
      
      // Success notification
      notification.showSuccess(
        "Data loaded successfully!",
        "Success",
        3000
      );
      
      return data;
    } catch (error) {
      // Error notification
      notification.showError(
        error instanceof Error ? error.message : "An unknown error occurred",
        "Error",
        5000
      );
    }
  };

  return (
    <View>
      <Button title="Fetch Data" onPress={fetchData} />
    </View>
  );
};
```

## Theming

Both components integrate with your theme system through the `useTheme` hook. The components expect your theme to include:

- `colors`: Including text, background, primary, and semantic colors
- `spacing`: For consistent padding and margins
- `borderRadius`: For rounded corners
- `typography`: For font families, sizes, and weights
- `shadows`: For elevation and shadow effects

Example theme structure:

```typescript
interface Theme {
  colors: {
    primary: {
      main: string;
      light: string;
      dark: string;
    };
    background: {
      default: string;
      paper: string;
    };
    text: {
      primary: string;
      secondary: string;
      hint: string;
    };
    semantic: {
      success: string;
      error: string;
      warning: string;
      successLight: string;
      errorLight: string;
      warningLight: string;
    };
    neutral: {
      gray100: string;
      gray300: string;
    };
  };
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
  };
  borderRadius: {
    small: number;
    medium: number;
    large: number;
  };
  typography: {
    fontFamily: {
      primary: string;
    };
    sizes: {
      small: number;
      medium: number;
      large: number;
    };
    fontWeight: {
      normal: string;
      medium: string;
      bold: string;
    };
  };
  shadows: {
    small: object;
    medium: object;
    large: object;
  };
}
```

## Accessibility

Both components are built with accessibility in mind:

- All interactive elements have appropriate `accessibilityRole` properties
- Alert and Notification components accept `accessibilityLabel` props
- Buttons and controls have proper focus management
- Color contrast ratios follow WCAG guidelines
- Components work with screen readers

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
