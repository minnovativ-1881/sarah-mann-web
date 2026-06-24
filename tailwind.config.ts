import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Galerie Blanc — quiet luxury, viel Weiss
        deep: "#1C1B18", // ink / dark closing sections
        midnight: "#141310", // deepest (footer)
        terra: "#4A4F3C", // olive accent (auf hellem Grund)
        "terra-light": "#5E6349", // olive hover
        stone: "#A89B8C", // taupe (Akzent auf dunklem Grund, Platzhalter)
        cream: "#FFFFFF", // gallery white (Haupt-Hintergrund)
        "cream-dark": "#F6F4EF", // warmweiss (alternierende Sektionen)
        "cream-mid": "#E7E4DE", // Haarlinien / zarte Ziffern
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-jost)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "8xl": ["6rem", { lineHeight: "1.05" }],
        "9xl": ["8rem", { lineHeight: "1" }],
        "10xl": ["10rem", { lineHeight: "0.95" }],
      },
      letterSpacing: {
        widest: "0.25em",
      },
      animation: {
        "fade-up": "fadeUp 0.7s ease-out forwards",
        "fade-in": "fadeIn 0.5s ease-out forwards",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
