import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { Card, CardContent, CardMedia, CardHeader, CardActions } from "./Card";
import { defaultTheme, ThemeProvider } from "../../theme/ThemeProvider";
import { View } from "react-native";

const renderWithTheme = (component: React.ReactNode) => {
  return render(
    <ThemeProvider theme={defaultTheme}>{component}</ThemeProvider>
  );
};

describe("Card", () => {
  it("renders correctly with default props", () => {
    const { getByTestId } = renderWithTheme(<Card testID="card">Content</Card>);
    expect(getByTestId("card")).toBeTruthy();
  });

  it("renders as TouchableOpacity when onPress is provided", () => {
    const onPress = jest.fn();
    const { getByTestId } = renderWithTheme(
      <Card onPress={onPress} testID="card">
        Content
      </Card>
    );
    fireEvent.press(getByTestId("card"));
    expect(onPress).toHaveBeenCalled();
  });

  it("applies custom styles correctly", () => {
    const { getByTestId } = renderWithTheme(
      <Card
        testID="card"
        style={{ backgroundColor: "red" }}
        elevation={1}
        rounded
        bordered
        fullWidth
      >
        Content
      </Card>
    );
    const card = getByTestId("card");
    expect(card.props.style).toContainEqual({ backgroundColor: "red" });
  });
});

describe("CardContent", () => {
  it("renders children correctly", () => {
    const { getByText } = renderWithTheme(<CardContent>Content</CardContent>);
    expect(getByText("Content")).toBeTruthy();
  });

  it("applies custom styles correctly", () => {
    const { getByTestId } = renderWithTheme(
      <CardContent testID="content" style={{ padding: 20 }}>
        Content
      </CardContent>
    );
    const content = getByTestId("content");
    expect(content.props.style).toContainEqual({ padding: 20 });
  });
});

describe("CardMedia", () => {
  it("renders image correctly", () => {
    const source = { uri: "https://example.com/image.jpg" };
    const { getByTestId } = renderWithTheme(
      <CardMedia source={source} testID="media" />
    );
    expect(getByTestId("media")).toBeTruthy();
  });

  it("applies custom height correctly", () => {
    const source = { uri: "https://example.com/image.jpg" };
    const { getByTestId } = renderWithTheme(
      <CardMedia source={source} height={300} testID="media" />
    );
    const media = getByTestId("media");
    expect(media.props.style).toContainEqual({ height: 300 });
  });
});

describe("CardHeader", () => {
  it("renders title and subtitle correctly", () => {
    const { getByText } = renderWithTheme(
      <CardHeader title="Title" subtitle="Subtitle" />
    );
    expect(getByText("Title")).toBeTruthy();
    expect(getByText("Subtitle")).toBeTruthy();
  });

  it("renders left and right components correctly", () => {
    const { getByTestId } = renderWithTheme(
      <CardHeader
        title="Title"
        left={<View testID="left" />}
        right={<View testID="right" />}
      />
    );
    expect(getByTestId("left")).toBeTruthy();
    expect(getByTestId("right")).toBeTruthy();
  });
});

describe("CardActions", () => {
  it("renders children correctly", () => {
    const { getByText } = renderWithTheme(<CardActions>Action</CardActions>);
    expect(getByText("Action")).toBeTruthy();
  });

  it("applies custom styles correctly", () => {
    const { getByTestId } = renderWithTheme(
      <CardActions testID="actions" style={{ padding: 20 }}>
        Action
      </CardActions>
    );
    const actions = getByTestId("actions");
    expect(actions.props.style).toContainEqual({ padding: 20 });
  });
});
