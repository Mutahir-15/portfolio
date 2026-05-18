'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageWrapper from '../layout/page-wrapper';
import { useTypewriter } from '@/hooks/use-typewriter';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { MatrixRain } from '../ui/matrix-rain';

const roles = [
  'Spec-Driven Developer',
  'Agentic AI Engineer',
  'Full-Stack Developer',
  'Solution Architect',
  'Automation Specialist',
];

export default function HeroSection() {
  const isReducedMotion = useReducedMotion();
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);

  const { displayText } = useTypewriter({
    strings: roles,
    typeSpeed: 80,
    deleteSpeed: 40,
    pauseDuration: 2000,
  });

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowScrollIndicator(false);
      } else {
        setShowScrollIndicator(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <section 
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden pt-16 bg-dark-background text-dark-text-primary"
      aria-labelledby="hero-heading"
    >
      {/* T014, T015, T017: Matrix Rain Layer */}
      <MatrixRain />

      {/* T016: Scanline Overlay (Dark Mode only as per spec) */}
      <div 
        className="absolute inset-0 pointer-events-none z-0 opacity-50 dark:block hidden"
        style={{
          background: 'repeating-linear-gradient(transparent 0px, transparent 1px, rgba(0,0,0,0.03) 1px, rgba(0,0,0,0.03) 2px)',
          backgroundSize: '100% 2px'
        }}
        aria-hidden="true"
      />
      
      <PageWrapper className="relative z-10 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center gap-4"
        >
          {/* T009: Terminal Prompt Prefix */}
          <motion.p
            variants={itemVariants}
            className="font-mono text-dark-primary text-sm md:text-base opacity-80"
          >
            {'> '}whoami
          </motion.p>

          {/* T010: Name Heading */}
          <motion.h1
            id="hero-heading"
            variants={itemVariants}
            className="text-4xl md:text-6xl font-bold tracking-tight mb-2"
          >
            Mutahir Bin Athar
          </motion.h1>

          {/* T011: Typewriter line */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col items-center gap-2"
          >
            <div 
              className="font-mono text-xl md:text-2xl text-dark-secondary h-8 flex items-center"
              aria-live="polite"
              aria-atomic="true"
            >
              <span>{displayText}</span>
              {!isReducedMotion && (
                <span className="ml-1 w-2 h-6 bg-dark-secondary animate-cursor-blink" aria-hidden="true" />
              )}
            </div>
            
            <p className="max-w-md text-dark-text-secondary text-base md:text-lg mt-4">
              Building autonomous systems and scalable web applications with architectural precision.
            </p>

            {/* T012, T013: CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-dark-primary text-dark-background font-mono font-bold rounded-sm shadow-glow hover:bg-opacity-90 transition-all duration-200"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
                }}
                aria-label="View my projects"
              >
                [ View_Projects ]
              </motion.a>

              <motion.a
                href="/cv.pdf"
                download
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 border border-dark-primary text-dark-primary font-mono font-bold rounded-sm hover:bg-dark-primary hover:text-dark-background transition-all duration-200"
                aria-label="Download my CV"
              >
                [ Download_CV ]
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
      </PageWrapper>

      {/* T016: Scroll Indicator */}
      <AnimatePresence>
        {showScrollIndicator && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
          >
            <motion.div
              animate={isReducedMotion ? {} : { y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="flex flex-col items-center gap-2 text-dark-text-secondary opacity-60"
            >
              <span className="text-xs font-mono uppercase tracking-widest">Scroll</span>
              <svg 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
              </svg>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
