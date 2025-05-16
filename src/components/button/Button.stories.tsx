import React from "react";
import { Button } from "./Button";
import { View } from "react-native";
import { ThemeProvider } from "../../theme/ThemeProvider";

export default {
  title: "Button",
  component: Button,
  decorators: [
    (Story: React.ComponentType) => (
      <ThemeProvider>
        <View style={{ padding: 16, backgroundColor: "#f5f5f5", flex: 1 }}>
          <Story />
        </View>
      </ThemeProvider>
    ),
  ],
};

export const Variants = () => (
  <View style={{ gap: 16 }}>
    <Button label="Primary Button" onPress={() => {}} variant="primary" />
    <Button label="Secondary Button" onPress={() => {}} variant="secondary" />
    <Button label="Outlined Button" onPress={() => {}} variant="outlined" />
    <Button label="Text Button" onPress={() => {}} variant="text" />
  </View>
);

export const Sizes = () => (
  <View style={{ gap: 16 }}>
    <Button label="Small Button" onPress={() => {}} size="small" />
    <Button label="Medium Button" onPress={() => {}} size="medium" />
    <Button label="Large Button" onPress={() => {}} size="large" />
  </View>
);

export const States = () => (
  <View style={{ gap: 16 }}>
    <Button label="Normal Button" onPress={() => {}} />
    <Button label="Disabled Button" onPress={() => {}} disabled />
    <Button label="Loading Button" onPress={() => {}} loading />
  </View>
);

export const WithIcons = () => (
  <View style={{ gap: 16 }}>
    <Button label="Left Icon" onPress={() => {}} leftIcon="arrow-left" />
    <Button label="Right Icon" onPress={() => {}} rightIcon="arrow-right" />
    <Button
      label="Both Icons"
      onPress={() => {}}
      leftIcon="check"
      rightIcon="chevron-down"
    />
  </View>
);
