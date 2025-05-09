
import { createConfig } from "@gluestack-style/react";
import { config } from "@gluestack-ui/config";

const brand = {
  bclBlue: '#146C93',
  bclBgGlay: '#212121',
  bclBgBlue: '#2f3746',
  textBlack: '#18171C',
  borderGray: '#707070',
  inputBorderGray: '#484848',
  inputError: '#FF5CA1',
};

const breakpoints = {
  base: 0,
  sm: 375,
  md: 768,
  lg: 960,
  xl: 1200,
  "2xl": 1536,
};

export const themeConfig = createConfig({
  ...config,
  tokens: {
    ...config.tokens,
    colors: {
      ...config.tokens.colors,
      ...brand
    },
    breakpoints
  }
} as const);