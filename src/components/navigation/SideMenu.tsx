import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Animated,
  Dimensions,
  BackHandler,
  StyleProp,
  ViewStyle,
  TextStyle,
  ImageStyle,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const SCREEN_WIDTH = Dimensions.get("window").width;

export interface MenuItem {
  /** Unique key for the menu item */
  key: string;
  /** Label text for the menu item */
  label: string;
  /** Icon name from Ionicons */
  iconName: keyof typeof Ionicons.glyphMap;
  /** Whether this item is currently active */
  isActive?: boolean;
  /** Whether this item is a divider */
  isDivider?: boolean;
  /** Whether this item is disabled */
  disabled?: boolean;
}

interface ProfileInfo {
  /** Display name */
  name: string;
  /** Email or username */
  subtitle?: string;
  /** Profile image URI */
  imageUri?: string;
}

interface SideMenuProps {
  /** Whether the menu is currently visible */
  isVisible: boolean;
  /** Function called when close button or backdrop is pressed */
  onClose: () => void;
  /** Array of menu items to display */
  menuItems: MenuItem[];
  /** Function called when a menu item is pressed */
  onMenuItemPress: (menuItemKey: string) => void;
  /** Profile information to display in the header (optional) */
  profileInfo?: ProfileInfo;
  /** Content to display in the footer (optional) */
  footerContent?: React.ReactNode;
  /** Background color for the menu */
  backgroundColor?: string;
  /** Color for active item */
  activeColor?: string;
  /** Additional styles for the container */
  containerStyle?: StyleProp<ViewStyle>;
  /** Additional styles for menu items */
  menuItemStyle?: StyleProp<ViewStyle>;
  /** Additional styles for item labels */
  labelStyle?: StyleProp<TextStyle>;
  /** Additional styles for profile container */
  profileContainerStyle?: StyleProp<ViewStyle>;
  /** Additional styles for profile image */
  profileImageStyle?: StyleProp<ImageStyle>;
}

export const SideMenu: React.FC<SideMenuProps> = ({
  isVisible,
  onClose,
  menuItems,
  onMenuItemPress,
  profileInfo,
  footerContent,
  backgroundColor = "#ffffff",
  activeColor = "#0088ff",
  containerStyle,
  menuItemStyle,
  labelStyle,
  profileContainerStyle,
  profileImageStyle,
}) => {
  const slideAnim = useRef(new Animated.Value(-SCREEN_WIDTH)).current;
  const backdropAnim = useRef(new Animated.Value(0)).current;
  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setIsRendered(true);
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(backdropAnim, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: -SCREEN_WIDTH,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(backdropAnim, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isVisible, slideAnim, backdropAnim]);

  // Handle hardware back button on Android
  useEffect(() => {
    const backAction = () => {
      if (isVisible) {
        onClose();
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  }, [isVisible, onClose]);

  if (!isVisible && !isRendered) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.backdrop,
          {
            opacity: backdropAnim,
            display: isVisible ? "flex" : "none",
          },
        ]}
        pointerEvents={isVisible ? "auto" : "none"}
      >
        <TouchableOpacity
          style={styles.backdropTouchable}
          onPress={onClose}
          activeOpacity={1}
        />
      </Animated.View>

      <Animated.View
        style={[
          styles.menuContainer,
          { backgroundColor, transform: [{ translateX: slideAnim }] },
          containerStyle,
        ]}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close" size={24} color="#000000" />
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          {profileInfo && (
            <View style={[styles.profileContainer, profileContainerStyle]}>
              {profileInfo.imageUri ? (
                <Image
                  source={{ uri: profileInfo.imageUri }}
                  style={[styles.profileImage, profileImageStyle]}
                />
              ) : (
                <View style={[styles.profilePlaceholder, profileImageStyle]}>
                  <Text style={styles.profilePlaceholderText}>
                    {profileInfo.name
                      .split(" ")
                      .map((part) => part[0])
                      .slice(0, 2)
                      .join("")
                      .toUpperCase()}
                  </Text>
                </View>
              )}
              <View style={styles.profileInfo}>
                <Text style={styles.profileName}>{profileInfo.name}</Text>
                {profileInfo.subtitle && (
                  <Text style={styles.profileSubtitle}>
                    {profileInfo.subtitle}
                  </Text>
                )}
              </View>
            </View>
          )}

          <View style={styles.menuItems}>
            {menuItems.map((item) => {
              if (item.isDivider) {
                return <View key={item.key} style={styles.divider} />;
              }

              const isActive = item.isActive;
              const color = isActive ? activeColor : "#000000";

              return (
                <TouchableOpacity
                  key={item.key}
                  style={[
                    styles.menuItem,
                    isActive && { backgroundColor: `${activeColor}15` },
                    menuItemStyle,
                  ]}
                  onPress={() => !item.disabled && onMenuItemPress(item.key)}
                  disabled={item.disabled}
                  activeOpacity={0.7}
                >
                  <Ionicons
                    name={item.iconName}
                    size={22}
                    color={item.disabled ? "#c7c7cc" : color}
                    style={styles.menuItemIcon}
                  />
                  <Text
                    style={[
                      styles.menuItemLabel,
                      { color: item.disabled ? "#c7c7cc" : color },
                      labelStyle,
                    ]}
                  >
                    {item.label}
                  </Text>
                  {isActive && (
                    <View
                      style={[
                        styles.activeIndicator,
                        { backgroundColor: activeColor },
                      ]}
                    />
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>

        {footerContent && <View style={styles.footer}>{footerContent}</View>}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1000,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1,
  },
  backdropTouchable: {
    flex: 1,
  },
  menuContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    width: "80%",
    maxWidth: 320,
    zIndex: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 16,
  },
  closeButton: {
    padding: 4,
  },
  scrollView: {
    flex: 1,
  },
  profileContainer: {
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  profilePlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#e1e1e1",
    justifyContent: "center",
    alignItems: "center",
  },
  profilePlaceholderText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#757575",
  },
  profileInfo: {
    marginLeft: 16,
  },
  profileName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  profileSubtitle: {
    fontSize: 14,
    color: "#757575",
    marginTop: 4,
  },
  menuItems: {
    flex: 1,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    position: "relative",
  },
  menuItemIcon: {
    marginRight: 16,
  },
  menuItemLabel: {
    fontSize: 16,
  },
  activeIndicator: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 3,
  },
  divider: {
    height: 1,
    backgroundColor: "#e1e1e1",
    marginVertical: 8,
    marginHorizontal: 16,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#e1e1e1",
  },
});
