"use client";

import { useRef, useState, ReactNode } from "react";
import { motion, useAnimation } from "framer-motion";
import { useMousePosition } from "@/hooks/useMousePosition";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  variant?: "primary" | "ghost";
}

export function MagneticButton({ children, className = "", onClick, href, variant = "primary" }: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const mousePosition = useMousePosition();

  let x = 0;
  let y = 0;
  let distance = 1000;

  if (ref.current) {
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    distance = Math.sqrt(Math.pow(mousePosition.x - centerX, 2) + Math.pow(mousePosition.y - centerY, 2));

    // Magnetic pull radius of 50px
    if (distance < 50) {
      x = (mousePosition.x - centerX) * 0.4;
      y = (mousePosition.y - centerY) * 0.4;
    }
  }

  const baseClasses = "relative inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-bold transition-shadow duration-300";
  const variants = {
    primary: "bg-primary text-primary-foreground shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)]",
    ghost: "border border-border bg-card/50 text-foreground backdrop-blur-xl hover:bg-card/80 hover:border-white/20",
  };

  const Component = href ? "a" : "button";

  return (
    <motion.div
      ref={ref}
      animate={{ x, y, scale: isHovered ? 1.02 : 1 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="inline-block"
    >
      <Component
        href={href}
        onClick={onClick}
        className={`${baseClasses} ${variants[variant]} ${className}`}
      >
        {children}
      </Component>
    </motion.div>
  );
}
