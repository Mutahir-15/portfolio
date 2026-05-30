'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Badge } from '@/components/ui';
import { PageWrapper } from '@/components/layout';
import { cn } from '@/lib/utils';

// Interfaces (T006)
interface Skill {
  label: string;
  variant: 'green' | 'cyan';
}

interface SkillCategory {
  name: string;
  icon: string;
  skills: Skill[];
}

// Data (T007)
const skillCategories = [
  {
    name: 'Languages',
    icon: 'λ',
    skills: [
      { label: 'TypeScript', variant: 'green' },
      { label: 'Python', variant: 'green' },
      { label: 'JavaScript', variant: 'green' },
    ],
  },
  {
    name: 'Frameworks',
    icon: '⬡',
    skills: [
      { label: 'Next.js', variant: 'cyan' },
      { label: 'FastAPI', variant: 'cyan' },
      { label: 'Tailwind CSS', variant: 'cyan' },
    ],
  },
  {
    name: 'AI / ML',
    icon: '⚡',
    skills: [
      { label: 'OpenAI Agents SDK', variant: 'green' },
      { label: 'Gemini API', variant: 'green' },
      { label: 'Prompt Engineering', variant: 'green' },
      { label: 'Agentic Workflows', variant: 'green' },
    ],
  },
  {
    name: 'Tools',
    icon: '$',
    skills: [
      { label: 'Git', variant: 'cyan' },
      { label: 'GitHub', variant: 'cyan' },
      { label: 'VS Code', variant: 'cyan' },
      { label: 'Vercel', variant: 'cyan' },
      { label: 'SpecKit Plus', variant: 'cyan' },
    ],
  },
] as const satisfies SkillCategory[];

// Animation Variants (T008)
const fadeUpVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.5, ease: 'easeOut' } 
  },
};

const containerVariant = {
  hidden: {},
  visible: { 
    transition: { staggerChildren: 0.15 } 
  },
};

export default function SkillsSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <PageWrapper>
      <section id="skills" className="py-terminal-xl">
        <div className="container mx-auto px-4">
          {/* Section Heading (T011) */}
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
              skills_&_tools
            </h2>
            <div className="h-1 w-[60px] bg-light-primary dark:bg-dark-primary mt-4" />
          </motion.div>

          {/* Category Grid (T012, T013, T017) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={shouldReduceMotion ? {} : containerVariant}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {skillCategories.map((category) => (
              <motion.div
                key={category.name}
                variants={fadeUpVariant}
                className="p-6 rounded-terminal-lg border bg-light-surface border-light-border dark:bg-dark-surface dark:border-dark-border"
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="font-mono text-terminal-sm text-light-primary dark:text-dark-primary" aria-hidden="true">
                    [ {category.icon} ]
                  </span>
                  <h3 className="font-mono text-terminal-base font-bold text-light-text-primary dark:text-dark-text-primary">
                    {category.name}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <Badge
                      key={skill.label}
                      label={skill.label}
                      variant={skill.variant}
                      size="md"
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </PageWrapper>
  );
}
