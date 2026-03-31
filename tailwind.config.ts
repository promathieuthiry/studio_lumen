import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: "#030303",
          elevated: "#0A0A0A",
          light: "#F8F8F8",
          warm: "#F1EFEB",
        },
        text: {
          DEFAULT: "#FFFFFF",
          muted: "#C2C2C2",
          dark: "#030303",
          body: "#7A7A7A",
        },
        accent: {
          DEFAULT: "#61CE70",
        },
        "accent-blue": "#6EC1E4",
        border: {
          light: "#FFFFFF26",
          lighter: "#FFFFFF1A",
          warm: "#F8F8F81A",
        },
        overlay: "#03030326",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        poppins: ["var(--font-poppins)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "Roboto", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Roboto Slab", "serif"],
      },
      maxWidth: {
        container: "1770px",
      },
      borderRadius: {
        pill: "9999px",
      },
      keyframes: {
        heartbeat: {
          "0%, 100%": { transform: "scale(1)" },
          "14%": { transform: "scale(1.3)" },
          "28%": { transform: "scale(1)" },
          "42%": { transform: "scale(1.3)" },
          "70%": { transform: "scale(1)" },
        },
      },
      animation: {
        heartbeat: "heartbeat 1.5s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
