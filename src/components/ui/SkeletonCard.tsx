"use client";

import { motion } from "framer-motion";

export function SkeletonCard({ index = 0 }: { index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className="relative flex min-h-[300px] flex-col overflow-hidden rounded-[16px] border border-[rgba(255,255,255,0.05)] bg-card p-6 shadow-sm"
    >
      {/* Shimmer Wave */}
      <motion.div
        animate={{ x: ["-100%", "200%"] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent"
        style={{ transform: "skewX(-20deg)" }}
      />

      <div className="relative z-10 flex h-full flex-col">
        {/* Icon Skeleton */}
        <div className="mb-6 h-[48px] w-[48px] rounded-xl bg-secondary/50" />

        {/* Title Skeleton */}
        <div className="space-y-3 flex-1">
          <div className="h-6 w-3/4 rounded-md bg-secondary/50" />
          <div className="space-y-2 mt-4">
            <div className="h-4 w-full rounded-md bg-secondary/40" />
            <div className="h-4 w-5/6 rounded-md bg-secondary/40" />
            <div className="h-4 w-4/6 rounded-md bg-secondary/40" />
          </div>
        </div>

        {/* Footer Skeleton */}
        <div className="mt-8 flex gap-3">
          <div className="h-3 w-12 rounded-full bg-secondary/50" />
          <div className="h-3 w-16 rounded-full bg-secondary/50" />
        </div>
      </div>
    </motion.div>
  );
}
