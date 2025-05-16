import React, { useState } from "react";
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  View,
  ActivityIndicator,
  Text,
  StyleProp,
  ViewStyle,
  TextStyle,
  ListRenderItem,
} from "react-native";
import { useTheme } from "../../theme/ThemeProvider";

export interface ListProps<T> {
  /** Data to render in the list */
  data: T[];
  /** Function to render each item */
  renderItem: ListRenderItem<T>;
  /** Key extractor function */
  keyExtractor: (item: T, index: number) => string;
  /** Function called when list is refreshed */
  onRefresh?: () => Promise<void>;
  /** Function called when end of list is reached */
  onEndReached?: () => void;
  /** Whether data is initially loading */
  loading?: boolean;
  /** Whether more data is being loaded */
  loadingMore?: boolean;
  /** Text to display when list is empty */
  emptyText?: string;
  /** Component to display when list is empty */
  emptyComponent?: React.ReactNode;
  /** Whether the list should show dividers */
  showDividers?: boolean;
  /** Additional styles for the container */
  containerStyle?: StyleProp<ViewStyle>;
  /** Additional styles for the separator */
  separatorStyle?: StyleProp<ViewStyle>;
  /** Additional styles for the empty text */
  emptyTextStyle?: StyleProp<TextStyle>;
  /** Additional styles for the list */
  listStyle?: StyleProp<ViewStyle>;
  /** Props to pass to the FlatList */
  flatListProps?: Omit<
    React.ComponentProps<typeof FlatList>,
    "data" | "renderItem" | "keyExtractor"
  >;
  /** Test ID for testing */
  testID?: string;
}

const getStyles = (theme: ReturnType<typeof useTheme>) => {
  return StyleSheet.create({
    container: {
      flex: 1,
    },
    list: {
      flex: 1,
    },
    content: {
      flexGrow: 1,
    },
    separator: {
      height: 1,
      backgroundColor: theme.colors.neutral.gray200,
    },
    footer: {
      paddingVertical: theme.spacing.md,
      alignItems: "center",
    },
    emptyContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: theme.spacing.xl,
    },
    emptyText: {
      fontFamily: theme.typography.fontFamily.primary,
      fontSize: theme.typography.sizes.medium,
      color: theme.colors.text.secondary,
      textAlign: "center",
    },
  });
};

export function List<T>({
  data,
  renderItem,
  keyExtractor,
  onRefresh,
  onEndReached,
  loading = false,
  loadingMore = false,
  emptyText = "No items to display",
  emptyComponent,
  showDividers = true,
  containerStyle,
  separatorStyle,
  emptyTextStyle,
  listStyle,
  flatListProps,
  testID,
}: ListProps<T>) {
  const theme = useTheme();
  const styles = getStyles(theme);
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    if (onRefresh) {
      setRefreshing(true);
      await onRefresh();
      setRefreshing(false);
    }
  };

  const renderSeparator = () => {
    if (showDividers) {
      return <View style={[styles.separator, separatorStyle]} />;
    }
    return null;
  };

  const renderFooter = () => {
    if (loadingMore) {
      return (
        <View style={styles.footer} testID={`${testID}-loading-more`}>
          <ActivityIndicator size="small" color={theme.colors.primary.main} />
        </View>
      );
    }
    return null;
  };

  const renderEmpty = () => {
    if (loading) {
      return (
        <View style={styles.emptyContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary.main} />
        </View>
      );
    }

    if (emptyComponent) {
      return (
        <View style={styles.emptyContainer} testID={`${testID}-empty`}>
          {emptyComponent}
        </View>
      );
    }

    return (
      <View style={styles.emptyContainer}>
        <Text style={[styles.emptyText, emptyTextStyle]}>{emptyText}</Text>
      </View>
    );
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <FlatList
        data={data}
        renderItem={renderItem as ListRenderItem<unknown>}
        keyExtractor={keyExtractor as (item: unknown, index: number) => string}
        refreshControl={
          onRefresh ? (
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              colors={[theme.colors.primary.main]}
              tintColor={theme.colors.primary.main}
            />
          ) : undefined
        }
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
        ItemSeparatorComponent={renderSeparator}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={renderEmpty}
        style={[styles.list, listStyle]}
        contentContainerStyle={styles.content}
        {...flatListProps}
      />
    </View>
  );
}
