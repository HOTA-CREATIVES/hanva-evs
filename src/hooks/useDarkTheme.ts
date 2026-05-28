import { useEffect, useState } from "react";

type Theme = "dark" | "light";

export function useDarkTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem("haanav_theme") as Theme;
    // Default to 'dark' for premium, high-end matte black luxury look
    return saved || "dark";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
      root.style.colorScheme = "dark";
    } else {
      root.classList.remove("dark");
      root.style.colorScheme = "light";
    }
    localStorage.setItem("haanav_theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return { theme, toggleTheme, isDark: theme === "dark" };
}
