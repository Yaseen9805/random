"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}

export const ThemeProvider = ({
  children,
  defaultTheme = 'light',
  storageKey = 'lumina-health-ui-theme',
}: ThemeProviderProps) => {
  const [theme, setThemeState] = useState<Theme>(defaultTheme); // Initialize with defaultTheme
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Only read from localStorage after the component has mounted on the client
    try {
      const storedTheme = window.localStorage.getItem(storageKey) as Theme | null;
      if (storedTheme && (storedTheme === 'light' || storedTheme === 'dark')) {
        setThemeState(storedTheme);
      }
    } catch (e) {
      console.error('Failed to read theme from localStorage', e);
    }
  }, [storageKey]); // storageKey is stable, so this effect runs once on mount

  useEffect(() => {
    if (isMounted) { // Guard DOM manipulation and localStorage writes
      const root = window.document.documentElement;
      root.classList.remove('light', 'dark');
      root.classList.add(theme); // Apply the current theme
      try {
        localStorage.setItem(storageKey, theme);
      } catch (e) {
        console.error('Failed to save theme to localStorage', e);
      }
    }
  }, [theme, isMounted, storageKey]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  const toggleTheme = () => {
    setThemeState((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };
  
  // Determine the theme value to provide to consumers.
  // On server and initial client render (before isMounted=true in *this* provider), it's defaultTheme.
  // After this provider mounts and potentially updates `theme` from localStorage, it will be the up-to-date `theme`.
  const effectiveTheme = isMounted ? theme : defaultTheme;

  const contextValue = {
    theme: effectiveTheme, // Provide the potentially deferred theme
    setTheme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

