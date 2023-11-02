/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    colors: {
      transparent: "transparent",
      white: "#ffffff",
      black: "#000000",
      "bg-primary": "var(--bg-primary)",
      "bg-secondary": "var(--bg-secondary)",
      "text-primary": "var(--text-primary)",
      "text-secondary": "var(--text-secondary)",
      "accent-primary": "var(--accent-primary)",
      "accent-secondary": "var(--accent-secondary)"
    }
  },
  plugins: []
};
