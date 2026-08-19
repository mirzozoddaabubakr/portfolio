import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

import { cn } from "@/lib/utils";

const links = [
  { id: "home", label: "Home", index: "01" },
  { id: "designs", label: "Design", index: "02" },
  { id: "process", label: "Process", index: "03" },
  { id: "comparison", label: "Why Me", index: "04" },
  { id: "skills", label: "Skills", index: "05" },
  { id: "about", label: "About", index: "06" },
  { id: "feedback", label: "Feedback", index: "07" },
  { id: "contact", label: "Contact", index: "08" },
];

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!rootRef.current) return;
    const ctx = gsap.context(() => {
      const wrap = rootRef.current!.querySelector(".nav-overlay-wrapper");
      const panels = rootRef.current!.querySelectorAll(".backdrop-layer");
      const overlay = rootRef.current!.querySelector(".nav-scrim");
      const items = rootRef.current!.querySelectorAll(".nav-link-inner");
      const fades = rootRef.current!.querySelectorAll("[data-menu-fade]");
      const ease = "power3.inOut";

      if (open) {
        const tl = gsap.timeline();
        tl.set(wrap, { display: "block" })
          .fromTo(overlay, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4, ease }, 0)
          .fromTo(panels, { xPercent: 101 }, { xPercent: 0, stagger: 0.09, duration: 0.6, ease }, 0)
          .fromTo(
            items,
            { yPercent: 140, rotate: 8 },
            { yPercent: 0, rotate: 0, stagger: 0.05, duration: 0.6, ease },
            0.35,
          )
          .fromTo(
            fades,
            { autoAlpha: 0, y: 24 },
            { autoAlpha: 1, y: 0, stagger: 0.05, duration: 0.5, ease, clearProps: "all" },
            0.5,
          );
      } else {
        gsap
          .timeline()
          .to(overlay, { autoAlpha: 0, duration: 0.35, ease })
          .to(panels, { xPercent: 101, duration: 0.45, ease }, 0)
          .set(wrap, { display: "none" });
      }
    }, rootRef);
    return () => ctx.revert();
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    // Dispatch a custom event so the hero can force-expand itself first,
    // lifting the scroll lock before we try to navigate to any section.
    window.setTimeout(() => {
      window.dispatchEvent(new CustomEvent("nav:goto", { detail: id }));
    }, 320);
  };

  return (
    <header
      ref={rootRef}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled && !open
          ? "border-b border-border bg-background/80 backdrop-blur"
          : "bg-transparent",
      )}
    >
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between gap-6 px-6 py-4">
        <button
          type="button"
          onClick={() => go("home")}
          className="relative z-[60] font-display text-lg uppercase tracking-tight text-foreground"
        >
          Abuw
        </button>

        <div className="hidden items-center gap-4 lg:gap-6 md:flex">
          {links.map((l) => (
            <button
              key={l.id}
              type="button"
              onClick={() => go(l.id)}
              className="font-mono text-[10px] lg:text-[11px] uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          className="relative z-[60] flex items-center gap-3 border border-border bg-background/60 px-4 py-2 backdrop-blur transition-colors hover:border-foreground md:border-0 md:bg-transparent md:px-0 md:backdrop-blur-none"
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-foreground">
            {open ? "Close" : "Menu"}
          </span>
          <span className="flex flex-col gap-[5px]">
            <span
              className={cn(
                "block h-px w-6 bg-foreground transition-transform duration-300",
                open && "translate-y-[3px] rotate-45",
              )}
            />
            <span
              className={cn(
                "block h-px w-6 bg-foreground transition-transform duration-300",
                open && "-translate-y-[3px] -rotate-45",
              )}
            />
          </span>
        </button>
      </nav>

      {/* Overlay menu */}
      <div className="nav-overlay-wrapper fixed inset-0 z-40 hidden">
        <div
          className="nav-scrim absolute inset-0 bg-background/70 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
        <div className="absolute inset-y-0 right-0 w-full max-w-xl">
          <div className="backdrop-layer absolute inset-0 bg-secondary" />
          <div className="backdrop-layer absolute inset-0 border-l border-border bg-card" />
          <div className="backdrop-layer absolute inset-0 border-l border-border bg-background" />

          <div className="relative flex h-full flex-col justify-between overflow-y-auto px-6 pt-24 pb-8 sm:px-12 sm:pt-28 sm:pb-10">
            <ul className="flex flex-col gap-1 sm:gap-2">
              {links.map((l) => (
                <li key={l.id} className="overflow-hidden">
                  <button
                    type="button"
                    onClick={() => go(l.id)}
                    className="nav-link-inner group flex w-full items-baseline gap-4 py-1 text-left sm:gap-5"
                  >
                    <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.25em] sm:tracking-[0.3em] text-muted-foreground">
                      {l.index}
                    </span>
                    <span className="font-display text-3xl uppercase leading-[0.95] tracking-tight text-foreground transition-colors duration-300 group-hover:text-accent sm:text-5xl md:text-6xl">
                      {l.label}
                    </span>
                  </button>
                </li>
              ))}
            </ul>

            <div className="flex flex-col gap-6 border-t border-border pt-8">
              <div data-menu-fade className="flex flex-col gap-1">
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                  Email
                </span>
                <a
                  href="mailto:mirzozoddaabubakr@gmail.com"
                  className="text-sm text-foreground hover:text-accent"
                >
                  mirzozoddaabubakr@gmail.com
                </a>
              </div>
              <div data-menu-fade className="flex flex-wrap gap-5">
                <a
                  href="https://abuscoffee.vercel.app"
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground"
                >
                  Abu&apos;s Coffee
                </a>
                <a
                  href="https://nikegravity.vercel.app"
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground"
                >
                  Nike Gravity
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
