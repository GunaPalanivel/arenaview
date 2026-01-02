/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0ea5e9",
          600: "#0284c7",
          700: "#0369a1",
          800: "#075985",
          900: "#0c4a6e",
        },
        accent: {
          50: "#fdf4ff",
          100: "#fae8ff",
          200: "#f5d0fe",
          300: "#f0abfc",
          400: "#e879f9",
          500: "#d946ef",
          600: "#c026d3",
          700: "#a21caf",
          800: "#86198f",
          900: "#701a75",
        },
        dark: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
        },
        success: "#10b981",
        warning: "#f59e0b",
        error: "#ef4444",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Clash Display", "sans-serif"],
      },
      borderRadius: {
        button: "0.5rem",
      },
      backgroundImage: {
        "gradient-primary": "linear-gradient(135deg, #06b6d4 0%, #0ea5e9 100%)",
        "gradient-secondary":
          "linear-gradient(135deg, #8b5cf6 0%, #d946ef 100%)",
        "gradient-accent": "linear-gradient(135deg, #0284c7 0%, #7c3aed 100%)",
        "gradient-warm": "linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)",
        "gradient-cool": "linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)",
        "gradient-hero":
          "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)",
        "gradient-glass":
          "linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))",
        "gradient-shimmer":
          "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)",
      },
      backdropBlur: {
        xs: "2px",
      },
      boxShadow: {
        glow: "0 0 20px -5px currentColor",
        "glow-primary": "0 0 30px -5px rgb(6, 182, 212, 0.3)",
        "glow-accent": "0 0 30px -5px rgb(139, 92, 246, 0.3)",
        elevated:
          "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        glass: "0 8px 32px 0 rgba(31, 38, 135, 0.1)",
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-in-out",
        "slide-up": "slideUp 0.3s ease-out",
        shimmer: "shimmer 2s infinite",
        float: "float 3s ease-in-out infinite",
        "glow-pulse": "glowPulse 2s ease-in-out infinite",
        "slide-in-left": "slideInLeft 0.5s ease-out",
        "slide-in-right": "slideInRight 0.5s ease-out",
        "bounce-subtle": "bounceSubtle 2s ease-in-out infinite",
        "scale-in": "scaleIn 0.3s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        glowPulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
        slideInLeft: {
          "0%": { transform: "translateX(-20px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        slideInRight: {
          "0%": { transform: "translateX(20px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        bounceSubtle: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-4px)" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
