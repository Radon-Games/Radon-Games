import preferences from "../preferences";

const themes: any[] = preferences.themes;

export function getStyle(): string {
	return `${themes
		.map((theme: any) => {
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
	if (typeof document !== "undefined") {
		document.documentElement.dataset.theme =
			preferences.manager.getPreference("theme", getDefaultTheme());
	}
}

if (typeof window !== "undefined") {
	window.addEventListener("storage", updateTheme);
}

preferences.manager.applyPreferences();

export function setTheme(id: string): void {
	preferences.manager.handlePreferenceChange("theme", id);
	updateTheme();
}

export function getTheme(): any {
	return themes.find(
		(x: any) =>
			x.id ===
			(preferences.manager.getPreference("theme", getDefaultTheme()) ||
				getDefaultTheme())
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