'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useReducedMotion } from './use-reduced-motion';

export interface UseTypewriterOptions {
  strings: string[];
  typeSpeed?: number;
  deleteSpeed?: number;
  pauseDuration?: number;
  loop?: boolean;
}

export interface UseTypewriterReturn {
  displayText: string;
  isTyping: boolean;
  isDeleting: boolean;
  currentIndex: number;
}

/**
 * Custom hook that implements a typewriter effect for an array of strings.
 * Handles typing, pausing at the end of a word, and deleting.
 */
export function useTypewriter({
  strings,
  typeSpeed = 80,
  deleteSpeed = 40,
  pauseDuration = 2000,
  loop = true,
}: UseTypewriterOptions): UseTypewriterReturn {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const isReducedMotion = useReducedMotion();

  const handleType = useCallback(() => {
    // If no strings, do nothing
    if (!strings || strings.length === 0) return;

    // Handle reduced motion: immediately return first string
    if (isReducedMotion) {
      setDisplayText(strings[0]);
      setIsTyping(false);
      setIsDeleting(false);
      return;
    }

    const currentString = strings[currentIndex];

    // TYPING logic
    if (isTyping && !isDeleting) {
      if (displayText.length < currentString.length) {
        timeoutRef.current = setTimeout(() => {
          setDisplayText(currentString.slice(0, displayText.length + 1));
        }, typeSpeed);
      } else {
        // Switch to PAUSING
        setIsTyping(false);
        timeoutRef.current = setTimeout(() => {
          setIsDeleting(true);
        }, pauseDuration);
      }
    }

    // DELETING logic
    if (isDeleting) {
      if (displayText.length > 0) {
        timeoutRef.current = setTimeout(() => {
          setDisplayText(displayText.slice(0, displayText.length - 1));
        }, deleteSpeed);
      } else {
        // Finished deleting, move to next string or loop back
        setIsDeleting(false);
        setIsTyping(true);
        const nextIndex = (currentIndex + 1) % strings.length;
        
        if (!loop && nextIndex === 0) {
          setIsTyping(false);
          return;
        }
        
        setCurrentIndex(nextIndex);
      }
    }
  }, [
    strings,
    currentIndex,
    displayText,
    isTyping,
    isDeleting,
    typeSpeed,
    deleteSpeed,
    pauseDuration,
    loop,
    isReducedMotion,
  ]);

  useEffect(() => {
    handleType();
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [handleType]);

  return {
    displayText,
    isTyping,
    isDeleting,
    currentIndex,
  };
}
