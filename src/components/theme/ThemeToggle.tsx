"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, mounted, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      aria-label={isDark ? "Включить светлую тему" : "Включить тёмную тему"}
      onClick={toggleTheme}
      className={cn(
        "relative flex h-10 w-10 items-center justify-center rounded-xl border border-transparent",
        "text-muted hover:text-foreground hover:bg-hover hover:border-border transition-all",
        className
      )}
    >
      {!mounted ? (
        <span className="h-5 w-5 rounded-full bg-hover animate-pulse" />
      ) : isDark ? (
        <Sun className="h-5 w-5 text-brand-400" />
      ) : (
        <Moon className="h-5 w-5 text-brand-600" />
      )}
    </button>
  );
}
