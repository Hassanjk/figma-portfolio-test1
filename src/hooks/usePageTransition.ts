import { useState, useCallback, useRef } from 'react';

type Page = 'home' | 'projects' | 'contact' | 'about';

export const usePageTransition = () => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isPageLoading, setIsPageLoading] = useState(false);
  const timeoutRef = useRef<number | null>(null);
  const innerTimeoutRef = useRef<number | null>(null);

  const transition = useCallback((to: Page) => {
    // Clear any existing timeouts to prevent race conditions
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (innerTimeoutRef.current) {
      clearTimeout(innerTimeoutRef.current);
    }

    // Prevent duplicate transitions
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setIsPageLoading(true);
    
    timeoutRef.current = window.setTimeout(() => {
      setCurrentPage(to);
      innerTimeoutRef.current = window.setTimeout(() => {
        setIsTransitioning(false);
        setIsPageLoading(false);
      }, 50);
    }, 600); // Reduced for better responsiveness
  }, [isTransitioning]);

  // Cleanup function
  const cleanup = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (innerTimeoutRef.current) {
      clearTimeout(innerTimeoutRef.current);
      innerTimeoutRef.current = null;
    }
    setIsTransitioning(false);
    setIsPageLoading(false);
  }, []);

  return { 
    isTransitioning, 
    currentPage, 
    isPageLoading, 
    transition,
    cleanup 
  };
};