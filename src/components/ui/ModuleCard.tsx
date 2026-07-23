"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Star, Users } from "lucide-react";
import { useReducedMotion } from "./ReducedMotion";

interface ModuleCardProps {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  gradient: string;
  rating?: number;
  students?: string;
  progress?: number;
  index?: number;
  onClick?: () => void;
}

export function ModuleCard({ 
  title, 
  description, 
  icon: Icon, 
  gradient, 
  rating = 4.9, 
  students = "2.4k", 
  progress = 0,
  index = 0,
  onClick
}: ModuleCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [spotlightX, setSpotlightX] = useState(0);
  const [spotlightY, setSpotlightY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);
  const prefersReducedMotion = useReducedMotion();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || prefersReducedMotion) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Calculate rotation (max 8deg)
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateXValue = ((y - centerY) / centerY) * -8;
    const rotateYValue = ((x - centerX) / centerX) * 8;

    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
    
    // Update spotlight
    setSpotlightX(x);
    setSpotlightY(y);
  };

  const handleMouseLeave = () => {
    if (prefersReducedMotion) return;
    setRotateX(0);
    setRotateY(0);
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) {
      if (onClick) onClick();
      return;
    }

    const rect = cardRef.current?.getBoundingClientRect();
    if (rect) {
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const newRipple = { x, y, id: Date.now() };
      setRipples((prev) => [...prev, newRipple]);
    }
    
    if (onClick) {
      setTimeout(onClick, 200); // Wait for ripple slightly
    }
  };

  // Clean up ripples
  useEffect(() => {
    if (ripples.length > 0) {
      const timer = setTimeout(() => {
        setRipples((prev) => prev.slice(1));
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [ripples]);

  const cardStyle = prefersReducedMotion ? {} : {
    transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      onClick={handleClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
      whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
      className="group relative flex min-h-[300px] cursor-pointer flex-col overflow-hidden rounded-[16px] border border-border bg-card p-6 shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-colors hover:border-foreground/20"
      style={{ ...cardStyle, transformStyle: "preserve-3d" }}
    >
      {/* Spotlight effect */}
      {!prefersReducedMotion && (
        <div 
          className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(circle 300px at ${spotlightX}px ${spotlightY}px, rgba(255,255,255,0.06), transparent 80%)`
          }}
        />
      )}

      {/* Ripple effects */}
      {ripples.map((ripple) => (
        <motion.div
          key={ripple.id}
          initial={{ top: ripple.y, left: ripple.x, scale: 0, opacity: 0.5 }}
          animate={{ scale: 4, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="pointer-events-none absolute -ml-12 -mt-12 h-24 w-24 rounded-full bg-primary/40 mix-blend-screen"
        />
      ))}

      {/* Content Z-layer */}
      <div className="relative z-10 flex h-full flex-col" style={{ transform: prefersReducedMotion ? "none" : "translateZ(30px)" }}>
        
        {/* Animated Floating Icon Container */}
        <motion.div 
          animate={prefersReducedMotion ? {} : { y: [-2, 2, -2] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="mb-6 flex h-[48px] w-[48px] items-center justify-center rounded-xl border border-border bg-card/50 backdrop-blur-md relative overflow-hidden"
        >
          <div className={`absolute inset-0 opacity-20 bg-gradient-to-br ${gradient} mix-blend-overlay`} />
          <Icon className="relative z-10 h-6 w-6 text-foreground drop-shadow-sm" />
        </motion.div>

        {/* Title & Description */}
        <div className="space-y-3 flex-1">
          <h3 className="text-[18px] font-bold text-foreground tracking-[-0.01em]">{title}</h3>
          <p className="text-[14px] leading-[1.5] text-muted-foreground">{description}</p>
        </div>

        {/* Footer Row */}
        <div className="mt-6 flex flex-col gap-3">
          <div className="flex items-center gap-3 text-[12px] font-semibold text-muted-foreground">
            <span className="flex items-center gap-1"><Star className="h-3 w-3 text-amber-400" fill="currentColor" /> {rating}</span>
            <span>·</span>
            <span className="flex items-center gap-1"><Users className="h-3 w-3" /> {students}</span>
            {progress > 0 && (
              <>
                <span>·</span>
                <span className="text-primary">{progress}% complete</span>
              </>
            )}
          </div>

          {progress > 0 && (
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: `${progress}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2 }}
                className={`h-full bg-gradient-to-r ${gradient}`} 
              />
            </div>
          )}
        </div>
      </div>

      {/* Explore Arrow Hover State */}
      <motion.div 
        initial={{ x: 20, opacity: 0 }}
        animate={isHovered && !prefersReducedMotion ? { x: 0, opacity: 1 } : { x: 20, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="absolute bottom-6 right-6 z-20 hidden items-center justify-center rounded-full bg-primary p-2 text-primary-foreground shadow-[0_0_15px_rgba(139,92,246,0.4)] group-hover:flex"
      >
        <ArrowRight className="h-4 w-4" />
      </motion.div>
    </motion.div>
  );
}
