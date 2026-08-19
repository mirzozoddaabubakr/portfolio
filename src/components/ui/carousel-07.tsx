"use client";

import * as React from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  type PanInfo,
  type MotionValue,
} from "motion/react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export interface Slide {
  image: string;
  title: string;
  description: string;
  badge: string;
  href?: string;
}

interface CarouselConfig {
  distanceDivisor: number;
  velocityDivisor: number;
  sensitivity: number;
  xMultiplier: number;
  yMultiplier: number;
  rotationMultiplier: number;
  scaleReduction: number;
}

const getCarouselConfig = (width: number): CarouselConfig => {
  if (width < 640) {
    return {
      distanceDivisor: 120,
      velocityDivisor: 500,
      sensitivity: 180,
      xMultiplier: 90,
      yMultiplier: 20,
      rotationMultiplier: 8,
      scaleReduction: 0.06,
    };
  }
  if (width < 1024) {
    return {
      distanceDivisor: 160,
      velocityDivisor: 650,
      sensitivity: 220,
      xMultiplier: 130,
      yMultiplier: 30,
      rotationMultiplier: 10,
      scaleReduction: 0.09,
    };
  }
  return {
    distanceDivisor: 200,
    velocityDivisor: 800,
    sensitivity: 250,
    xMultiplier: 170,
    yMultiplier: 40,
    rotationMultiplier: 12,
    scaleReduction: 0.12,
  };
};

export const CarouselStacked = ({ slides, className }: { slides: Slide[]; className?: string }) => {
  const scrollProgress = useMotionValue(0);
  const startProgress = React.useRef(0);
  const [windowWidth, setWindowWidth] = React.useState(0);

  const total = slides.length;

  React.useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const config = React.useMemo(() => getCarouselConfig(windowWidth), [windowWidth]);

  const handleDragStart = () => {
    startProgress.current = scrollProgress.get();
  };

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const distanceShift = -info.offset.x / config.distanceDivisor;
    const velocityShift = -info.velocity.x / config.velocityDivisor;

    let totalShift = Math.round(distanceShift + velocityShift);
    totalShift = Math.max(-3, Math.min(3, totalShift));

    const target = Math.round(startProgress.current) + totalShift;

    animate(scrollProgress, target, {
      type: "spring",
      stiffness: 200,
      damping: 30,
      mass: 1,
    });
  };

  const step = (dir: number) => {
    animate(scrollProgress, Math.round(scrollProgress.get()) + dir, {
      type: "spring",
      stiffness: 200,
      damping: 30,
      mass: 1,
    });
  };

  return (
    <div className={cn("flex w-full flex-col items-center", className)}>
      <div className="relative flex h-[26rem] w-full items-center justify-center md:h-[32rem]">
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0}
          onDragStart={handleDragStart}
          onDrag={(_, info) => {
            const delta = -info.delta.x / config.sensitivity;
            scrollProgress.set(scrollProgress.get() + delta);
          }}
          onDragEnd={handleDragEnd}
          className="absolute inset-0 z-50 cursor-grab active:cursor-grabbing"
        />

        {slides.map((slide, i) => (
          <Card
            key={slide.title}
            slide={slide}
            index={i}
            total={total}
            progress={scrollProgress}
            config={config}
          />
        ))}
      </div>

      <div className="mt-6 flex items-center gap-3">
        <button
          type="button"
          onClick={() => step(-1)}
          className="rounded-full border border-border px-4 py-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
        >
          Prev
        </button>
        <button
          type="button"
          onClick={() => step(1)}
          className="rounded-full border border-border px-4 py-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
        >
          Next
        </button>
      </div>
    </div>
  );
};

interface CardProps {
  slide: Slide;
  index: number;
  total: number;
  progress: MotionValue<number>;
  config: CarouselConfig;
}

const Card = ({ slide, index, total, progress, config }: CardProps) => {
  const offset = useTransform(progress, (p) => {
    let diff = (index - p) % total;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    return diff;
  });

  const x = useTransform(offset, (o) => o * config.xMultiplier);
  const rotate = useTransform(offset, (o) =>
    Math.abs(o) < 0.05 ? 0 : o * config.rotationMultiplier,
  );
  const y = useTransform(offset, (o) =>
    Math.abs(o) < 0.05 ? 0 : Math.abs(o) * config.yMultiplier,
  );
  const scale = useTransform(offset, (o) => 1 - Math.abs(o) * config.scaleReduction);
  const opacity = useTransform(
    offset,
    total > 2 ? [-total / 2, -total / 2 + 0.5, 0, total / 2 - 0.5, total / 2] : [-1, 0, 1],
    total > 2 ? [0, 1, 1, 1, 0] : [1, 1, 1],
  );
  const zIndex = useTransform(offset, (o) => Math.round(100 - Math.abs(o) * 10));

  return (
    <motion.div
      style={{ x, y, rotate, scale, opacity, zIndex }}
      className="absolute h-[22rem] w-[82vw] max-w-[19rem] overflow-hidden rounded-2xl border border-border bg-card shadow-[0_30px_80px_-40px_rgba(0,0,0,0.9)] sm:h-[24rem] sm:w-[19rem] md:h-[30rem] md:w-[24rem]"
    >
      <img
        src={slide.image}
        alt={slide.title}
        loading="lazy"
        draggable={false}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />

      <Badge className="absolute left-5 top-5 font-mono text-[10px] uppercase tracking-[0.2em]">
        {slide.badge}
      </Badge>

      <div className="absolute inset-x-0 bottom-0 p-6">
        <h3 className="font-display text-2xl uppercase tracking-tight text-foreground md:text-3xl">
          {slide.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{slide.description}</p>
        {slide.href ? (
          <a
            href={slide.href}
            target="_blank"
            rel="noreferrer"
            className="relative z-[60] mt-4 inline-flex border-b border-foreground/30 pb-1 text-xs uppercase tracking-[0.2em] text-foreground transition-colors hover:border-foreground"
          >
            Visit website
          </a>
        ) : null}
      </div>
    </motion.div>
  );
};

export default CarouselStacked;
