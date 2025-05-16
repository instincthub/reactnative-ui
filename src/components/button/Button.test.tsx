import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { Button } from "./Button";
import { ThemeProvider } from "../../theme/ThemeProvider";

const renderWithTheme = (component: React.ReactNode) => {
  return render(<ThemeProvider>{component}</ThemeProvider>);
};

describe("Button", () => {
  it("renders correctly with default props", () => {
    const { getByText } = renderWithTheme(
      <Button label="Test Button" onPress={() => {}} />
    );
    expect(getByText("Test Button")).toBeTruthy();
  });

  it("calls onPress when pressed", () => {
    const onPressMock = jest.fn();
    const { getByText } = renderWithTheme(
      <Button label="Test Button" onPress={onPressMock} />
    );
    fireEvent.press(getByText("Test Button"));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it("does not call onPress when disabled", () => {
    const onPressMock = jest.fn();
    const { getByText } = renderWithTheme(
      <Button label="Test Button" onPress={onPressMock} disabled />
    );
    fireEvent.press(getByText("Test Button"));
    expect(onPressMock).not.toHaveBeenCalled();
  });

  it("shows loading indicator when loading", () => {
    const { queryByText, getByTestId } = renderWithTheme(
      <Button
        label="Test Button"
        onPress={() => {}}
        loading
        testID="loading-button"
      />
    );
    expect(queryByText("Test Button")).toBeNull();
    expect(getByTestId("loading-button")).toBeTruthy();
  });

  it("renders with different variants", () => {
    const { getByText, rerender } = renderWithTheme(
      <Button label="Primary Button" onPress={() => {}} variant="primary" />
    );
    expect(getByText("Primary Button")).toBeTruthy();

    rerender(
      <ThemeProvider>
        <Button
          label="Secondary Button"
          onPress={() => {}}
          variant="secondary"
        />
      </ThemeProvider>
    );
    expect(getByText("Secondary Button")).toBeTruthy();

    rerender(
      <ThemeProvider>
        <Button label="Outlined Button" onPress={() => {}} variant="outlined" />
      </ThemeProvider>
    );
    expect(getByText("Outlined Button")).toBeTruthy();

    rerender(
      <ThemeProvider>
        <Button label="Text Button" onPress={() => {}} variant="text" />
      </ThemeProvider>
    );
    expect(getByText("Text Button")).toBeTruthy();
  });

  it("renders with different sizes", () => {
    const { getByText, rerender } = renderWithTheme(
      <Button label="Small Button" onPress={() => {}} size="small" />
    );
    expect(getByText("Small Button")).toBeTruthy();

    rerender(
      <ThemeProvider>
        <Button label="Medium Button" onPress={() => {}} size="medium" />
      </ThemeProvider>
    );
    expect(getByText("Medium Button")).toBeTruthy();

    rerender(
      <ThemeProvider>
        <Button label="Large Button" onPress={() => {}} size="large" />
      </ThemeProvider>
    );
    expect(getByText("Large Button")).toBeTruthy();
  });

  it("renders with icons", () => {
    const { getByText } = renderWithTheme(
      <Button
        label="Icon Button"
        onPress={() => {}}
        leftIcon="arrow-left"
        rightIcon="arrow-right"
      />
    );
    expect(getByText("Icon Button")).toBeTruthy();
    expect(getByText("←")).toBeTruthy();
    expect(getByText("→")).toBeTruthy();
  });
});
