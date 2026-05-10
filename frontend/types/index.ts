export type Theme = 'dark' | 'light';

export interface ThemeHookReturn {
  theme: Theme | undefined;
  isDark: boolean;
  toggleTheme: () => void;
}
