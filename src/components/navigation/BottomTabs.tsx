import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  StyleProp,
  ViewStyle,
  TextStyle,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export interface TabItem {
  /** Unique key for the tab */
  key: string;
  /** Label text for the tab */
  label: string;
  /** Icon name from Ionicons */
  iconName: keyof typeof Ionicons.glyphMap;
  /** Badge count to display (optional) */
  badgeCount?: number;
  /** Whether this tab is disabled */
  disabled?: boolean;
}

interface BottomTabsProps {
  /** Array of tab items to display */
  tabs: TabItem[];
  /** Currently active tab key */
  activeTab: string;
  /** Function called when a tab is pressed */
  onTabPress: (tabKey: string) => void;
  /** Background color for the tab bar */
  backgroundColor?: string;
  /** Color for active tab */
  activeColor?: string;
  /** Color for inactive tabs */
  inactiveColor?: string;
  /** Color for badges */
  badgeColor?: string;
  /** Additional styles for the tab bar container */
  containerStyle?: StyleProp<ViewStyle>;
  /** Additional styles for tab items */
  tabStyle?: StyleProp<ViewStyle>;
  /** Additional styles for tab labels */
  labelStyle?: StyleProp<TextStyle>;
}

export const BottomTabs: React.FC<BottomTabsProps> = ({
  tabs,
  activeTab,
  onTabPress,
  backgroundColor = "#ffffff",
  activeColor = "#0088ff",
  inactiveColor = "#8e8e93",
  badgeColor = "#ff3b30",
  containerStyle,
  tabStyle,
  labelStyle,
}) => {
  // Animation value for the active indicator
  const [indicatorAnim] = React.useState(new Animated.Value(0));

  // Calculate the position for the active indicator
  React.useEffect(() => {
    const activeIndex = tabs.findIndex((tab) => tab.key === activeTab);
    if (activeIndex >= 0) {
      Animated.timing(indicatorAnim, {
        toValue: activeIndex,
        duration: 250,
        useNativeDriver: true,
      }).start();
    }
  }, [activeTab, tabs, indicatorAnim]);

  // Calculate the width of each tab
  const tabWidth = 100 / tabs.length;

  return (
    <View style={[styles.container, { backgroundColor }, containerStyle]}>
      <Animated.View
        style={[
          styles.activeIndicator,
          {
            backgroundColor: activeColor,
            width: `${tabWidth}%`,
            transform: [
              {
                translateX: indicatorAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ["0%", `${tabWidth}%`],
                }),
              },
            ],
          },
        ]}
      />

      {tabs.map((tab) => {
        const isActive = activeTab === tab.key;
        const color = isActive ? activeColor : inactiveColor;

        return (
          <TouchableOpacity
            key={tab.key}
            style={[styles.tab, tabStyle]}
            onPress={() => !tab.disabled && onTabPress(tab.key)}
            disabled={tab.disabled}
            accessibilityRole="button"
            accessibilityState={{ selected: isActive }}
            accessibilityLabel={tab.label}
          >
            <View style={styles.tabContent}>
              <Ionicons
                name={tab.iconName}
                size={24}
                color={tab.disabled ? "#c7c7cc" : color}
              />

              {tab.badgeCount ? (
                <View style={[styles.badge, { backgroundColor: badgeColor }]}>
                  <Text style={styles.badgeText}>
                    {tab.badgeCount > 99 ? "99+" : tab.badgeCount}
                  </Text>
                </View>
              ) : null}

              <Text
                style={[
                  styles.label,
                  { color: tab.disabled ? "#c7c7cc" : color },
                  labelStyle,
                ]}
                numberOfLines={1}
              >
                {tab.label}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 56,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    position: "relative",
  },
  activeIndicator: {
    position: "absolute",
    top: 0,
    height: 3,
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
  },
  tab: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  tabContent: {
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontSize: 12,
    marginTop: 4,
    textAlign: "center",
  },
  badge: {
    position: "absolute",
    top: -4,
    right: -12,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 4,
  },
  badgeText: {
    color: "#ffffff",
    fontSize: 10,
    fontWeight: "bold",
  },
});
