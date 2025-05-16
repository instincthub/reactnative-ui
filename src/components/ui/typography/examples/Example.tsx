import React from "react";
import { View, SafeAreaView, ScrollView, StyleSheet } from "react-native";
import {
  ThemeProvider,
  H1,
  H2,
  Body1,
  Body2,
  Caption,
  TextWithIcon,
  FormattedText,
  HighlightedText,
} from "../index";

const App = () => {
  return (
    <ThemeProvider>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.section}>
            <H1>Typography System</H1>
            <Body1>
              A comprehensive typography system for React Native apps.
            </Body1>
          </View>

          <View style={styles.section}>
            <H2>Basic Typography</H2>
            <Body1>This is a Body1 text component.</Body1>
            <Body2>This is a smaller Body2 text.</Body2>
            <Caption>This is a caption text.</Caption>
          </View>

          <View style={styles.section}>
            <H2>Styled Typography</H2>
            <Body1 italic>Italic text</Body1>
            <Body1 underline>Underlined text</Body1>
            <Body1 weight="bold" color="#0066CC">
              Bold blue text
            </Body1>
            <Body1 strikethrough>Strikethrough text</Body1>
          </View>

          <View style={styles.section}>
            <H2>Text with Icons</H2>
            <TextWithIcon iconName="checkmark-circle" iconColor="#4CAF50">
              Successfully completed
            </TextWithIcon>
            <TextWithIcon
              iconName="warning"
              iconColor="#FFC107"
              iconPosition="right"
            >
              Warning message
            </TextWithIcon>
          </View>

          <View style={styles.section}>
            <H2>Formatted Text</H2>
            <FormattedText
              variant="body1"
              segments={[
                { text: "This is " },
                { text: "bold", style: { fontWeight: "bold" } },
                { text: " and " },
                { text: "colored", style: { color: "#E91E63" } },
                { text: " text in one line." },
              ]}
            />
          </View>

          <View style={styles.section}>
            <H2>Highlighted Text</H2>
            <HighlightedText
              text="This is a sample text with some highlighted words."
              highlight="highlighted"
              highlightStyle={{
                backgroundColor: "#FFEB3B",
                fontWeight: "bold",
              }}
            >
              This is a sample text with some highlighted words.
            </HighlightedText>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ThemeProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollView: {
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
});

export default App;
