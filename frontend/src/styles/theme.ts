export const colors = {
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
};

export const spacing = {
  xs: "0.5rem",
  sm: "0.75rem",
  md: "1rem",
  lg: "1.5rem",
  xl: "2rem",
  "2xl": "3rem",
};

export const borderRadius = {
  sm: "0.25rem",
  md: "0.5rem",
  lg: "0.75rem",
  xl: "1rem",
  full: "9999px",
};

export const fontSize = {
  xs: "0.75rem",
  sm: "0.875rem",
  base: "1rem",
  lg: "1.125rem",
  xl: "1.25rem",
  "2xl": "1.5rem",
  "3xl": "1.875rem",
  "4xl": "2.25rem",
};

/* Gradients */
export const gradients = {
  primary: "linear-gradient(135deg, #06b6d4 0%, #0ea5e9 100%)",
  secondary: "linear-gradient(135deg, #8b5cf6 0%, #d946ef 100%)",
  accent: "linear-gradient(135deg, #0284c7 0%, #7c3aed 100%)",
  warm: "linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)",
  cool: "linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)",
  hero: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)",
  glass:
    "linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))",
};

/* Shadows with glow effects */
export const shadows = {
  sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
  md: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
  lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
  glass: "0 8px 32px 0 rgba(31, 38, 135, 0.1)",
  glow: "0 0 20px -5px currentColor",
  "glow-primary": "0 0 30px -5px rgba(6, 182, 212, 0.3)",
  "glow-accent": "0 0 30px -5px rgba(139, 92, 246, 0.3)",
  elevated:
    "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
};

/* Animation configurations */
export const animations = {
  transitions: {
    fast: "150ms cubic-bezier(0.4, 0, 0.2, 1)",
    base: "200ms cubic-bezier(0.4, 0, 0.2, 1)",
    slow: "300ms cubic-bezier(0.4, 0, 0.2, 1)",
  },
  easing: {
    easeIn: "cubic-bezier(0.4, 0, 1, 1)",
    easeOut: "cubic-bezier(0, 0, 0.2, 1)",
    easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  },
};
