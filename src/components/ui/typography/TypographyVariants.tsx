import React from "react";
import Typography, { TypographyProps } from "./Typography";

/**
 * H1 heading component
 */
export const H1: React.FC<Omit<TypographyProps, "variant">> = (props) => (
  <Typography variant="h1" {...props} />
);

/**
 * H2 heading component
 */
export const H2: React.FC<Omit<TypographyProps, "variant">> = (props) => (
  <Typography variant="h2" {...props} />
);

/**
 * H3 heading component
 */
export const H3: React.FC<Omit<TypographyProps, "variant">> = (props) => (
  <Typography variant="h3" {...props} />
);

/**
 * H4 heading component
 */
export const H4: React.FC<Omit<TypographyProps, "variant">> = (props) => (
  <Typography variant="h4" {...props} />
);

/**
 * H5 heading component
 */
export const H5: React.FC<Omit<TypographyProps, "variant">> = (props) => (
  <Typography variant="h5" {...props} />
);

/**
 * H6 heading component
 */
export const H6: React.FC<Omit<TypographyProps, "variant">> = (props) => (
  <Typography variant="h6" {...props} />
);

/**
 * Subtitle1 component
 */
export const Subtitle1: React.FC<Omit<TypographyProps, "variant">> = (
  props
) => <Typography variant="subtitle1" {...props} />;

/**
 * Subtitle2 component
 */
export const Subtitle2: React.FC<Omit<TypographyProps, "variant">> = (
  props
) => <Typography variant="subtitle2" {...props} />;

/**
 * Body1 text component
 */
export const Body1: React.FC<Omit<TypographyProps, "variant">> = (props) => (
  <Typography variant="body1" {...props} />
);

/**
 * Body2 text component
 */
export const Body2: React.FC<Omit<TypographyProps, "variant">> = (props) => (
  <Typography variant="body2" {...props} />
);

/**
 * Button text component
 */
export const ButtonText: React.FC<Omit<TypographyProps, "variant">> = (
  props
) => <Typography variant="button" {...props} />;

/**
 * Caption text component
 */
export const Caption: React.FC<Omit<TypographyProps, "variant">> = (props) => (
  <Typography variant="caption" {...props} />
);

/**
 * Overline text component
 */
export const Overline: React.FC<Omit<TypographyProps, "variant">> = (props) => (
  <Typography variant="overline" {...props} />
);
