import React from "react";
// import "@testing-library/jest-native/extend-expect"; // Removed this line as it's in jest.setup.js
import { render, fireEvent, screen } from "@testing-library/react-native";
import { Radio, RadioProps } from "./Radio"; // Assuming Radio.tsx is in the same directory
import { defaultTheme, ThemeProvider } from "../../theme/ThemeProvider";

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={defaultTheme}>{component}</ThemeProvider>
  );
};

describe("Radio", () => {
  const mockOnValueChange = jest.fn();

  const defaultProps: RadioProps = {
    selected: false,
    onValueChange: mockOnValueChange,
    label: "Test Radio",
    testID: "test-radio",
  };

  beforeEach(() => {
    mockOnValueChange.mockClear();
  });

  it("renders correctly with default props", () => {
    renderWithTheme(<Radio {...defaultProps} />);

    expect(screen.getByText("Test Radio")).toBeOnTheScreen();
    expect(screen.getByTestId("test-radio")).toBeOnTheScreen();
    // Check initial selected state (visual check might be complex, focus on accessibility state)
    expect(screen.getByRole("radio")).toHaveProp("accessibilityState", {
      selected: false,
      disabled: false,
    });
  });

  it("displays the label when provided", () => {
    renderWithTheme(<Radio {...defaultProps} label="My Radio Button" />);
    expect(screen.getByText("My Radio Button")).toBeOnTheScreen();
  });

  it("calls onValueChange with true when an unselected radio is pressed", () => {
    renderWithTheme(<Radio {...defaultProps} selected={false} />);
    const radio = screen.getByTestId("test-radio");
    fireEvent.press(radio);
    expect(mockOnValueChange).toHaveBeenCalledWith(true);
  });

  it("calls onValueChange with false when a selected radio is pressed", () => {
    renderWithTheme(<Radio {...defaultProps} selected={true} />);
    const radio = screen.getByTestId("test-radio");
    fireEvent.press(radio);
    expect(mockOnValueChange).toHaveBeenCalledWith(false);
  });

  it("does not call onValueChange when disabled and pressed", () => {
    renderWithTheme(<Radio {...defaultProps} disabled />);
    const radio = screen.getByTestId("test-radio");
    fireEvent.press(radio);
    expect(mockOnValueChange).not.toHaveBeenCalled();
    // Check disabled state
    expect(screen.getByRole("radio")).toHaveProp("accessibilityState", {
      selected: false,
      disabled: true,
    });
    expect(radio).toBeDisabled(); // This checks the disabled prop on TouchableOpacity effectively
  });

  it("renders correctly when selected", () => {
    renderWithTheme(<Radio {...defaultProps} selected />);
    expect(screen.getByRole("radio")).toHaveProp("accessibilityState", {
      selected: true,
      disabled: false,
    });
    // Visually, the inner circle should be present.
    // We can check for the presence of the inner circle if it has a specific testID or accessibility role.
    // For now, we rely on the accessibility state.
  });

  it("applies different sizes", () => {
    const { rerender } = renderWithTheme(
      <Radio {...defaultProps} size="small" />
    );
    // Add assertions here if size affects testable properties like accessibility or style values.
    // For example, if styles change significantly, you might snapshot test or check specific style properties.
    // This often requires a more complex setup to access computed styles.

    rerender(
      <ThemeProvider theme={defaultTheme}>
        <Radio {...defaultProps} size="large" />
      </ThemeProvider>
    );
    // Add assertions for large size
  });

  it("renders without a label", () => {
    renderWithTheme(<Radio {...defaultProps} label={undefined} />);
    expect(screen.queryByText("Test Radio")).not.toBeOnTheScreen();
  });

  it("applies accessibilityLabel when label is not provided", () => {
    renderWithTheme(
      <Radio
        {...defaultProps}
        label={undefined}
        accessibilityLabel="Custom accessibility label"
      />
    );
    expect(
      screen.getByAccessibilityHint("Custom accessibility label")
    ).toBeOnTheScreen();
  });

  it("uses label as accessibilityLabel if accessibilityLabel is not provided", () => {
    renderWithTheme(<Radio {...defaultProps} label="Radio Label" />);
    expect(screen.getByAccessibilityHint("Radio Label")).toBeOnTheScreen();
  });

  it("correctly passes testID", () => {
    renderWithTheme(<Radio {...defaultProps} testID="custom-radio-test-id" />);
    expect(screen.getByTestId("custom-radio-test-id")).toBeOnTheScreen();
  });
});
