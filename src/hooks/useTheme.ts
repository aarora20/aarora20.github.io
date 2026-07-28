import { useCallback, useEffect, useState } from "react";

type Theme = "light" | "dark";

function getInitial(): Theme {
  if (typeof document !== "undefined") {
    return document.documentElement.classList.contains("dark")
      ? "dark"
      : "light";
  }
  return "dark";
}

/**
 * Single source of truth for light/dark. The initial class is set by an
 * inline script in index.html (prevents a flash), so we read from the DOM
 * and keep it in sync here.
 */
export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(getInitial);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    try {
      localStorage.setItem("theme", theme);
    } catch {
      /* ignore storage failures (private mode, etc.) */
    }
  }, [theme]);

  const setTheme = useCallback((next: Theme) => setThemeState(next), []);
  const toggle = useCallback(
    () => setThemeState((t) => (t === "dark" ? "light" : "dark")),
    []
  );

  return { theme, setTheme, toggle };
}

export type { Theme };
