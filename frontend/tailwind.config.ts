import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Clash Display", ...defaultTheme.fontFamily.sans],
        body: ["Satoshi", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: "#06B6D4", // Cyan
        secondary: "#8B5CF6", // Violet
        background: "#F8FAFC", // Near-white
        text: "#0F172A", // Slate-900
      },
      spacing: {
        xs: "4px",
        sm: "8px",
        md: "12px",
        lg: "16px",
        xl: "24px",
        "2xl": "32px",
      },
      borderRadius: {
        button: "12px",
        card: "8px",
      },
      boxShadow: {
        focus: "0 0 0 3px rgba(6, 182, 212, 0.3)",
        elevation: "0 4px 6px rgba(0, 0, 0, 0.07)",
      },
    },
  },
  plugins: [],
} satisfies Config;
