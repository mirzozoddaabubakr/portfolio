"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function FloatingPathsBackground({
  position = 1,
  children,
  className,
}: {
  position?: number;
  className?: string;
  children?: React.ReactNode;
}) {
  const paths = Array.from({ length: 36 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
      380 - i * 5 * position
    } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
      152 - i * 5 * position
    } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
      684 - i * 5 * position
    } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    color: `rgba(15,23,42,${0.1 + i * 0.03})`,
    width: 0.8 + i * 0.04,
  }));

  return (
    <div className={cn("w-full relative", className)}>
      <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">
        <svg
          className="w-full h-full text-foreground/40 dark:text-white/40"
          viewBox="0 0 696 316"
          fill="none"
          preserveAspectRatio="none"
        >
          {paths.map((path) => (
            <motion.path
              key={path.id}
              d={path.d}
              stroke="currentColor"
              strokeWidth={path.width}
              strokeOpacity={0.2 + (path.id / 36) * 0.5}
              initial={{ pathLength: 0.3, opacity: 0.6 }}
              animate={{
                pathLength: 1,
                opacity: [0.35, 0.85, 0.35],
                pathOffset: [0, 1, 0],
              }}
              transition={{
                duration: 18 + (path.id % 12),
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            />
          ))}
        </svg>
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export default FloatingPathsBackground;
