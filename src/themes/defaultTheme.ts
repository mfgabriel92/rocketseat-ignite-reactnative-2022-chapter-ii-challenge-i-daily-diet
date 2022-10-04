import { extendTheme } from "native-base";

const defaultTheme = extendTheme({
  colors: {
    gray: {
      100: "#FAFAFA",
      200: "#EFF0F0",
      300: "#DDDEDF",
      400: "#B9BBBC",
      500: "#5C6265",
      600: "#333638",
      700: "#1B1D1E",
    },
    red: {
      100: "#F4E6E7",
      300: "#F3BABD",
      500: "#BF3B44",
    },
    green: {
      100: "#E5F0DB",
      300: "#CBE4B4",
      500: "#639339",
    },
    white: "#FFFFFF",
  },
  fonts: {
    heading: "NunitoSans_700Bold",
    body: "NunitoSans_400Regular",
  },
  lineHeights: {
    xs: "1.3rem",
    sm: "1.3rem",
    md: "1.3rem",
    lg: "1.3rem",
    xl: "1.3rem",
    "2xl": "1.3rem",
  },
  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 24,
    "2xl": 32,
  },
});

export { defaultTheme };
