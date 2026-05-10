import React from 'react';
import { ThemeProvider } from '@/components/layout/theme-provider';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `!(function(){try{var t=localStorage.getItem("mba-portfolio-theme"),e=window.matchMedia("(prefers-color-scheme: dark)").matches;"dark"===t||!t&&e?document.documentElement.classList.add("dark"):document.documentElement.classList.remove("dark")}catch(t){}})();`
          }}
        />
      </head>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
