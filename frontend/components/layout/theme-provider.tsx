'use client';

import React, { createContext, useContext } from 'react';
import { useTheme } from '@/hooks/use-theme';
import { ThemeHookReturn } from '@/types';

const ThemeContext = createContext<ThemeHookReturn | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const themeValue = useTheme();
  return (
    <ThemeContext.Provider value={themeValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useThemeContext must be used within ThemeProvider');
  return context;
};
