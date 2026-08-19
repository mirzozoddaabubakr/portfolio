"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CarouselItem {
  id: string;
  title: string;
  description: string;
  tag?: string;
  rating?: number;
}

export interface CircularCarouselProps {
  items: CarouselItem[];
  activeIndex?: number;
  onActiveChange?: (index: number) => void;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  className?: string;
}

const VISIBLE_COUNT = 5;
const RADIUS_X = 220;
const RADIUS_Y = 100;

function getItemPosition(index: number, activeIndex: number, total: number, isMobile: boolean) {
  const offset = index - activeIndex;
  const half = Math.floor(VISIBLE_COUNT / 2);
  let adjustedOffset = offset;

  if (offset > half) adjustedOffset = offset - total;
  if (offset < -half) adjustedOffset = offset + total;

  if (Math.abs(adjustedOffset) > half * 2) return null;

  const radiusX = isMobile ? 115 : 220;
  const radiusY = isMobile ? 60 : 100;

  const angle = (adjustedOffset / VISIBLE_COUNT) * Math.PI;
  const x = Math.sin(angle) * radiusX;
  const y = -Math.cos(angle) * radiusY;

  const distance = Math.abs(adjustedOffset);
  const maxDistance = half + 1;
  const scale = Math.max(0, 1 - (distance / maxDistance) * 0.3);
  const opacity = Math.max(0.3, 1 - (distance / maxDistance) * 0.7);
  const zIndex = VISIBLE_COUNT - distance;

  return { x, y, scale, opacity, zIndex, adjustedOffset };
}

function Stars({ rating = 5 }: { rating?: number | undefined }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            "h-3 w-3",
            i < rating ? "fill-accent text-accent" : "text-muted-foreground/40",
          )}
        />
      ))}
    </div>
  );
}

export function CircularCarousel({
  items,
  activeIndex: controlledIndex,
  onActiveChange,
  autoPlay = true,
  autoPlayInterval = 4000,
  className,
}: CircularCarouselProps) {
  const [internalIndex, setInternalIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeIndex = controlledIndex ?? internalIndex;
  const total = items.length;

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const goTo = useCallback(
    (index: number) => {
      const newIndex = ((index % total) + total) % total;
      if (controlledIndex === undefined) setInternalIndex(newIndex);
      onActiveChange?.(newIndex);
    },
    [total, controlledIndex, onActiveChange],
  );

  const next = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);
  const prev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);

  useEffect(() => {
    if (!autoPlay || isHovered || isFocused) return;
    intervalRef.current = setInterval(next, autoPlayInterval);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [autoPlay, autoPlayInterval, isHovered, isFocused, next]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    const el = containerRef.current;
    el?.addEventListener("keydown", handler);
    return () => el?.removeEventListener("keydown", handler);
  }, [next, prev]);

  const activeItem = items[activeIndex];

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      role="listbox"
      aria-label="Feedback carousel"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      className={cn(
        "relative flex flex-col items-center justify-center gap-8 overflow-hidden outline-none",
        className,
      )}
    >
      {/* Circular track */}
      <div className="relative h-[260px] sm:h-[320px] w-full max-w-3xl">
        <div className="absolute inset-0">
          {items.map((item, i) => {
            const pos = getItemPosition(i, activeIndex, total, isMobile);
            if (!pos) return null;

            const isActive = i === activeIndex;

            return (
              <motion.div
                key={item.id}
                initial={false}
                animate={{
                  x: pos.x,
                  y: pos.y,
                  scale: pos.scale,
                  opacity: pos.opacity,
                }}
                transition={{ type: "spring", stiffness: 220, damping: 30 }}
                style={{ zIndex: pos.zIndex, transformOrigin: "center center" }}
                onClick={() => goTo(i)}
                aria-label={item.title}
                aria-selected={isActive}
                role="option"
                className={cn(
                  "absolute left-1/2 top-1/2 flex h-28 w-36 sm:h-32 sm:w-48 -translate-x-1/2 -translate-y-1/2 cursor-pointer flex-col items-start justify-between rounded-2xl border border-border bg-card p-3 sm:p-4 backdrop-blur-sm transition-shadow duration-300",
                  isActive
                    ? "shadow-[0_20px_60px_-12px_rgba(0,0,0,0.5)]"
                    : "shadow-[0_8px_24px_-4px_rgba(0,0,0,0.3)] hover:shadow-[0_12px_32px_-4px_rgba(0,0,0,0.4)]",
                )}
              >
                <div className="flex w-full items-center gap-2">
                  {item.tag && (
                    <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                      {item.tag}
                    </span>
                  )}
                </div>
                <div className="w-full">
                  <p className="truncate font-display text-xs sm:text-sm uppercase tracking-tight text-foreground">
                    {item.title}
                  </p>
                  <p className="mt-1 line-clamp-2 text-[11px] sm:text-xs leading-snug text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Center content */}
      <div className="max-w-xl text-center">
        {activeItem && (
          <>
            <div className="flex justify-center">
              <Stars rating={activeItem.rating} />
            </div>
            <p className="mt-4 text-base leading-relaxed text-foreground md:text-lg">
              &ldquo;{activeItem.description}&rdquo;
            </p>
            <p className="mt-4 font-display text-sm uppercase tracking-tight text-foreground">
              {activeItem.title}
            </p>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              {activeItem.tag}
            </p>
          </>
        )}
        <p className="mt-4 font-mono text-xs text-muted-foreground">
          {String(activeIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </p>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={prev}
          aria-label="Previous"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-muted"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        <div className="flex items-center gap-2">
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                i === activeIndex
                  ? "w-6 bg-foreground"
                  : "w-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/60",
              )}
              aria-label={`Go to item ${i + 1}`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={next}
          aria-label="Next"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-muted"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

export default CircularCarousel;
