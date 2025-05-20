import React from "react";
import { View } from "react-native";
import { H1, Body1 } from "../index";
import { ThemeProvider } from "../../../../theme/ThemeProvider";
import { defaultTheme } from "../../../../theme/default-theme";

const CustomThemeExample = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <View style={{ padding: 20 }}>
        <H1>Custom Theme</H1>
        <Body1>
          This text uses a custom theme with Roboto for headings and Georgia for
          body text.
        </Body1>
      </View>
    </ThemeProvider>
  );
};

export default CustomThemeExample;
