import React from "react";
import { render, fireEvent, screen } from "@testing-library/react-native";
import { TextInput } from "./TextInput";
import { defaultTheme, ThemeProvider } from "../../theme/ThemeProvider";

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={defaultTheme}>{component}</ThemeProvider>
  );
};

describe("TextInput", () => {
  it("renders correctly with default props", () => {
    renderWithTheme(
      <TextInput
        label="Test Input"
        value=""
        onChangeText={() => {}}
        testID="test-input"
      />
    );

    expect(screen.getByText("Test Input")).toBeOnTheScreen();
    expect(screen.getByTestId("test-input")).toBeOnTheScreen();
  });

  it("displays required indicator when required prop is true", () => {
    renderWithTheme(
      <TextInput label="Test Input" value="" onChangeText={() => {}} required />
    );

    expect(screen.getByText("*")).toBeOnTheScreen();
  });

  it("calls onChangeText when text changes", () => {
    const onChangeTextMock = jest.fn();
    renderWithTheme(
      <TextInput
        label="Test Input"
        value=""
        onChangeText={onChangeTextMock}
        testID="test-input"
      />
    );

    const input = screen.getByTestId("test-input");
    fireEvent.changeText(input, "new value");
    expect(onChangeTextMock).toHaveBeenCalledWith("new value");
  });

  it("displays helper text when provided", () => {
    renderWithTheme(
      <TextInput
        label="Test Input"
        value=""
        onChangeText={() => {}}
        helperText="Helper text"
      />
    );

    expect(screen.getByText("Helper text")).toBeOnTheScreen();
  });

  it("displays error message when validationState is error", () => {
    renderWithTheme(
      <TextInput
        label="Test Input"
        value=""
        onChangeText={() => {}}
        validationState="error"
        errorMessage="Error message"
      />
    );

    expect(screen.getByText("Error message")).toBeOnTheScreen();
  });

  it("displays validation icons based on validationState", () => {
    const { rerender } = renderWithTheme(
      <TextInput
        label="Test Input"
        value=""
        onChangeText={() => {}}
        validationState="success"
        testID="test-input"
      />
    );

    expect(screen.getByTestId("test-input")).toBeOnTheScreen();

    rerender(
      <ThemeProvider theme={defaultTheme}>
        <TextInput
          label="Test Input"
          value=""
          onChangeText={() => {}}
          validationState="error"
          testID="test-input"
        />
      </ThemeProvider>
    );

    expect(screen.getByTestId("test-input")).toBeOnTheScreen();
  });

  it("toggles password visibility when eye icon is pressed", () => {
    renderWithTheme(
      <TextInput
        label="Password"
        value="password123"
        onChangeText={() => {}}
        secureTextEntry
        testID="password-input"
      />
    );

    const input = screen.getByTestId("password-input");
    expect(input.props.secureTextEntry).toBe(true);

    const visibilityToggle = screen.getByRole("button", {
      name: /show password/i,
    });
    fireEvent.press(visibilityToggle);

    expect(input.props.secureTextEntry).toBe(false);
  });

  it("applies disabled styles when disabled prop is true", () => {
    renderWithTheme(
      <TextInput
        label="Test Input"
        value=""
        onChangeText={() => {}}
        disabled
        testID="test-input"
      />
    );

    const input = screen.getByTestId("test-input");
    expect(input.props.editable).toBe(false);
  });

  it("calls onFocus and onBlur handlers", () => {
    const onFocusMock = jest.fn();
    const onBlurMock = jest.fn();
    renderWithTheme(
      <TextInput
        label="Test Input"
        value=""
        onChangeText={() => {}}
        onFocus={onFocusMock}
        onBlur={onBlurMock}
        testID="test-input"
      />
    );

    const input = screen.getByTestId("test-input");
    fireEvent(input, "focus");
    expect(onFocusMock).toHaveBeenCalled();

    fireEvent(input, "blur");
    expect(onBlurMock).toHaveBeenCalled();
  });

  it("renders with different variants", () => {
    const { rerender } = renderWithTheme(
      <TextInput
        label="Test Input"
        value=""
        onChangeText={() => {}}
        variant="outlined"
        testID="test-input"
      />
    );

    expect(screen.getByTestId("test-input")).toBeOnTheScreen();

    rerender(
      <ThemeProvider theme={defaultTheme}>
        <TextInput
          label="Test Input"
          value=""
          onChangeText={() => {}}
          variant="filled"
          testID="test-input"
        />
      </ThemeProvider>
    );

    expect(screen.getByTestId("test-input")).toBeOnTheScreen();

    rerender(
      <ThemeProvider theme={defaultTheme}>
        <TextInput
          label="Test Input"
          value=""
          onChangeText={() => {}}
          variant="underlined"
          testID="test-input"
        />
      </ThemeProvider>
    );

    expect(screen.getByTestId("test-input")).toBeOnTheScreen();
  });

  it("renders with left and right icons", () => {
    renderWithTheme(
      <TextInput
        label="Test Input"
        value=""
        onChangeText={() => {}}
        leftIcon="user"
        rightIcon="check"
        testID="test-input"
      />
    );

    expect(screen.getByTestId("test-input")).toBeOnTheScreen();
  });

  it("handles keyboard type correctly", () => {
    renderWithTheme(
      <TextInput
        label="Email"
        value=""
        onChangeText={() => {}}
        keyboardType="email-address"
        testID="test-input"
      />
    );

    const input = screen.getByTestId("test-input");
    expect(input.props.keyboardType).toBe("email-address");
  });
});
