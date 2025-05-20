import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { ThemeProvider } from "../../../../theme/ThemeProvider";
import { NotificationProvider } from "../NotificationProvider";
import { NavigationExample } from "../../../navigation";

const NotificationExampleApp: React.FC = () => {
  return (
    <ThemeProvider>
      <NotificationProvider>
        <NavigationContainer>
          <NavigationExample />
        </NavigationContainer>
      </NotificationProvider>
    </ThemeProvider>
  );
};

export default NotificationExampleApp;
