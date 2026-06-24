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
        // Galerie Blanc — quiet luxury, viel Weiss, Signatur-Petrol
        deep: "#1C1B18", // ink (nur Text)
        midnight: "#0C3A40", // deep petrol (dunkle Sektionen: CTA + Footer)
        terra: "#136B73", // Signatur-Petrol (Akzent, Eyebrows, Buttons)
        "terra-light": "#0E565D", // Petrol Hover
        petrol: "#136B73",
        "petrol-deep": "#0C3A40",
        stone: "#A89B8C", // taupe (Akzent auf Petrol, Platzhalter)
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
