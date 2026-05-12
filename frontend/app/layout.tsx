import React from 'react';
import type { Metadata } from 'next';
import { JetBrains_Mono, Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/layout/theme-provider';
import { Navbar, Footer } from '@/components/layout';
import './globals.css';

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-mono',
  display: 'swap',
});

const geistSans = Inter({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Mutahir Bin Athar | Portfolio',
  description: 'Software Engineer & AI Enthusiast',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${jetbrainsMono.variable} ${geistSans.variable}`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `!(function(){try{var t=localStorage.getItem("mba-portfolio-theme"),e=window.matchMedia("(prefers-color-scheme: dark)").matches;"dark"===t||!t&&e?document.documentElement.classList.add("dark"):document.documentElement.classList.remove("dark")}catch(t){}})();`,
          }}
        />
      </head>
      <body>
        <ThemeProvider>
          <Navbar />
          <main className="pt-16">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
