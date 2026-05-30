'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface BadgeProps {
  label: string;
  variant?: 'green' | 'cyan' | 'muted';
  size?: 'sm' | 'md';
  className?: string;
}

export default function Badge({ 
  label, 
  variant = 'green', 
  size = 'md', 
  className 
}: BadgeProps) {
  const shouldReduceMotion = useReducedMotion();

  // Base styles
  const baseStyles = "inline-flex items-center gap-2 font-mono border cursor-default transition-all duration-150 ease-in-out";
  
  // Size variants
  const sizeStyles = {
    md: "px-3 py-1.5 text-terminal-sm rounded-terminal-md",
    sm: "px-2 py-1 text-terminal-xs rounded-terminal-sm"
  };

  // Color variants (Light mode as base, Dark mode with dark: prefix)
  const variantStyles = {
    green: "bg-light-surface text-light-text-primary border-light-border hover:border-light-primary hover:text-light-primary hover:shadow-terminal-green dark:bg-dark-surface dark:text-dark-text-primary dark:border-dark-border dark:hover:border-dark-primary dark:hover:text-dark-primary dark:hover:shadow-terminal-green",
    cyan: "bg-light-surface text-light-text-primary border-light-border hover:border-light-secondary hover:text-light-secondary hover:shadow-terminal-cyan dark:bg-dark-surface dark:text-dark-text-primary dark:border-dark-border dark:hover:border-dark-secondary dark:hover:text-dark-secondary dark:hover:shadow-terminal-cyan",
    muted: "bg-light-surface text-light-text-secondary border-light-border hover:border-light-text-primary dark:bg-dark-surface dark:text-dark-text-secondary dark:border-dark-border dark:hover:border-dark-text-primary"
  };

  const dotColors = {
    green: "bg-light-primary dark:bg-dark-primary",
    cyan: "bg-light-secondary dark:bg-dark-secondary",
    muted: ""
  };

  return (
    <motion.div
      whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
      transition={{ duration: 0.15 }}
      className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
    >
      {variant !== 'muted' && (
        <span className={cn("w-1.5 h-1.5 rounded-full", dotColors[variant])} aria-hidden="true" />
      )}
      {label}
    </motion.div>
  );
}
