'use client';

import { useState, useEffect, useCallback } from 'react';
import { Theme, ThemeHookReturn } from '@/types';

const STORAGE_KEY = 'mba-portfolio-theme';

export const useTheme = (): ThemeHookReturn => {
  const [theme, setTheme] = useState<Theme | undefined>(undefined);

  // Initial load
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
    if (stored === 'dark' || stored === 'light') {
      setTheme(stored);
    } else if (typeof window !== 'undefined' && window.matchMedia) {
      const system = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      setTheme(system);
    } else {
      setTheme('dark'); // Default to dark per Constitution
    }

    // Listen for OS changes
    if (typeof window !== 'undefined' && window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = (e: MediaQueryListEvent) => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (!stored) {
          setTheme(e.matches ? 'dark' : 'light');
        }
      };

      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, []);

  // S1: Centralized Sync
  useEffect(() => {
    if (theme) {
      document.documentElement.classList.toggle('dark', theme === 'dark');
    }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme(prev => {
      const next = prev === 'dark' ? 'light' : 'dark';
      localStorage.setItem(STORAGE_KEY, next);
      return next;
    });
  }, []);

  return {
    theme,
    isDark: theme === 'dark',
    toggleTheme
  };
};
