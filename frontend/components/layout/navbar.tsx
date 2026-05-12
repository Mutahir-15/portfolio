'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import ThemeToggle from './theme-toggle';
import PageWrapper from './page-wrapper';

interface NavLink {
  label: string;
  href: string;
}

const navLinks: NavLink[] = [
  { label: '[about]', href: '#about' },
  { label: '[skills]', href: '#skills' },
  { label: '[projects]', href: '#projects' },
  { label: '[timeline]', href: '#timeline' },
  { label: '[contact]', href: '#contact' },
];

export function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up');
  const lastScrollY = useRef(0);

  useEffect(() => {
    const updateScrollDirection = () => {
      const scrollY = window.pageYOffset;
      const direction = scrollY > lastScrollY.current ? 'down' : 'up';
      if (
        direction !== scrollDirection &&
        (scrollY - lastScrollY.current > 5 || lastScrollY.current - scrollY > 5)
      ) {
        setScrollDirection(direction);
      }
      lastScrollY.current = scrollY > 0 ? scrollY : 0;
    };
    window.addEventListener('scroll', updateScrollDirection);
    return () => window.removeEventListener('scroll', updateScrollDirection);
  }, [scrollDirection]);

  return scrollDirection;
}

export default function Navbar() {
  const scrollDirection = useScrollDirection();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const navbarVariants = {
    visible: { y: 0, transition: { duration: prefersReducedMotion ? 0 : 0.3 } },
    hidden: {
      y: prefersReducedMotion ? 0 : '-100%',
      transition: { duration: prefersReducedMotion ? 0 : 0.3 },
    },
  };

  const menuVariants = {
    open: {
      opacity: 1,
      y: 0,
      transition: { duration: prefersReducedMotion ? 0 : 0.2 },
    },
    closed: {
      opacity: prefersReducedMotion ? 1 : 0,
      y: prefersReducedMotion ? 0 : -8,
      transition: { duration: prefersReducedMotion ? 0 : 0.2 },
    },
  };

  return (
    <motion.nav
      initial="visible"
      animate={scrollDirection === 'down' && !isMenuOpen ? 'hidden' : 'visible'}
      variants={navbarVariants}
      className="fixed top-0 left-0 right-0 z-50 h-16 bg-light-bg/90 dark:bg-dark-bg/90 backdrop-blur-md border-b border-light-border dark:border-dark-border font-mono"
      aria-label="Main Navigation"
    >
      <PageWrapper className="h-full flex justify-between items-center">
        {/* Logo */}
        <a
          href="#"
          className="font-bold text-2xl text-light-green dark:text-dark-green flex items-center"
          aria-label="Mutahir Bin Athar — home"
        >
          {">"} MBA<span className="animate-blink">_</span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-light-text dark:text-dark-text hover:text-light-green dark:hover:text-dark-green transition-colors duration-150"
            >
              {link.label}
            </a>
          ))}
          <ThemeToggle />
        </div>

        {/* Mobile Controls */}
        <div className="flex md:hidden items-center space-x-4">
          <ThemeToggle />
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-light-text dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-light-green dark:focus:ring-dark-green rounded-md"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
          >
            <div className="w-6 h-5 relative flex flex-col justify-between">
              <span
                className={`w-full h-0.5 bg-current transition-transform duration-300 ${
                  isMenuOpen ? 'rotate-45 translate-y-2' : ''
                }`}
              />
              <span
                className={`w-full h-0.5 bg-current transition-opacity duration-300 ${
                  isMenuOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`w-full h-0.5 bg-current transition-transform duration-300 ${
                  isMenuOpen ? '-rotate-45 -translate-y-2' : ''
                }`}
              />
            </div>
          </button>
        </div>
      </PageWrapper>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="absolute top-16 left-0 right-0 bg-light-bg/95 dark:bg-dark-bg/95 backdrop-blur-md border-b border-light-border dark:border-dark-border py-4 md:hidden"
          >
            <PageWrapper>
              <div className="flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-lg text-light-text dark:text-dark-text hover:text-light-green dark:hover:text-dark-green transition-colors py-2"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </PageWrapper>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
