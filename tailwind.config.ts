import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f8f6f3",
          100: "#efe9e0",
          200: "#ddd2c0",
          300: "#c7b49a",
          400: "#b09474",
          500: "#9a7858",
          600: "#846248",
          700: "#6b4f3c",
          800: "#584234",
          900: "#4a382d",
          950: "#281d17",
        },
        background: "var(--background)",
        foreground: "var(--foreground)",
        muted: "var(--muted)",
        "muted-foreground": "var(--muted-foreground)",
        border: "var(--border)",
        hover: "var(--hover)",
        surface: {
          DEFAULT: "var(--surface)",
          elevated: "var(--surface-elevated)",
          card: "var(--surface-card)",
          border: "var(--border)",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-playfair)", "Georgia", "serif"],
      },
      boxShadow: {
        soft: "var(--shadow-soft)",
        card: "var(--shadow-card)",
        premium: "var(--shadow-premium)",
        float: "var(--shadow-float)",
        glow: "var(--shadow-glow)",
        header: "var(--shadow-header)",
        drawer: "var(--shadow-drawer)",
        badge: "var(--shadow-badge)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "hero-glow": "var(--hero-glow)",
        "card-shine": "var(--card-shine)",
      },
      animation: {
        shimmer: "shimmer 2.5s infinite",
        float: "float 6s ease-in-out infinite",
        marquee: "marquee 40s linear infinite",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
