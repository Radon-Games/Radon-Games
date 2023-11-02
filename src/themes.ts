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
] as ThemeCategory[];

const themes = [
  {
    name: "Default Dark",
    category: "default",
    id: "dark",
    bgPrimary: "#0f172a",
    bgSecondary: "#1e293b",
    textPrimary: "#f1f5f9",
    textSecondary: "#e2e8f0",
    accentPrimary: "#f59e0b",
    accentSecondary: "#3730a3"
  },
  {
    name: "Default Light",
    category: "default",
    id: "light",
    bgPrimary: "#f1f5f9",
    bgSecondary: "#e2e8f0",
    textPrimary: "#020617",
    textSecondary: "#0f172a",
    accentPrimary: "#f59e0b",
    accentSecondary: "#6366f1"
  },
  {
    name: "Catppuccin Latte",
    category: "catppuccin",
    id: "latte",
    bgPrimary: "#dce0e8",
    bgSecondary: "#eff1f5",
    textPrimary: "#4c4f69",
    textSecondary: "#6c6f85",
    accentPrimary: "#fe640b",
    accentSecondary: "#e64553"
  },
  {
    name: "Catppuccin Frappé",
    category: "catppuccin",
    id: "frappe",
    bgPrimary: "#232634",
    bgSecondary: "#303446",
    textPrimary: "#c6d0f5",
    textSecondary: "#a5adce",
    accentPrimary: "#ef9f76",
    accentSecondary: "#e78284"
  },
  {
    name: "Catppuccin Macchiato",
    category: "catppuccin",
    id: "macchiato",
    bgPrimary: "#181926",
    bgSecondary: "#24273a",
    textPrimary: "#cad3f5",
    textSecondary: "#a5adcb",
    accentPrimary: "#f5a97f",
    accentSecondary: "#ed8796"
  },
  {
    name: "Catppuccin Mocha",
    category: "catppuccin",
    id: "mocha",
    bgPrimary: "#11111b",
    bgSecondary: "#1e1e2e",
    textPrimary: "#cdd6f4",
    textSecondary: "#a6adc8",
    accentPrimary: "#fab387",
    accentSecondary: "#f38ba8"
  },
  {
    name: "Cohen",
    category: "people",
    id: "cohen",
    bgPrimary: "#0a0f14",
    bgSecondary: "#1d2b3a",
    textPrimary: "#fffcf2",
    textSecondary: "#ccc5b9",
    accentPrimary: "#e65a45",
    accentSecondary: "#e65a45"
  }
] as Theme[];

export { categories, themes };
