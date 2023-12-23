import { themes } from "../themes";

export function getStyle(): string {
  return `${themes
    .map((theme) => {
      return `
      [data-theme="${theme.id}"] {
        --bg-primary: ${theme.bgPrimary};
        --bg-secondary: ${theme.bgSecondary};
        --text-primary: ${theme.textPrimary};
        --text-secondary: ${theme.textSecondary};
        --accent-primary: ${theme.accentPrimary};
        --accent-secondary: ${theme.accentSecondary};
      }
    `.replace(/\s/g, "");
    })
    .join("")}`;
}

export function updateTheme(): void {
  document.documentElement.dataset.theme =
    localStorage.getItem("theme") ?? getDefaultTheme();
}

updateTheme();
window.addEventListener("storage", updateTheme);

export function setTheme(id: string): void {
  localStorage.setItem("theme", id);
  updateTheme();
}

export function getTheme(): Theme {
  return themes.find(
    (x) => x.id === (localStorage.getItem("theme") ?? getDefaultTheme())
  )!;
}

function getDefaultTheme(): string {
  const date = new Date();
  const month = date.getMonth();
  const day = date.getDate();

  if (month === 11 && day >= 20 && day <= 25) {
    return "christmas";
  }

  return "dark";
}
