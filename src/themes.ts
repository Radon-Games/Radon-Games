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
    name: "Proxies",
    id: "proxies"
  },
  {
    name: "People",
    id: "people"
  },
  {
    name: "Holiday",
    id: "holiday"
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
  },
  {
    name: "Nebelung",
    category: "people",
    id: "nebelung",
    bgPrimary: "#dabc9a",
    bgSecondary: "#b18a5d",
    textPrimary: "#190f05",
    textSecondary: "#190f05",
    accentPrimary: "#ff7100",
    accentSecondary: "#ff7100"
  },
  {
    name: "Cobalt",
    category: "proxies",
    id: "cobalt",
    bgPrimary: "#030303",
    bgSecondary: "#09283e",
    textPrimary: "white",
    textSecondary: "white",
    accentPrimary: "#1c7ec4",
    accentSecondary: "#09283e"
  },
  {
    name: "Metallic",
    category: "proxies",
    id: "metallic",
    bgPrimary: "#171717",
    bgSecondary: "#004953",
    textPrimary: "white",
    textSecondary: "white",
    accentPrimary: "#004953",
    accentSecondary: "#004953"
  },
  {
    name: "Tsunami",
    category: "proxies",
    id: "tsunami",
    bgPrimary: "#121212",
    bgSecondary: "#2493ff",
    textPrimary: "white",
    textSecondary: "white",
    accentPrimary: "#2493ff",
    accentSecondary: "#2493ff"
  },
  {
    name: "3kh0",
    category: "proxies",
    id: "echo",
    bgPrimary: "#1c1c1c",
    bgSecondary: "#4caf50",
    textPrimary: "white",
    textSecondary: "white",
    accentPrimary: "#4caf50",
    accentSecondary: "#4caf50"
  },
  {
    name: "Molten",
    category: "proxies",
    id: "molten",
    bgPrimary: "#030303",
    bgSecondary: "#ff3d3d",
    textPrimary: "white",
    textSecondary: "white",
    accentPrimary: "#ff6868",
    accentSecondary: "#ff6868"
  },
  {
    name: "Pod",
    category: "default",
    id: "pod",
    bgPrimary: "#161616",
    bgSecondary: "#ffb703",
    textPrimary: "white",
    textSecondary: "white",
    accentPrimary: "#ffb703",
    accentSecondary: "#ffb703"
  },
  {
    name: "Christmas",
    category: "holiday",
    id: "christmas",
    bgPrimary: "#031C0E",
    bgSecondary: "#0A522A",
    textPrimary: "#ffffff",
    textSecondary: "#ffffff",
    accentPrimary: "#F24343",
    accentSecondary: "#C1B613"
  }
] as Theme[];

export { categories, themes };
