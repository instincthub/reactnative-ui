import React, { useState } from "react";
import { View, Button } from "react-native";
import { Dialog } from "./Dialog";
import { Feather } from "@expo/vector-icons";

const DialogExample = () => {
  const [alertVisible, setAlertVisible] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [successVisible, setSuccessVisible] = useState(false);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button title="Show Alert Dialog" onPress={() => setAlertVisible(true)} />
      <Button
        title="Show Confirm Dialog"
        onPress={() => setConfirmVisible(true)}
      />
      <Button
        title="Show Success Dialog"
        onPress={() => setSuccessVisible(true)}
      />

      {/* Alert Dialog */}
      <Dialog
        visible={alertVisible}
        onDismiss={() => setAlertVisible(false)}
        title="Warning"
        message="This action cannot be undone. Are you sure you want to proceed?"
        variant="alert"
        icon={<Feather name="alert-triangle" size={24} color="#FF3B30" />}
        actions={[
          {
            label: "Cancel",
            onPress: () => console.log("Cancelled"),
          },
          {
            label: "Delete",
            onPress: () => console.log("Confirmed delete"),
            primary: true,
          },
        ]}
      />

      {/* Confirmation Dialog */}
      <Dialog
        visible={confirmVisible}
        onDismiss={() => setConfirmVisible(false)}
        title="Confirm Action"
        message="Do you want to save these changes?"
        actions={[
          {
            label: "Cancel",
            onPress: () => console.log("Cancelled"),
          },
          {
            label: "Save",
            onPress: () => console.log("Saved changes"),
            primary: true,
          },
        ]}
      />

      {/* Success Dialog */}
      <Dialog
        visible={successVisible}
        onDismiss={() => setSuccessVisible(false)}
        title="Success"
        message="Your profile has been updated successfully."
        variant="success"
        icon={<Feather name="check-circle" size={24} color="#34C759" />}
        actions={[
          {
            label: "OK",
            onPress: () => console.log("OK pressed"),
            primary: true,
          },
        ]}
      />
    </View>
  );
};

export default DialogExample;
