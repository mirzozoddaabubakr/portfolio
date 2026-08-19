import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { motion } from "framer-motion";

interface ScrollExpandMediaProps {
  mediaType?: "video" | "image";
  mediaSrc: string;
  posterSrc?: string;
  bgImageSrc: string;
  title?: string;
  date?: string;
  scrollToExpand?: string;
  textBlend?: boolean;
  children?: ReactNode;
}

const ScrollExpandMedia = ({
  mediaType = "video",
  mediaSrc,
  posterSrc,
  bgImageSrc,
  title,
  date,
  scrollToExpand,
  textBlend,
  children,
}: ScrollExpandMediaProps) => {
  const [showContent, setShowContent] = useState<boolean>(false);
  const [mediaFullyExpanded, setMediaFullyExpanded] = useState<boolean>(false);

  const sectionRef = useRef<HTMLDivElement | null>(null);
  const mediaBoxRef = useRef<HTMLDivElement | null>(null);
  const bgRef = useRef<HTMLDivElement | null>(null);
  const mediaOverlayRef = useRef<HTMLDivElement | null>(null);
  const dateRef = useRef<HTMLParagraphElement | null>(null);
  const expandRef = useRef<HTMLParagraphElement | null>(null);
  const titleFirstRef = useRef<HTMLHeadingElement | null>(null);
  const titleRestRef = useRef<HTMLSpanElement | null>(null);

  const progressRef = useRef(0);
  const expandedRef = useRef(false);
  const isMobileRef = useRef(false);
  const frameRef = useRef<number | null>(null);

  // Writes the expansion directly to the DOM so a wheel gesture never
  // re-renders the rest of the page.
  const paint = useCallback(() => {
    frameRef.current = null;
    const p = progressRef.current;
    const mobile = isMobileRef.current;

    const width = 300 + p * (mobile ? 650 : 1250);
    const height = 400 + p * (mobile ? 200 : 400);
    const tx = p * (mobile ? 180 : 150);

    if (mediaBoxRef.current) {
      mediaBoxRef.current.style.width = `${width}px`;
      mediaBoxRef.current.style.height = `${height}px`;
    }
    if (bgRef.current) bgRef.current.style.opacity = String(1 - p);
    if (mediaOverlayRef.current) {
      mediaOverlayRef.current.style.opacity = String(0.7 - p * 0.3);
    }
    if (dateRef.current) dateRef.current.style.transform = `translateX(-${tx}vw)`;
    if (expandRef.current) expandRef.current.style.transform = `translateX(${tx}vw)`;
    if (titleFirstRef.current) titleFirstRef.current.style.transform = `translateX(-${tx}vw)`;
    if (titleRestRef.current) titleRestRef.current.style.transform = `translateX(${tx}vw)`;
  }, []);

  const schedulePaint = useCallback(() => {
    if (frameRef.current !== null) return;
    frameRef.current = requestAnimationFrame(paint);
  }, [paint]);

  useEffect(() => {
    isMobileRef.current = window.innerWidth < 768;
    paint();

    const checkIfMobile = () => {
      isMobileRef.current = window.innerWidth < 768;
      schedulePaint();
    };
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, [paint, schedulePaint]);

  useEffect(() => {
    let touchStartY = 0;

    const expand = () => {
      expandedRef.current = true;
      setMediaFullyExpanded(true);
      setShowContent(true);
      window.dispatchEvent(new Event("heroExpanded"));
    };

    const beginCollapse = () => {
      expandedRef.current = false;
      setMediaFullyExpanded(false);
      window.dispatchEvent(new Event("heroCollapsed"));
    };

    const advance = (delta: number) => {
      const next = Math.min(Math.max(progressRef.current + delta, 0), 1);
      progressRef.current = next;
      schedulePaint();

      if (next >= 1) {
        expand();
      } else if (next < 0.75) {
        setShowContent(false);
      }
    };

    const handleWheel = (e: globalThis.WheelEvent) => {
      const dy = e.deltaY * (e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? 100 : 1);
      if (expandedRef.current) {
        if (dy < 0 && window.scrollY <= 5) {
          e.preventDefault();
          beginCollapse();
          advance(dy * 0.0009);
        }
        return;
      }
      e.preventDefault();
      advance(dy * 0.0009);
    };

    const handleTouchStart = (e: globalThis.TouchEvent) => {
      touchStartY = e.touches[0]?.clientY ?? 0;
    };

    const handleTouchMove = (e: globalThis.TouchEvent) => {
      if (!touchStartY) return;
      const touchY = e.touches[0]?.clientY ?? 0;
      const deltaY = touchStartY - touchY;

      if (expandedRef.current) {
        if (deltaY < 0 && window.scrollY <= 5) {
          e.preventDefault();
          beginCollapse();
          advance(deltaY * 0.008);
          touchStartY = touchY;
        }
        return;
      }
      e.preventDefault();
      advance(deltaY * (deltaY < 0 ? 0.008 : 0.005));
      touchStartY = touchY;
    };

    const handleTouchEnd = () => {
      touchStartY = 0;
    };

    const handleScroll = () => {
      if (!expandedRef.current && window.scrollY !== 0) {
        window.scrollTo(0, 0);
      }
    };

    const handleGoto = (e: Event) => {
      const targetId = (e as CustomEvent<string>).detail;
      progressRef.current = 1;
      paint();
      expand();
      setTimeout(() => {
        if (!targetId || targetId === "home") {
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 80);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: false });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd);
    window.addEventListener("nav:goto", handleGoto);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("nav:goto", handleGoto);
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, [schedulePaint]);

  const firstWord = title ? title.split(" ")[0] : "";
  const restOfTitle = title ? title.split(" ").slice(1).join(" ") : "";

  return (
    <div ref={sectionRef} className="transition-colors duration-700 ease-in-out overflow-x-hidden">
      <section className="relative flex flex-col items-center justify-start min-h-[100dvh] overflow-x-hidden">
        <div className="relative w-full flex flex-col items-center min-h-[100dvh] overflow-x-hidden">
          <div ref={bgRef} className="absolute inset-0 z-0 h-full will-change-[opacity]">
            <img
              src={bgImageSrc}
              alt="Workspace background"
              className="w-full h-full"
              style={{ objectFit: "cover", objectPosition: "center" }}
            />
            <div className="absolute inset-0 bg-background/60" />
          </div>

          <div className="container mx-auto flex flex-col items-center justify-start relative z-10">
            <div className="flex flex-col items-center justify-center w-full h-[100dvh] relative">
              <div
                ref={mediaBoxRef}
                className="absolute z-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-none rounded-2xl will-change-[width,height]"
                style={{
                  width: "300px",
                  height: "400px",
                  maxWidth: "95vw",
                  maxHeight: "85vh",
                  boxShadow: "0px 0px 60px rgba(0, 0, 0, 0.45)",
                }}
              >
                {mediaType === "video" ? (
                  <div className="relative w-full h-full pointer-events-none">
                    <video
                      src={mediaSrc}
                      poster={posterSrc}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="auto"
                      className="w-full h-full object-cover rounded-xl"
                      controls={false}
                      disablePictureInPicture
                      disableRemotePlayback
                    />
                    <div
                      ref={mediaOverlayRef}
                      className="absolute inset-0 bg-background/40 rounded-xl"
                      style={{ opacity: 0.7 }}
                    />
                  </div>
                ) : (
                  <div className="relative w-full h-full">
                    <img
                      src={mediaSrc}
                      alt={title || "Media content"}
                      className="w-full h-full object-cover rounded-xl"
                    />
                    <div
                      ref={mediaOverlayRef}
                      className="absolute inset-0 bg-background/60 rounded-xl"
                      style={{ opacity: 0.7 }}
                    />
                  </div>
                )}

                <div className="flex flex-col items-center text-center relative z-10 mt-4 transition-none">
                  {date && (
                    <p
                      ref={dateRef}
                      className="text-xl tracking-[0.35em] uppercase text-muted-foreground"
                    >
                      {date}
                    </p>
                  )}
                  {scrollToExpand && (
                    <p
                      ref={expandRef}
                      className="text-muted-foreground text-sm tracking-[0.2em] uppercase text-center mt-2"
                    >
                      {scrollToExpand}
                    </p>
                  )}
                </div>
              </div>

              <div
                className={`flex items-center justify-center text-center gap-2 w-full relative z-10 transition-none flex-col ${
                  textBlend ? "mix-blend-difference" : "mix-blend-normal"
                }`}
              >
                <h1
                  ref={titleFirstRef}
                  className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl uppercase tracking-tight text-foreground transition-none"
                >
                  {firstWord}
                </h1>
                <span
                  ref={titleRestRef}
                  className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl uppercase tracking-tight text-center text-foreground transition-none"
                >
                  {restOfTitle}
                </span>
              </div>
            </div>

            <motion.section
              className="flex flex-col w-full px-8 py-10 md:px-16 lg:py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: showContent ? 1 : 0 }}
              transition={{ duration: 0.7 }}
            >
              {children}
            </motion.section>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ScrollExpandMedia;
