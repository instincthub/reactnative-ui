import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { Checkbox } from "./Checkbox";

describe("Checkbox", () => {
  it("renders correctly with default props", () => {
    const { getByRole } = render(
      <Checkbox checked={false} onValueChange={() => {}} />
    );
    expect(getByRole("checkbox")).toBeTruthy();
  });

  it("renders with label", () => {
    const { getByText } = render(
      <Checkbox checked={false} onValueChange={() => {}} label="Test Label" />
    );
    expect(getByText("Test Label")).toBeTruthy();
  });

  it("calls onValueChange when pressed", () => {
    const onValueChangeMock = jest.fn();
    const { getByRole } = render(
      <Checkbox checked={false} onValueChange={onValueChangeMock} />
    );
    fireEvent.press(getByRole("checkbox"));
    expect(onValueChangeMock).toHaveBeenCalledWith(true);
  });

  it("does not call onValueChange when disabled", () => {
    const onValueChangeMock = jest.fn();
    const { getByRole } = render(
      <Checkbox checked={false} onValueChange={onValueChangeMock} disabled />
    );
    fireEvent.press(getByRole("checkbox"));
    expect(onValueChangeMock).not.toHaveBeenCalled();
  });

  it("renders in indeterminate state", () => {
    const { getByRole } = render(
      <Checkbox checked={false} onValueChange={() => {}} indeterminate />
    );
    const checkbox = getByRole("checkbox");
    expect(checkbox.props.accessibilityState.checked).toBe(false);
  });

  it("renders in checked state", () => {
    const { getByRole } = render(
      <Checkbox checked={true} onValueChange={() => {}} />
    );
    const checkbox = getByRole("checkbox");
    expect(checkbox.props.accessibilityState.checked).toBe(true);
  });
});
