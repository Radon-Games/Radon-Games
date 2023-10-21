type Game = {
  title: string;
  author: string;
  description: string;
  id: string;
  tags: string[];
  type: "flash" | "html" | "unity" | "emulator";
} & {
  type: "emulator";
  emulator: string;
};

interface ThemeCategory {
  /** Display name of category */
  name: string;
  /** Category ID, used to categorize themes */
  id: string;
}

interface Theme {
  /** Name of theme */
  name: string;
  /** Theme category */
  category: string;
  /** Unique theme identifier */
  id: string;
  /** Main body background color */
  bgPrimary: string;
  /** Secondary background color used for buttons and gradiants */
  bgSecondary: string;
  /** Main text color, should have good contrast with background colors and secondary accent color */
  textPrimary: string;
  /** Secondary text color, mostly used for borders */
  textSecondary: string;
  /** Main accent color, changes the logo colors */
  accentPrimary: string;
  /** Secondary accent color, changes button and banner colors */
  accentSecondary: string;
}
