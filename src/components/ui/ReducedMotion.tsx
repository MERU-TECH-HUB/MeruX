"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useReducedMotion as useFramerReducedMotion } from "framer-motion";

const ReducedMotionContext = createContext<boolean>(false);

export function ReducedMotionProvider({ children }: { children: ReactNode }) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  // Try to use framer-motion's native hook first
  const framerReduced = useFramerReducedMotion();

  useEffect(() => {
    // Fallback/sync with standard media query
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(framerReduced ?? mediaQuery.matches);

    const onChange = () => {
      setPrefersReducedMotion(mediaQuery.matches);
    };

    mediaQuery.addEventListener("change", onChange);
    return () => mediaQuery.removeEventListener("change", onChange);
  }, [framerReduced]);

  return (
    <ReducedMotionContext.Provider value={prefersReducedMotion}>
      {children}
    </ReducedMotionContext.Provider>
  );
}

export function useReducedMotion() {
  return useContext(ReducedMotionContext);
}
