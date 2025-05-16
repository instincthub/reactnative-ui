import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Platform,
  StyleProp,
  TextStyle,
  ViewStyle,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface HeaderProps {
  /** Title to display in the header */
  title: string;
  /** Whether to show the back button */
  showBackButton?: boolean;
  /** Function called when back button is pressed */
  onBackPress?: () => void;
  /** Right side actions to display */
  rightActions?: React.ReactNode;
  /** Background color for the header */
  backgroundColor?: string;
  /** Text color for the header */
  textColor?: string;
  /** Additional styles for the header container */
  containerStyle?: StyleProp<ViewStyle>;
  /** Additional styles for the title text */
  titleStyle?: StyleProp<TextStyle>;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  showBackButton = false,
  onBackPress,
  rightActions,
  backgroundColor = "#ffffff",
  textColor = "#000000",
  containerStyle,
  titleStyle,
}) => {
  const statusBarHeight =
    Platform.OS === "ios" ? 50 : StatusBar.currentHeight || 0;

  return (
    <View
      style={[
        styles.container,
        { backgroundColor, paddingTop: statusBarHeight },
        containerStyle,
      ]}
    >
      <StatusBar
        barStyle={
          backgroundColor === "#ffffff" ? "dark-content" : "light-content"
        }
        backgroundColor={backgroundColor}
      />

      <View style={styles.contentContainer}>
        {showBackButton && (
          <TouchableOpacity
            style={styles.backButton}
            onPress={onBackPress}
            hitSlop={{ top: 10, left: 10, bottom: 10, right: 10 }}
          >
            <Ionicons name="chevron-back" size={24} color={textColor} />
          </TouchableOpacity>
        )}

        <Text
          style={[
            styles.title,
            { color: textColor },
            showBackButton && styles.titleWithBack,
            titleStyle,
          ]}
          numberOfLines={1}
        >
          {title}
        </Text>

        <View style={styles.rightContainer}>{rightActions}</View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 56,
    paddingHorizontal: 16,
  },
  backButton: {
    marginRight: 8,
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontWeight: "600",
  },
  titleWithBack: {
    marginLeft: 4,
  },
  rightContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});
