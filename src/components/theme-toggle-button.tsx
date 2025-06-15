
"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/context/theme-context";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from 'react';

export function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme(); // `theme` here will be defaultTheme on SSR and initial client render
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    // Render a consistent placeholder on server and initial client render.
    // This content must NOT depend on the theme from useTheme() directly.
    return (
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full"
        aria-label="Toggle theme" // Generic ARIA label
        disabled // Keep it disabled until fully interactive
      >
        <span className="h-6 w-6" /> {/* Placeholder icon to maintain size */}
        <span className="sr-only">Toggle theme</span>
      </Button>
    );
  }

  // Now that this component is mounted, we can safely use the `theme` value from context
  // which itself would have stabilized after ThemeProvider mounted.
  const iconToRender = theme === "light" ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />;
  const ariaLabelToSet = theme === "light" ? "Switch to dark mode" : "Switch to light mode";

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="rounded-full"
      aria-label={ariaLabelToSet}
    >
      {iconToRender}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}

