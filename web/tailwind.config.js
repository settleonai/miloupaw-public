module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          default: "#202359",
          dark: "#202359",
          light: "#0070f3",
          100: "#C9CAE0",
          200: "#5E6098",
          300: "#40437E",
          400: "#483B64",
          700: "#0A0C2B",
        },
        secondary: {
          default: "#F2A649",
          dark: "#F2A649",
          light: "#F2A649",
          100: "#FFF8F0",
        },
        tertiary: {
          default: "#483B64",
          dark: "#483B64",
          light: "#483B64",
        },
      },
      fontFamily: {
        display: ["Poppins", "sans-serif"],
        mono: ["Roboto Mono", "monospace"],
        body: ["Roboto", "sans-serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};