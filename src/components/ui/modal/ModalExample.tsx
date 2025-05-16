import React, { useState } from "react";
import { View, Button, Text } from "react-native";
import { Modal } from "./Modal";

const ModalExample = () => {
  const [visible, setVisible] = useState(false);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button title="Show Modal" onPress={() => setVisible(true)} />

      <Modal
        visible={visible}
        onDismiss={() => setVisible(false)}
        title="Example Modal"
      >
        <Text>This is a simple modal with some content.</Text>
        <Text>You can close it by tapping the X or outside the modal.</Text>
      </Modal>
    </View>
  );
};

export default ModalExample;
