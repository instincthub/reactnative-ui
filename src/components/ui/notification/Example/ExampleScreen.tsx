import React, { useState } from "react";
import { View, Button, StyleSheet } from "react-native";
import { Alert } from "../../alert";
import { useNotification } from "../NotificationProvider";

const ExampleScreen: React.FC = () => {
  const [alertVisible, setAlertVisible] = useState(false);
  const notification = useNotification();

  // Simple alert example
  const showSimpleAlert = () => {
    setAlertVisible(true);
  };

  // Complex alert with multiple buttons
  const showComplexAlert = () => {
    setAlertVisible(true);
  };

  // Show different types of notifications
  const showSuccessNotification = () => {
    notification.showSuccess(
      "Your profile has been updated successfully!",
      "Success"
    );
  };

  const showErrorNotification = () => {
    notification.showError(
      "Failed to connect to the server. Please try again.",
      "Error"
    );
  };

  const showWarningNotification = () => {
    notification.showWarning(
      "Your session will expire in 5 minutes.",
      "Warning"
    );
  };

  const showInfoNotification = () => {
    notification.showInfo(
      "New features are available. Check them out!",
      "What's New"
    );
  };

  const showActionNotification = () => {
    notification.showNotification({
      title: "New message",
      message: "You received a new message from John",
      type: "info",
      action: {
        text: "View",
        onPress: () => console.log("View message pressed"),
      },
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Button title="Show Simple Alert" onPress={showSimpleAlert} />
        <Button title="Show Complex Alert" onPress={showComplexAlert} />
      </View>

      <View style={styles.section}>
        <Button
          title="Success Notification"
          onPress={showSuccessNotification}
        />
        <Button title="Error Notification" onPress={showErrorNotification} />
        <Button
          title="Warning Notification"
          onPress={showWarningNotification}
        />
        <Button title="Info Notification" onPress={showInfoNotification} />
        <Button title="Action Notification" onPress={showActionNotification} />
      </View>

      {/* Simple Alert */}
      <Alert
        visible={alertVisible}
        onClose={() => setAlertVisible(false)}
        title="Confirmation"
        message="Are you sure you want to proceed with this action?"
        type="info"
        buttons={[
          {
            text: "Cancel",
            onPress: () => setAlertVisible(false),
            style: "secondary",
          },
          {
            text: "OK",
            onPress: () => {
              console.log("OK pressed");
              setAlertVisible(false);
            },
            style: "primary",
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  section: {
    marginBottom: 30,
  },
});

export default ExampleScreen;
