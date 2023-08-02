/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    colors: {
      background: "var(--background)",
      "background-secondary": "var(--background-secondary)",
      accent: "var(--accent)",
      "text-secondary": "var(--text-secondary)",
      text: "var(--text)"
    }
  },
  plugins: []
};
