import React from "react";
import { render, fireEvent, act } from "@testing-library/react-native";
import { List } from "./List";
import { Text } from "react-native";
import { defaultTheme, ThemeProvider } from "../../theme/ThemeProvider";

const renderWithTheme = (component: React.ReactNode) => {
  return render(
    <ThemeProvider theme={defaultTheme}>{component}</ThemeProvider>
  );
};

const mockData = [
  { id: "1", title: "Item 1" },
  { id: "2", title: "Item 2" },
  { id: "3", title: "Item 3" },
];

const mockRenderItem = ({ item }: { item: (typeof mockData)[0] }) => (
  <Text>{item.title}</Text>
);

describe("List", () => {
  it("renders list items correctly", () => {
    const { getByText } = renderWithTheme(
      <List
        data={mockData}
        renderItem={mockRenderItem}
        keyExtractor={(item) => item.id}
      />
    );

    expect(getByText("Item 1")).toBeTruthy();
    expect(getByText("Item 2")).toBeTruthy();
    expect(getByText("Item 3")).toBeTruthy();
  });

  it("shows loading indicator when loading", () => {
    const { getByTestId } = renderWithTheme(
      <List
        data={[]}
        renderItem={mockRenderItem}
        keyExtractor={(item) => item.id}
        loading
      />
    );

    expect(getByTestId("activity-indicator")).toBeTruthy();
  });

  it("shows empty text when no data", () => {
    const { getByText } = renderWithTheme(
      <List
        data={[]}
        renderItem={mockRenderItem}
        keyExtractor={(item) => item.id}
        emptyText="No items"
      />
    );

    expect(getByText("No items")).toBeTruthy();
  });

  it("shows custom empty component when provided", () => {
    const EmptyComponent = () => <Text testID="empty">Custom Empty</Text>;
    const { getByTestId } = renderWithTheme(
      <List
        data={[]}
        renderItem={mockRenderItem}
        keyExtractor={(item) => item.id}
        emptyComponent={<EmptyComponent />}
      />
    );

    expect(getByTestId("empty")).toBeTruthy();
  });

  it("handles refresh correctly", async () => {
    const onRefresh = jest.fn();
    const { getByTestId } = renderWithTheme(
      <List
        data={mockData}
        renderItem={mockRenderItem}
        keyExtractor={(item) => item.id}
        onRefresh={onRefresh}
      />
    );

    await act(async () => {
      fireEvent(getByTestId("refresh-control"), "refresh");
    });

    expect(onRefresh).toHaveBeenCalled();
  });

  it("shows loading more indicator when loadingMore is true", () => {
    const { getByTestId } = renderWithTheme(
      <List
        data={mockData}
        renderItem={mockRenderItem}
        keyExtractor={(item) => item.id}
        loadingMore
      />
    );

    expect(getByTestId("loading-more")).toBeTruthy();
  });

  it("applies custom styles correctly", () => {
    const { getByTestId } = renderWithTheme(
      <List
        data={mockData}
        renderItem={mockRenderItem}
        keyExtractor={(item) => item.id}
        containerStyle={{ backgroundColor: "red" }}
        listStyle={{ backgroundColor: "blue" }}
        separatorStyle={{ backgroundColor: "green" }}
        emptyTextStyle={{ color: "purple" }}
        testID="list"
      />
    );

    const list = getByTestId("list");
    expect(list.props.style).toContainEqual({ backgroundColor: "red" });
  });
});
