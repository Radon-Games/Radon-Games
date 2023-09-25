const categories = [
  {
    name: "Default",
    id: "default"
  }
] as const;

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
  }
] as const;

export { categories, themes };
