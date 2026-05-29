import React from 'react';
import { HeroSection, AboutSection } from '@/components/sections';

/**
 * Portfolio Home Page
 * Renders the primary landing sections in sequence.
 */
export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <HeroSection />
      <AboutSection />
      {/* 
        Other sections (Skills, Projects, etc.) will be added 
        here as they are fully implemented in Phase 2.
      */}
    </div>
  );
}
