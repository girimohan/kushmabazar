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
        // Nepali flag-inspired palette
        brand: {
          blue: "#003893",
          "blue-light": "#0050CC",
          "blue-dark": "#002660",
          red: "#DC143C",
          "red-light": "#F5315A",
          "red-dark": "#A50E2D",
          green: "#2E8B57",
          "green-light": "#3AAD6D",
          "green-dark": "#1E6B40",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          muted: "#F8F9FC",
          subtle: "#F1F3F9",
          border: "#E2E8F4",
        },
        ink: {
          DEFAULT: "#0F172A",
          muted: "#475569",
          subtle: "#94A3B8",
        },
      },
      fontFamily: {
        sans: ["var(--font-plus-jakarta)", "system-ui", "sans-serif"],
        display: ["var(--font-playfair)", "Georgia", "serif"],
        nepali: ["'Noto Sans Devanagari'", "sans-serif"],
      },
      boxShadow: {
        card: "0 2px 8px 0 rgba(0,56,147,0.08), 0 1px 2px 0 rgba(0,56,147,0.04)",
        "card-hover":
          "0 8px 24px 0 rgba(0,56,147,0.14), 0 2px 8px 0 rgba(0,56,147,0.08)",
        nav: "0 1px 0 0 rgba(0,56,147,0.08)",
      },
      backgroundImage: {
        "hero-pattern":
          "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(0,56,147,0.12) 0%, transparent 70%)",
        "card-gradient":
          "linear-gradient(135deg, rgba(0,56,147,0.04) 0%, rgba(46,139,87,0.04) 100%)",
      },
    },
  },
  plugins: [],
};
export default config;
