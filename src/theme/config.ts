// stitches.config.ts
import { createStitches } from "@stitches/react";
import {
  colors,
  fontSizes,
  fontWeights,
  fonts,
  lineHeights,
  medias,
  radii,
  space,
} from "./tokens";
export const {
  styled,
  css,
  globalCss,
  keyframes,
  getCssText,
  theme,
  createTheme,
  config,
} = createStitches({
  theme: {
    colors,
    fontSizes,
    fontWeights,
    fonts,
    lineHeights,
    medias,
    radii,
    space,
  },
  media: {
    bp1: "(min-width: 480px)",
  },
});