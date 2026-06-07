'use client';

import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Badge } from '@/components/ui';
import { PageWrapper } from '@/components/layout';
import { cn } from '@/lib/utils';
import { useState } from 'react';

// TASK-1: Define TimelineEvent interface
export interface TimelineEvent {
  quarter: string;
  period: string;
  title: string;
  status: 'completed' | 'active';
  description: string;
  skills: string[];
  highlights: string[];
  variant: 'green' | 'cyan';
}

// TASK-2: Define timelineData constant
const timelineData: TimelineEvent[] = [
  {
    quarter: 'Q1',
    period: '2023',
    title: 'TypeScript Foundations',
    status: 'completed',
    description: 'Learned TypeScript from scratch as part of the GIAIC program. Built type-safe applications and developed strong fundamentals in modern JavaScript tooling.',
    skills: ['TypeScript', 'JavaScript', 'Node.js'],
    highlights: [
      'Completed GIAIC Quarter 1',
      'Built first type-safe projects',
      'Established strong TS fundamentals',
    ],
    variant: 'cyan',
  },
  {
    quarter: 'Q2',
    period: '2024',
    title: 'Next.js & Hackathons',
    status: 'completed',
    description: 'Mastered Next.js and the React ecosystem. Participated in multiple hackathons — all projects available on GitHub at Mutahir-15.',
    skills: ['Next.js', 'React', 'Tailwind CSS', 'Vercel'],
    highlights: [
      'Completed GIAIC Quarter 2',
      'Multiple hackathons completed',
      'Projects live on GitHub/Mutahir-15',
      'Deployed production Next.js apps',
    ],
    variant: 'green',
  },
  {
    quarter: 'Q3',
    period: '2024',
    title: 'Python & OpenAI Agents SDK',
    status: 'completed',
    description: 'Learned Python and the OpenAI Agents SDK. Built agentic AI workflows and CLI coding agents using FastAPI as the backend framework.',
    skills: ['Python', 'OpenAI Agents SDK', 'FastAPI', 'Gemini API'],
    highlights: [
      'Completed GIAIC Quarter 3',
      'Built CLI coding agents',
      'Learned agentic AI workflows',
      'FastAPI backend development',
    ],
    variant: 'cyan',
  },
  {
    quarter: 'Q4',
    period: '2025 — Present',
    title: 'AI-Driven Development (AIDD)',
    status: 'active',
    description: 'Currently learning AI-Driven Development using Spec-Driven Development methodology and SpecKit Plus. Building this portfolio as a live AIDD project.',
    skills: ['AIDD', 'SpecKit Plus', 'Spec-Driven Development', 'Agentic Workflows'],
    highlights: [
      'Currently active — Quarter 4',
      'Building portfolio with SDD',
      'Using SpecKit Plus in production',
      'Enrolled in GIAIC Agentic AI track',
    ],
    variant: 'green',
  },
];

// TASK-3: Define fadeUpVariant
const fadeUpVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.5, ease: 'easeOut' } 
  },
};

// TASK-4: Define slideInLeft
const slideInLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { duration: 0.5, ease: 'easeOut' } 
  },
};

// TASK-5: Define slideInRight
const slideInRight = {
  hidden: { opacity: 0, x: 30 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { duration: 0.5, ease: 'easeOut' } 
  },
};

