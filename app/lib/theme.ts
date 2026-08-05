export type ThemeId = "default" | "monochrome";

export interface ThemeOption {
  id: ThemeId;
  label: string;
  description: string;
}

export const THEMES: ThemeOption[] = [
  {
    id: "default",
    label: "Default",
    description: "Green & purple",
  },
  {
    id: "monochrome",
    label: "Dark & White",
    description: "White & black",
  },
];

export const THEME_PREVIEW_COLORS: Record<
  ThemeId,
  { primary: string; secondary: string }
> = {
  default: {
    primary: "rgb(0, 255, 208)",
    secondary: "rgb(191, 0, 255)",
  },
  monochrome: {
    primary: "rgb(255, 255, 255)",
    secondary: "rgb(0, 0, 0)",
  },
};

const STORAGE_KEY = "syntaxly-theme";
const EXPIRY_MS = 30 * 24 * 60 * 60 * 1000;

interface StoredTheme {
  theme: ThemeId;
  expiresAt: number;
}

export function isThemeId(value: unknown): value is ThemeId {
  return value === "default" || value === "monochrome";
}

export function loadTheme(): ThemeId {
  if (typeof window === "undefined") return "default";

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return "default";

    const parsed = JSON.parse(raw) as StoredTheme;
    if (!isThemeId(parsed.theme) || typeof parsed.expiresAt !== "number") {
      localStorage.removeItem(STORAGE_KEY);
      return "default";
    }

    if (Date.now() > parsed.expiresAt) {
      localStorage.removeItem(STORAGE_KEY);
      return "default";
    }

    return parsed.theme;
  } catch {
    localStorage.removeItem(STORAGE_KEY);
    return "default";
  }
}

export function saveTheme(theme: ThemeId): void {
  const stored: StoredTheme = {
    theme,
    expiresAt: Date.now() + EXPIRY_MS,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
}

export function applyTheme(theme: ThemeId): void {
  document.documentElement.dataset.theme = theme;
}
