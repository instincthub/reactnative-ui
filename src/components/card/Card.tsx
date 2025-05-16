import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  Image,
  Text,
} from "react-native";
import { useTheme } from "../../theme/ThemeProvider";

export interface CardProps {
  /** Card content */
  children: React.ReactNode;
  /** Function called when card is pressed */
  onPress?: () => void;
  /** Elevation level for shadow */
  elevation?: 0 | 1 | 2 | 3 | 4;
  /** Whether the card has rounded corners */
  rounded?: boolean;
  /** Whether the card has a border */
  bordered?: boolean;
  /** Whether the card should fill width */
  fullWidth?: boolean;
  /** Additional styles for the card */
  style?: StyleProp<ViewStyle>;
  /** Background color for the card */
  backgroundColor?: string;
  /** Accessibility label for screen readers */
  accessibilityLabel?: string;
  /** Test ID for testing */
  testID?: string;
}

const getStyles = (
  theme: ReturnType<typeof useTheme>,
  elevation: number,
  rounded: boolean,
  bordered: boolean,
  fullWidth: boolean,
  backgroundColor: string
) => {
  return StyleSheet.create({
    card: {
      backgroundColor,
      marginVertical: theme.spacing.sm,
      overflow: "hidden",
      ...(rounded && { borderRadius: theme.borderRadius.medium }),
      ...(bordered && {
        borderWidth: 1,
        borderColor: theme.colors.neutral.gray200,
      }),
      ...(fullWidth && { width: "100%" }),
      ...theme.elevation[elevation as keyof typeof theme.elevation],
    },
  });
};

export const Card: React.FC<CardProps> = ({
  children,
  onPress,
  elevation = 1,
  rounded = true,
  bordered = false,
  fullWidth = false,
  style,
  backgroundColor,
  accessibilityLabel,
  testID,
}) => {
  const theme = useTheme();
  const styles = getStyles(
    theme,
    elevation,
    rounded,
    bordered,
    fullWidth,
    backgroundColor || theme.colors.background.paper
  );

  if (onPress) {
    return (
      <TouchableOpacity
        style={[styles.card, style]}
        onPress={onPress}
        activeOpacity={0.7}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel}
        testID={testID}
      >
        {children}
      </TouchableOpacity>
    );
  }

  return (
    <View
      style={[styles.card, style]}
      accessibilityLabel={accessibilityLabel}
      testID={testID}
    >
      {children}
    </View>
  );
};

export interface CardContentProps {
  /** Content inside the card */
  children: React.ReactNode;
  /** Additional styles for the content */
  style?: StyleProp<ViewStyle>;
  /** Test ID for testing */
  testID?: string;
}

const getContentStyles = (theme: ReturnType<typeof useTheme>) => {
  return StyleSheet.create({
    content: {
      padding: theme.spacing.md,
    },
  });
};

export const CardContent: React.FC<CardContentProps> = ({
  children,
  style,
  testID,
}) => {
  const theme = useTheme();
  const styles = getContentStyles(theme);
  return (
    <View style={[styles.content, style]} testID={testID}>
      {children}
    </View>
  );
};

export interface CardMediaProps {
  /** Source for the image */
  source: { uri: string } | number;
  /** Height of the media */
  height?: number;
  /** Additional styles for the media */
  style?: StyleProp<ViewStyle>;
  /** Test ID for testing */
  testID?: string;
}

const getMediaStyles = () => {
  return StyleSheet.create({
    media: {
      width: "100%",
      overflow: "hidden",
    },
    image: {
      width: "100%",
      height: "100%",
      resizeMode: "cover",
    },
  });
};

export const CardMedia: React.FC<CardMediaProps> = ({
  source,
  height = 200,
  style,
  testID,
}) => {
  const styles = getMediaStyles();
  return (
    <View style={[styles.media, { height }, style]} testID={testID}>
      <Image source={source} style={styles.image} />
    </View>
  );
};

export interface CardHeaderProps {
  /** Title text */
  title: string;
  /** Subtitle text */
  subtitle?: string;
  /** Left avatar or icon */
  left?: React.ReactNode;
  /** Right action component */
  right?: React.ReactNode;
  /** Additional styles for the header */
  style?: StyleProp<ViewStyle>;
}

const getHeaderStyles = (theme: ReturnType<typeof useTheme>) => {
  return StyleSheet.create({
    header: {
      flexDirection: "row",
      alignItems: "center",
      padding: theme.spacing.md,
    },
    headerLeft: {
      marginRight: theme.spacing.sm,
    },
    headerContent: {
      flex: 1,
    },
    headerRight: {
      marginLeft: theme.spacing.sm,
    },
    title: {
      fontFamily: theme.typography.fontFamily.primary,
      fontSize: theme.typography.sizes.medium,
      fontWeight: theme.typography.fontWeight.bold as "normal",
      color: theme.colors.text.primary,
    },
    subtitle: {
      fontFamily: theme.typography.fontFamily.primary,
      fontSize: theme.typography.sizes.small,
      color: theme.colors.text.secondary,
      marginTop: theme.spacing.xs,
    },
  });
};

export const CardHeader: React.FC<CardHeaderProps> = ({
  title,
  subtitle,
  left,
  right,
  style,
}) => {
  const theme = useTheme();
  const styles = getHeaderStyles(theme);
  return (
    <View style={[styles.header, style]}>
      {left && <View style={styles.headerLeft}>{left}</View>}
      <View style={styles.headerContent}>
        <Text style={styles.title}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>
      {right && <View style={styles.headerRight}>{right}</View>}
    </View>
  );
};

export interface CardActionsProps {
  /** Action buttons or components */
  children: React.ReactNode;
  /** Additional styles for the actions */
  style?: StyleProp<ViewStyle>;
  /** Test ID for testing */
  testID?: string;
}

const getActionsStyles = (theme: ReturnType<typeof useTheme>) => {
  return StyleSheet.create({
    actions: {
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
      padding: theme.spacing.md,
      borderTopWidth: 1,
      borderTopColor: theme.colors.neutral.gray200,
    },
  });
};

export const CardActions: React.FC<CardActionsProps> = ({
  children,
  style,
  testID,
}) => {
  const theme = useTheme();
  const styles = getActionsStyles(theme);
  return (
    <View style={[styles.actions, style]} testID={testID}>
      {children}
    </View>
  );
};
