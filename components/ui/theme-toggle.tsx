"use client";

import { Moon, Sun } from "@wiggle/icons-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="flex items-center justify-center pt-px w-5 h-5 cursor-pointer"
      aria-label="Toggle theme"
    >
      <span className="hidden dark:block">
        <Sun size={20} />
      </span>
      <span className="block dark:hidden">
        <Moon size={20} />
      </span>
    </button>
  );
}
