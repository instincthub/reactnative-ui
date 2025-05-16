import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Header } from "./Header";
import { BottomTabs, TabItem } from "./BottomTabs";
import { SideMenu, MenuItem } from "./SideMenu";

const NavigationExample: React.FC = () => {
  // Current screen state
  const [currentScreen, setCurrentScreen] = useState("home");

  // Side menu visibility state
  const [menuVisible, setMenuVisible] = useState(false);

  // Define tab items
  const tabs: TabItem[] = [
    { key: "home", label: "Home", iconName: "home" },
    { key: "search", label: "Search", iconName: "search" },
    {
      key: "notifications",
      label: "Alerts",
      iconName: "notifications",
      badgeCount: 3,
    },
    { key: "profile", label: "Profile", iconName: "person" },
  ];

  // Define menu items
  const menuItems: MenuItem[] = [
    {
      key: "home",
      label: "Home",
      iconName: "home",
      isActive: currentScreen === "home",
    },
    {
      key: "search",
      label: "Search",
      iconName: "search",
      isActive: currentScreen === "search",
    },
    {
      key: "notifications",
      label: "Notifications",
      iconName: "notifications",
      isActive: currentScreen === "notifications",
    },
    {
      key: "profile",
      label: "Profile",
      iconName: "person",
      isActive: currentScreen === "profile",
    },
    {
      key: "divider1",
      label: "",
      iconName: "ellipsis-horizontal",
      isDivider: true,
    },
    {
      key: "settings",
      label: "Settings",
      iconName: "settings",
      isActive: currentScreen === "settings",
    },
    {
      key: "help",
      label: "Help & Support",
      iconName: "help-circle",
      isActive: currentScreen === "help",
    },
  ];

  // Handle tab press
  const handleTabPress = (tabKey: string) => {
    setCurrentScreen(tabKey);
  };

  // Handle menu item press
  const handleMenuItemPress = (menuItemKey: string) => {
    setCurrentScreen(menuItemKey);
    setMenuVisible(false);
  };

  // Screen content based on current screen
  const renderScreenContent = () => {
    switch (currentScreen) {
      case "home":
        return (
          <View style={styles.screenContent}>
            <Text style={styles.screenTitle}>Home Screen</Text>
            <Text style={styles.screenDescription}>
              This is the home screen of the application.
            </Text>
          </View>
        );
      case "search":
        return (
          <View style={styles.screenContent}>
            <Text style={styles.screenTitle}>Search Screen</Text>
            <Text style={styles.screenDescription}>
              Search for content here.
            </Text>
          </View>
        );
      case "notifications":
        return (
          <View style={styles.screenContent}>
            <Text style={styles.screenTitle}>Notifications Screen</Text>
            <Text style={styles.screenDescription}>
              You have 3 new notifications.
            </Text>
          </View>
        );
      case "profile":
        return (
          <View style={styles.screenContent}>
            <Text style={styles.screenTitle}>Profile Screen</Text>
            <Text style={styles.screenDescription}>
              View and edit your profile information.
            </Text>
          </View>
        );
      case "settings":
        return (
          <View style={styles.screenContent}>
            <Text style={styles.screenTitle}>Settings Screen</Text>
            <Text style={styles.screenDescription}>
              Adjust your app settings here.
            </Text>
          </View>
        );
      case "help":
        return (
          <View style={styles.screenContent}>
            <Text style={styles.screenTitle}>Help & Support</Text>
            <Text style={styles.screenDescription}>
              Get help and support for using the app.
            </Text>
          </View>
        );
      default:
        return (
          <View style={styles.screenContent}>
            <Text style={styles.screenTitle}>Unknown Screen</Text>
          </View>
        );
    }
  };

  // Define header right actions
  const headerRightActions = (
    <View style={{ flexDirection: "row" }}>
      <TouchableOpacity style={{ marginLeft: 16 }}>
        <Ionicons name="search" size={24} color="#000000" />
      </TouchableOpacity>
      <TouchableOpacity style={{ marginLeft: 16 }}>
        <Ionicons name="notifications" size={24} color="#000000" />
      </TouchableOpacity>
    </View>
  );

  // Define profile info for side menu
  const profileInfo = {
    name: "John Doe",
    subtitle: "john.doe@example.com",
    imageUri: "https://randomuser.me/api/portraits/men/32.jpg",
  };

  // Define footer content for side menu
  const footerContent = (
    <TouchableOpacity style={styles.logoutButton}>
      <Ionicons name="log-out" size={20} color="#ff3b30" />
      <Text style={styles.logoutText}>Logout</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <Header
        title={currentScreen.charAt(0).toUpperCase() + currentScreen.slice(1)}
        showBackButton={false}
        rightActions={headerRightActions}
        backgroundColor="#ffffff"
        onBackPress={() => {}}
      />

      {/* Main Content */}
      <View style={styles.content}>{renderScreenContent()}</View>

      {/* Bottom Tabs */}
      <BottomTabs
        tabs={tabs}
        activeTab={currentScreen}
        onTabPress={handleTabPress}
        backgroundColor="#ffffff"
        activeColor="#0088ff"
      />

      {/* Side Menu */}
      <SideMenu
        isVisible={menuVisible}
        onClose={() => setMenuVisible(false)}
        menuItems={menuItems}
        onMenuItemPress={handleMenuItemPress}
        profileInfo={profileInfo}
        footerContent={footerContent}
        backgroundColor="#ffffff"
        activeColor="#0088ff"
      />

      {/* Menu toggle button - floating */}
      <TouchableOpacity
        style={styles.menuButton}
        onPress={() => setMenuVisible(true)}
      >
        <Ionicons name="menu" size={24} color="#ffffff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  content: {
    flex: 1,
  },
  screenContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  screenTitle: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  screenDescription: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    maxWidth: 300,
  },
  menuButton: {
    position: "absolute",
    bottom: 80,
    right: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#0088ff",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    zIndex: 10,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoutText: {
    color: "#ff3b30",
    marginLeft: 8,
    fontSize: 16,
    fontWeight: "500",
  },
});

export default NavigationExample;
