import React from 'react';

interface PageWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export default function PageWrapper({ children, className }: PageWrapperProps) {
  return (
    <div className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 ${className ?? ''}`}>
      {children}
    </div>
  );
}
