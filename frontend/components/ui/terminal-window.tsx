'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

export interface TerminalWindowProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  showDots?: boolean;
  animate?: boolean;
}

/**
 * TerminalWindow Component
 * A reusable terminal-style container with macOS traffic light dots and a title bar.
 */
export default function TerminalWindow({
  title,
  children,
  className = '',
  showDots = true,
  animate = true,
}: TerminalWindowProps) {
  const isReducedMotion = useReducedMotion();
  const shouldAnimate = animate && !isReducedMotion;

  return (
    <motion.div
      initial={shouldAnimate ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`
        bg-light-surface dark:bg-dark-surface 
        border border-light-border dark:border-dark-border 
        rounded-terminal-lg overflow-hidden 
        dark:shadow-terminal-green
        ${className}
      `}
    >
      {/* Title Bar */}
      <div className="h-10 px-4 flex items-center justify-between bg-light-surface/50 dark:bg-dark-surface/50 border-b border-light-border dark:border-dark-border">
        {/* Traffic light dots container (decorative) */}
        <div className="flex gap-2" aria-hidden="true">
          {showDots && (
            <>
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#ff5f57' }} />
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#ffbd2e' }} />
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#28ca41' }} />
            </>
          )}
        </div>
        
        {/* Title text */}
        <div className="flex-1 text-center">
          <span className="font-mono text-xs text-light-text-secondary dark:text-dark-text-secondary">
            {title}
          </span>
        </div>
        
        {/* Spacer to center title correctly */}
        <div className="w-12" /> 
      </div>

      {/* Content Area */}
      <div className="p-6">
        {children}
      </div>
    </motion.div>
  );
}
