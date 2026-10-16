import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "var(--text)",
        muted: "var(--secondary)",
        line: "var(--border)",
        paper: "var(--surface)",
        mist: "#edf3f8",
        brand: {
          DEFAULT: "var(--accent)",
          deep: "var(--navy)",
          soft: "#edf3f8",
          bright: "var(--accent)",
        },
      },
      boxShadow: {
        soft: "0 16px 40px rgba(16, 43, 70, 0.08)",
      },
      fontFamily: {
        sans: ["var(--font-site)"],
      },
    },
  },
  plugins: [],
};

export default config;
