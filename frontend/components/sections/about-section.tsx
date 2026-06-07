'use client';

import React from 'react';
import { motion } from 'framer-motion';
import PageWrapper from '@/components/layout/page-wrapper';
import { TerminalWindow } from '@/components/ui';
import { useTypewriter } from '@/hooks/use-typewriter';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

const infoItems = [
  { label: 'Program', value: 'GIAIC', subValue: 'Agentic AI' },
  { label: 'Quarter', value: '05', subValue: 'In Progress' },
  { label: 'Location', value: 'Karachi', subValue: 'Pakistan' },
  { label: 'Focus', value: 'AIDD', subValue: 'Engineering' },
];

/**
 * AboutSection Component
 * Implements User Stories 1, 2, 3, and 4 (S-9).
 * Features a terminal window with bio, animated greetings, and info cards.
 */
export default function AboutSection() {
  const isReducedMotion = useReducedMotion();
  
  const { displayText } = useTypewriter({
    strings: ["Hello, World! 👋", "Marhaba! مرحبا 👋", "Assalam o Alaikum! 🌙"],
    typeSpeed: 60,
    deleteSpeed: 30,
    pauseDuration: 3000,
  });

  const isArabicOrUrdu = displayText.includes('مرحبا') || displayText.includes('السلام');

  return (
    <section id="about" className="py-24 overflow-hidden">
      <PageWrapper>
        {/* Section Heading Pattern (FR-003 / T009) */}
        <div className="mb-12">
          <motion.p
            initial={isReducedMotion ? { opacity: 1 } : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-mono text-light-text-secondary dark:text-dark-text-secondary mb-1"
          >
            {"// section"}
          </motion.p>
          <motion.h2
            initial={isReducedMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-mono text-light-primary dark:text-dark-primary inline-block"
          >
            about_me
          </motion.h2>
          <motion.div
            initial={isReducedMotion ? { width: 60 } : { width: 0 }}
            whileInView={{ width: 60 }}
            viewport={{ once: true }}
            className="h-1 bg-light-primary dark:bg-dark-primary mt-1"
          />
        </div>

        {/* Two-column grid layout (T010) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Bio Terminal (T011-T016) */}
          <TerminalWindow title="mutahir.txt">
            {/* Command Prompt simulation (T011) */}
            <div className="font-mono text-sm mb-4">
              <span className="text-light-text-secondary dark:text-dark-text-secondary">$</span>{" "}
              <span className="text-light-primary dark:text-dark-primary">cat mutahir.txt</span>
            </div>

            {/* Animated Multilingual Greeting (T015-T016) */}
            <div className="mb-6 min-h-[1.5rem]" aria-live="polite" aria-atomic="true">
              <span className={isArabicOrUrdu ? 'font-sans' : 'font-mono'}>
                {displayText}
              </span>
              <span 
                className="animate-cursor-blink ml-1 border-r-2 border-light-primary dark:border-dark-primary" 
                aria-hidden="true" 
              />
            </div>

            {/* Identity & Professional Journey Bio (T012) */}
            <div className="space-y-4 font-sans text-base text-light-text-secondary dark:text-dark-text-secondary">
              <p>
                I am Mutahir Bin Athar, a software engineer passionate about building intelligent, human-centric applications.
              </p>
              <p>
                Currently enrolled in the Governor Sindh Initiative for Agentic AI (GIAIC), Quarter 5, pushing the boundaries of autonomous agents.
              </p>
              <p>
                I thrive on Spec-Driven Development (SDD), ensuring every line of code serves a verified architectural purpose.
              </p>
            </div>

            {/* Technical Focus & Location (T013-T014) */}
            <div className="mt-8 space-y-2 font-mono text-sm">
              <p className="text-light-primary dark:text-dark-primary">
                {">"} Currently focused on: <span className="text-light-text-primary dark:text-dark-text-primary">AIDD</span>
                <span className="animate-cursor-blink ml-1 border-r-2 border-light-primary dark:border-dark-primary" aria-hidden="true" />
              </p>
              <p className="text-light-text-secondary dark:text-dark-text-secondary">
                {">"} Location: Karachi, Pakistan 🇵🇰
              </p>
            </div>
          </TerminalWindow>
          
          {/* Rapid Skill & Status Scanning - Info Cards (T017-T019) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            {infoItems.map((item, i) => (
              <motion.div
                key={item.label}
                initial={isReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  delay: isReducedMotion ? 0 : 0.1 * i, 
                  duration: 0.4,
                  ease: "easeOut"
                }}
                className="p-4 bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border rounded-terminal-lg shadow-sm"
              >
                <p className="text-xs font-mono text-light-text-secondary dark:text-dark-text-secondary mb-1">
                  {item.label}
                </p>
                <p className="text-xl font-mono text-light-primary dark:text-dark-primary">
                  {item.value}
                </p>
                <p className="text-xs font-sans text-light-text-secondary dark:text-dark-text-secondary mt-1">
                  {item.subValue}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </PageWrapper>
    </section>
  );
}
