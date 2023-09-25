import { themes } from "../themes";

export function getStyle(): string {
  return `${themes.map((theme) => {
    return `
      html[data-theme="${theme.id}"] {
        --bg-primary: ${theme.bgPrimary};
        --bg-secondary: ${theme.bgSecondary};
        --text-primary: ${theme.textPrimary};
        --text-secondary: ${theme.textSecondary};
        --accent-primary: ${theme.accentPrimary};
        --accent-secondary: ${theme.accentSecondary};
      }
    `;
  })}`.replace(/\s/g, "");
}
