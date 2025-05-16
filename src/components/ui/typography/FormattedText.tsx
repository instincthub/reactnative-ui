import { Text, TextStyle } from "react-native";
import Typography, { TypographyProps } from "./Typography";

/**
 * A segment of text with custom styling
 */
interface TextSegment {
  /** The text content */
  text: string;
  /** Custom styles for this segment */
  style?: TextStyle;
  /** Additional typography props for this segment */
  props?: Partial<TypographyProps>;
}

/**
 * Props for FormattedText component
 */
interface FormattedTextProps extends Omit<TypographyProps, "children"> {
  /** Text segments with different styling */
  segments: TextSegment[];
}

/**
 * Component for rendering text with different styles in a single text block
 */
export const FormattedText: React.FC<FormattedTextProps> = ({
  segments,
  ...typographyProps
}) => {
  return (
    <Typography {...typographyProps}>
      {segments.map((segment, index) => (
        <Text key={index} style={segment.style} {...segment.props}>
          {segment.text}
        </Text>
      ))}
    </Typography>
  );
};

/**
 * Props for HighlightedText component
 */
interface HighlightedTextProps extends TypographyProps {
  /** The text to display */
  text: string;
  /** The text to highlight */
  highlight: string;
  /** Style for highlighted parts */
  highlightStyle?: TextStyle;
  /** Case sensitivity for highlighting */
  caseSensitive?: boolean;
}

/**
 * Component for highlighting parts of text
 */
export const HighlightedText: React.FC<HighlightedTextProps> = ({
  text,
  highlight,
  highlightStyle,
  caseSensitive = false,
  ...typographyProps
}) => {
  if (!highlight.trim()) {
    return <Typography {...typographyProps}>{text}</Typography>;
  }

  const regex = new RegExp(`(${highlight})`, caseSensitive ? "" : "i");
  const parts = text.split(regex);

  return (
    <Typography {...typographyProps}>
      {parts.map((part, i) => {
        const isHighlighted = part.match(regex);
        return isHighlighted ? (
          <Text key={i} style={highlightStyle}>
            {part}
          </Text>
        ) : (
          part
        );
      })}
    </Typography>
  );
};
