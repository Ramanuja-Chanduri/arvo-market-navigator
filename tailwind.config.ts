import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        positive: "hsl(var(--positive))",
        negative: "hsl(var(--negative))",
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "orb-1": {
          "0%": { transform: "translate(0, 0) scale(1)", opacity: "0.7" },
          "25%": { transform: "translate(15vw, -10vh) scale(1.1)", opacity: "0.55" },
          "50%": { transform: "translate(-5vw, 20vh) scale(0.95)", opacity: "0.75" },
          "75%": { transform: "translate(-20vw, 5vh) scale(1.05)", opacity: "0.5" },
          "100%": { transform: "translate(0, 0) scale(1)", opacity: "0.7" },
        },
        "orb-2": {
          "0%": { transform: "translate(0, 0) scale(1)", opacity: "0.65" },
          "25%": { transform: "translate(-18vw, 12vh) scale(1.08)", opacity: "0.8" },
          "50%": { transform: "translate(10vw, -8vh) scale(0.9)", opacity: "0.55" },
          "75%": { transform: "translate(12vw, 18vh) scale(1.12)", opacity: "0.7" },
          "100%": { transform: "translate(0, 0) scale(1)", opacity: "0.65" },
        },
        "orb-3": {
          "0%": { transform: "translate(0, 0) scale(1)", opacity: "0.55" },
          "25%": { transform: "translate(20vw, 8vh) scale(0.92)", opacity: "0.7" },
          "50%": { transform: "translate(-12vw, -15vh) scale(1.1)", opacity: "0.6" },
          "75%": { transform: "translate(8vw, -10vh) scale(0.98)", opacity: "0.8" },
          "100%": { transform: "translate(0, 0) scale(1)", opacity: "0.55" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "orb-1": "orb-1 25s ease-in-out infinite",
        "orb-2": "orb-2 30s ease-in-out infinite",
        "orb-3": "orb-3 35s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
