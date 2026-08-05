"use client";

import { useCallback, useEffect, useState } from "react";
import {
  applyTheme,
  loadTheme,
  saveTheme,
  type ThemeId,
} from "../lib/theme";

export function useTheme() {
  const [theme, setThemeState] = useState<ThemeId>("default");

  useEffect(() => {
    const stored = loadTheme();
    setThemeState(stored);
    applyTheme(stored);
  }, []);

  const setTheme = useCallback((nextTheme: ThemeId) => {
    setThemeState(nextTheme);
    applyTheme(nextTheme);
    saveTheme(nextTheme);
  }, []);

  return { theme, setTheme };
}