export default function TimelineSection() {
  const shouldReduceMotion = useReducedMotion();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section id="timeline" className="py-terminal-xl overflow-x-hidden">
      <PageWrapper>
        <div className="container mx-auto px-4">
          {/* Section Heading (TASK-7) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUpVariant}
            className="mb-12"
          >
            <span className="font-mono text-terminal-sm text-light-text-secondary dark:text-dark-text-secondary">
              // section
            </span>
            <h2 className="font-mono text-terminal-3xl font-bold text-light-primary dark:text-dark-primary mt-1">
              journey
            </h2>
            <div className="w-[60px] h-[2px] bg-dark-green mt-2" />
          </motion.div>

          <div className="relative">
            {/* Vertical Spine (TASK-8) */}
            <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[2px] bg-light-border dark:bg-dark-border -translate-x-1/2" />

            <div className="flex flex-col gap-12">
              {timelineData.map((event, index) => {
                const isEven = index % 2 === 0;
                const isActive = event.status === 'active';

                return (
                  <motion.div
                    key={event.quarter}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-80px' }}
                    variants={shouldReduceMotion ? {} : (isEven ? slideInLeft : slideInRight)}
                    className={cn(
                      'relative flex w-full flex-col md:flex-row items-center',
                      isEven ? 'md:justify-start' : 'md:justify-end'
                    )}
                  >
                    {/* Connector Dot (TASK-10, TASK-11) */}
                    <div className="absolute left-[20px] md:left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 z-20">
                      <div
                        className={cn(
                          'w-4 h-4 rounded-full bg-dark-bg dark:bg-dark-bg border-2',
                          event.variant === 'green'
                            ? 'border-dark-green'
                            : 'border-dark-cyan'
                        )}
                        aria-hidden="true"
                      />
                      {isActive && (
                        <span
                          className={cn(
                            'absolute inset-[-4px] rounded-full z-[-1]',
                            !shouldReduceMotion && 'animate-glow-pulse',
                            event.variant === 'green' ? 'bg-dark-green/30' : 'bg-dark-cyan/30'
                          )}
                          aria-hidden="true"
                        />
                      )}
                    </div>

                    {/* Content Container (TASK-9) */}
                    <div className={cn(
                      'w-full md:w-[45%] pl-12 md:pl-0',
                      isEven ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'
                    )}>
                      {/* Quarter Label + Period (TASK-12) */}
                      <div className="flex items-center gap-2 mb-2 font-mono text-terminal-xs justify-start md:justify-inherit">
                        <span className={cn(
                          'font-bold',
                          event.variant === 'green' ? 'text-dark-green' : 'text-dark-cyan'
                        )}>
                          [{event.quarter}]
                        </span>
                        <span className="text-dark-muted dark:text-dark-text-secondary">
                          {event.period}
                        </span>
                      </div>

                      {/* Card Shell (TASK-13, TASK-14) */}
                      <div
                        className={cn(
                          'bg-dark-surface dark:bg-dark-surface border border-dark-border rounded-terminal-lg p-6 transition-colors duration-150',
                          event.variant === 'green' ? 'hover:border-dark-green' : 'hover:border-dark-cyan',
                          isActive && 'border-l-4 border-l-dark-green shadow-terminal-green'
                        )}
                        onClick={() => toggleExpand(index)}
                      >
                        {/* Title + Status Badge (TASK-15) */}
                        <div className="flex items-center justify-between gap-4 mb-4">
                          <h3 className="font-mono text-terminal-lg font-bold text-light-text dark:text-dark-text">
                            {event.title}
                          </h3>
                          <div className={cn(
                            'font-mono text-[10px] px-2 py-0.5 rounded-terminal-sm border uppercase tracking-wider',
                            isActive 
                              ? cn('bg-dark-green text-dark-bg border-dark-green', !shouldReduceMotion && 'animate-glow-pulse')
                              : 'text-dark-green border-dark-green'
                          )}>
                            {isActive ? '[active \u25B6]' : '[completed]'}
                          </div>
                        </div>

                        {/* Skills Badges (TASK-16) */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {event.skills.map((skill) => (
                            <Badge
                              key={skill}
                              label={skill}
                              variant={event.variant}
                              size="sm"
                            />
                          ))}
                        </div>

                        {/* Expandable Content (TASK-18, TASK-19, TASK-20) */}
                        <AnimatePresence initial={false}>
                          {expandedIndex === index && (
                            <motion.div
                              id={`quarter-${index}-content`}
                              initial={shouldReduceMotion ? { opacity: 1, height: 'auto' } : { opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={shouldReduceMotion ? { opacity: 0, height: 'auto' } : { opacity: 0, height: 0 }}
                              transition={{ duration: 0.3, ease: 'easeInOut' }}
                              className="overflow-hidden"
                              role="region"
                              aria-label={`${event.title} details`}
                            >
                              <p className="font-sans text-terminal-sm text-dark-text-secondary leading-relaxed mb-4">
                                {event.description}
                              </p>
                              <ul className="space-y-2 mb-4">
                                {event.highlights.map((highlight, i) => (
                                  <li key={i} className="flex gap-2 items-start">
                                    <span 
                                      className={cn(
                                        'font-mono text-terminal-xs mt-1',
                                        event.variant === 'green' ? 'text-dark-green' : 'text-dark-cyan'
                                      )}
                                      aria-hidden="true"
                                    >
                                      ▸
                                    </span>
                                    <span className="font-sans text-terminal-xs text-dark-text-secondary">
                                      {highlight}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Toggle Button (TASK-21, TASK-22) */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleExpand(index);
                          }}
                          aria-expanded={expandedIndex === index}
                          aria-controls={`quarter-${index}-content`}
                          className={cn(
                            'font-mono text-terminal-xs cursor-pointer py-3 transition-colors duration-150',
                            event.variant === 'green' ? 'text-dark-green hover:text-dark-green/80' : 'text-dark-cyan hover:text-dark-cyan/80'
                          )}
                        >
                          {expandedIndex === index ? '[- collapse]' : '[+ expand]'}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </PageWrapper>
    </section>
  );
}
