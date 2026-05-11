import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0c0c0c",
        surface: "#141414",
        surface2: "#1a1a1a",
        surface3: "#202020",
        border: "#222222",
        border2: "#2a2a2a",
        "text-primary": "#f0f0f0",
        "text-secondary": "#c0c0c0",
        "text-muted": "#777777",
        "text-dim": "#444444",
        "text-ghost": "#2e2e2e",
        accent: "#C4748A",
        "accent-dim": "rgba(196,116,138,0.12)",
        "accent-hover": "#B5647A",
        "nav-border": "#1e1e1e",
        "pill-border": "#333333",
        logo: "#d0d0d0",
        ok: "#3d9a5c",
      },
      fontFamily: {
        serif: ['Georgia', '"Times New Roman"', "Times", "serif"],
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          "Helvetica Neue",
          "sans-serif",
        ],
      },
      letterSpacing: {
        label: "0.14em",
        headline: "-0.025em",
      },
      fontSize: {
        label: ["11px", { lineHeight: "1.4" }],
        nav: ["13px", { lineHeight: "1.4" }],
        body: ["15px", { lineHeight: "1.75" }],
        hero: ["17px", { lineHeight: "1.75" }],
      },
    },
  },
  plugins: [],
};
export default config;
