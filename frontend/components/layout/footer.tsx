import React from 'react';
import PageWrapper from './page-wrapper';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-6 border-t border-light-border dark:border-dark-border font-mono terminal-sm">
      <PageWrapper className="flex justify-between items-center">
        <span className="text-light-muted dark:text-dark-muted">
          © {currentYear} Mutahir Bin Athar
        </span>
        <a
          href="https://github.com/Mutahir-15"
          target="_blank"
          rel="noopener noreferrer"
          className="text-light-muted dark:text-dark-muted hover:text-light-green dark:hover:text-dark-green transition-colors"
          aria-label="Mutahir's GitHub profile"
        >
          [github]
        </a>
      </PageWrapper>
    </footer>
  );
}
