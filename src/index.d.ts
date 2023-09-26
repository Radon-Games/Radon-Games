interface Game {
  title: string;
  author: string;
  description: string;
  cover: string;
  id: string;
  tags: string[];
  type: string;
  source: string;
}

interface ThemeCategory {
  name: string;
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
