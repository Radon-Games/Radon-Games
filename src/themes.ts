const categories = [
  {
    name: "Default",
    id: "default"
  },
  {
    name: "Catppuccin",
    id: "catppuccin"
  },
  {
    name: "People",
    id: "people"
  }
];

const themes = [
  {
    name: "Default Dark",
    category: "default",
    id: "default",
    dark: true,
    background: "#111827",
    backgroundSecondary: "#1f2937",
    text: "#f3f4f6",
    textSecondary: "#e5e7eb",
    accent: "#f59e0b"
  },
  {
    name: "Default Light",
    category: "default",
    id: "light",
    dark: false,
    background: "#f3f4f6",
    backgroundSecondary: "#e5e7eb",
    text: "#111827",
    textSecondary: "#1f2937",
    accent: "#f59e0b"
  },
  {
    name: "Catppuccin Latte",
    category: "catppuccin",
    id: "latte",
    dark: false,
    background: "#dce0e8",
    backgroundSecondary: "#eff1f5",
    text: "#4c4f69",
    textSecondary: "#6c6f85",
    accent: "#df8e1d"
  },
  {
    name: "Catppuccin Frappé",
    category: "catppuccin",
    id: "frappe",
    dark: true,
    background: "#232634",
    backgroundSecondary: "#303446",
    text: "#c6d0f5",
    textSecondary: "#a5adce",
    accent: "#df8e1d"
  },
  {
    name: "Catppuccin Macchiato",
    category: "catppuccin",
    id: "macchiato",
    dark: true,
    background: "#181926",
    backgroundSecondary: "#24273a",
    text: "#cad3f5",
    textSecondary: "#a5adcb",
    accent: "#eed49f"
  },
  {
    name: "Catppuccin Mocha",
    category: "catppuccin",
    id: "mocha",
    dark: true,
    background: "#11111b",
    backgroundSecondary: "#1e1e2e",
    text: "#cdd6f4",
    textSecondary: "#a6adc8",
    accent: "#f9e2af"
  },
  {
    name: "Cohen",
    category: "people",
    id: "cohen",
    dark: true,
    background: "#0a0f14",
    backgroundSecondary: "#131a21",
    text: "#fffcf2",
    textSecondary: "#ccc5b9",
    accent: "#e65a45"
  },
  {
    name: "Riftriot",
    category: "people",
    id: "riftriot",
    dark: true,
    background: "#000",
    backgroundSecondary: "#301934",
    text: "#fff",
    textSecondary: "#fefe",
    accent: "#800080"
  }
];

export { categories };
export default themes;
