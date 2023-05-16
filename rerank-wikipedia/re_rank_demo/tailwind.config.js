/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./ui/**/*.{html,js}"],
  plugins: [],
  theme: {
    screens: {
      lg: { max: "1040px" },
      md: { max: "768px" },
      sm: { max: "480px" },
      xs: { max: "414px" },
    },
    colors: {
      transparent: "transparent",
      black: "#212121",
      white: "#FAFAFA",
      purewhite: "#FFFFFF",
      // Marble white
      marble: {
        500: "#BDBDBD",
        400: "#E0E0E0",
        300: "#EEEEEE",
        200: "#F5F5F5",
        100: "#FAFAFA",
      },
      // Volcanic black
      volcanic: {
        900: "#212121",
        800: "#424242",
        700: "#616161",
        600: "#757575",
        500: "#9E9E9E",
      },
      // Coniferous green
      green: {
        900: "#16211C",
        800: "#2B4239",
        700: "#39594D",
        600: "#556F65",
        500: "#71867E",
        400: "#869790",
        300: "#9DAAA4",
        200: "#B2BBB6",
        100: "#D4D9D4",
        50: "#EEF0EF",
      },
      // Simulated Coral
      coral: {
        900: "#511D12",
        700: "#CA492D",
        500: "#FF7759",
        300: "#FFAD9B",
        200: "#F8C8BC",
        100: "#F6DDD5",
        50: "#FDF2F0",
      },
      // Synthetic Quartz
      quartz: {
        900: "#3E2644",
        700: "#9B60AA",
        600: "#B576C5",
        500: "#D18EE2",
        300: "#E8C3F0",
        200: "#EAD0F0",
        100: "#F0DFF3",
        50: "#F8F1F9",
      },
      // Acrylic Blue
      blue: {
        900: "#121E4A",
        700: "#2D4CB9",
        500: "#4C6EE6",
        300: "#A9B9F3",
        200: "#C0CAEF",
        100: "#DBE0F2",
        50: "#F0F2FB",
      },
      // Mushroom Gray
      mushroom: {
        900: "#39352E",
        700: "#8E8572",
        500: "#AFA694",
        300: "#D7CFC1",
        200: "#E4DED2",
        100: "#E9E6DE",
        50: "#F5F4F2",
      },
      // Safety Green
      success: {
        500: "#05690D",
        200: "#C3DBC5",
        50: "#EFF5EA",
      },
      // Safety Red
      danger: {
        900: "#5A0000",
        500: "#B20000",
        200: "#F0CCCC",
        50: "#FFF1F1",
      },
    },
    fontFamily: {
      body: ["CohereText", ...defaultTheme.fontFamily.sans],
      variable: ["CohereVariable", "Arial", ...defaultTheme.fontFamily.serif],
    },
    extend: {
      backgroundImage: {
        "main-background": "url('../assets/PebblesAndBackground_Rerank.svg')",
        "results-bg": "url('../assets/BackgroundWithCell.svg')",
        "mobile-bg": "url('../assets/Mobile_Pebbles.svg')",
        "mobile-results-bg": "url('../assets/Mobile_Cells.svg')",
      },
      maxHeight: {
        "mb-res": "750px",
        "sm-mb": "400px",
        "xs-mb": "360px",
      },
    },
  },
};
