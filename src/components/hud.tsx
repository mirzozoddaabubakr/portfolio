"use client"

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

// Total scroll phases: 0 (Intro), 1 (Genesis), 2 (Research), 3 (Stack), 4 (Works), 5 (Global), 6 (Initiate)
const TOTAL_PHASES = 7;
const CONTENT_SECTIONS = 6;

export default function HUD() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [pageRotation, setPageRotation] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      const totalScrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = scrollPos / totalScrollHeight;
      
      const fractionalIdx = scrollPercent * TOTAL_PHASES;
      const idx = Math.min(Math.floor(fractionalIdx), TOTAL_PHASES - 1);
      setActiveIdx(idx);

      let currentSectionProgress = fractionalIdx - idx;
      if (currentSectionProgress < 0) currentSectionProgress = 0;
      if (scrollPercent >= 0.99) currentSectionProgress = 1;
      setPageRotation(currentSectionProgress);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ─── MOBILE: tiny dot-bar along the right edge ───────────────────────────
  const MobileHUD = () => (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 flex flex-col items-center gap-3 z-[400] pr-2 pointer-events-none">
      {/* thin track line */}
      <div className="absolute inset-y-0 right-[7px] w-px bg-white/10" />
      {/* fill line - only starts filling after phase 0 */}
      <div
        className="absolute top-0 right-[7px] w-px bg-gradient-to-b from-[#00ffff] to-[#ff00ff] shadow-[0_0_6px_#00ffff] transition-all duration-100"
        style={{ 
          height: activeIdx === 0 ? '0%' : `${(((activeIdx - 1) + pageRotation) / CONTENT_SECTIONS) * 100}%` 
        }}
      />
      {Array.from({ length: CONTENT_SECTIONS }).map((_, i) => {
        // activeIdx 1 maps to node i=0
        const isPast = (activeIdx - 1) > i;
        const isActive = (activeIdx - 1) === i;
        const progress = isActive ? pageRotation : (isPast ? 1 : 0);
        const radius = 5;
        const circumference = 2 * Math.PI * radius;
        const strokeDashoffset = circumference - progress * circumference;

        return (
          <div key={i} className="relative w-4 h-4 flex items-center justify-center">
            <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 16 16">
              <circle cx="8" cy="8" r={radius} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1.2" />
              {progress > 0 && (
                <circle
                  cx="8" cy="8" r={radius}
                  fill="none"
                  stroke={isActive ? "#00ffff" : "#ff00ff"}
                  strokeWidth="1.5"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  className="transition-all duration-100 ease-linear"
                />
              )}
            </svg>
            <div className={cn(
              "w-1.5 h-1.5 rounded-full transition-all duration-300",
              isActive ? "bg-[#00ffff] shadow-[0_0_6px_#00ffff]" :
              isPast ? "bg-[#ff00ff]/70" : "bg-white/20"
            )} />
          </div>
        );
      })}
    </div>
  );

  // ─── DESKTOP: full numbered node graph ───────────────────────────────────
  const DesktopHUD = () => (
    <div className="fixed right-12 top-1/2 -translate-y-1/2 flex flex-col items-center z-[400] pointer-events-none">
      
      {/* Header badge - hidden in Intro phase */}
      <div className={cn(
        "absolute top-[-90px] right-2 text-right opacity-90 backdrop-blur-xl bg-black/40 p-2.5 border-l-2 border-[#00ffff] rounded shadow-[0_0_15px_rgba(0,255,255,0.2)] transition-all duration-500",
        activeIdx === 0 ? "translate-x-20 opacity-0" : "translate-x-0 opacity-100"
      )}>
        <div className="text-[0.55rem] font-mono text-[#00ffff] tracking-[0.4em] uppercase mb-1">STARK.ARCHIVE_SYNC</div>
        <div className="text-[0.45rem] font-mono text-white/70 tracking-[0.2em]">{`NODE_${Math.max(1, activeIdx).toString().padStart(2, '0')} // SECURE`}</div>
      </div>

      {/* Track lines */}
      <div className="absolute right-[23.5px] top-[20px] bottom-[20px] w-0.5 bg-white/5 -z-10" />
      <div
        className="absolute right-[23.5px] top-[20px] w-0.5 bg-gradient-to-b from-[#00ffff] to-[#ff00ff] shadow-[0_0_10px_#00ffff] -z-10 transition-all duration-[50ms]"
        style={{ 
          height: activeIdx === 0 ? '0%' : `calc(${(((activeIdx - 1) + pageRotation) / CONTENT_SECTIONS) * 100}% - 40px)` 
        }}
      />

      <div className="flex flex-col gap-10">
        {Array.from({ length: CONTENT_SECTIONS }).map((_, i) => {
          const isPast = (activeIdx - 1) > i;
          const isActive = (activeIdx - 1) === i;
          const progress = isActive ? pageRotation : (isPast ? 1 : 0);
          const radius = 18;
          const circumference = 2 * Math.PI * radius;
          const strokeDashoffset = circumference - progress * circumference;

          return (
            <div key={i} className="relative flex flex-col items-center group">
              <div className="relative w-12 h-12 flex items-center justify-center">
                <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 44 44">
                  <circle cx="22" cy="22" r={radius} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                  {progress > 0 && (
                    <circle
                      cx="22" cy="22" r={radius}
                      fill="none"
                      stroke={isActive ? "#00ffff" : "#ff00ff"}
                      strokeWidth="2.5"
                      strokeDasharray={circumference}
                      strokeDashoffset={strokeDashoffset}
                      className={cn("transition-all duration-100 ease-linear", isActive && "filter drop-shadow-[0_0_6px_rgba(0,255,255,0.8)]")}
                    />
                  )}
                </svg>
                <div className={cn(
                  "font-mono text-[0.6rem] tracking-widest transition-all duration-500 rounded-full w-7 h-7 flex items-center justify-center",
                  isActive ? "text-[#00ffff] font-bold bg-[#00ffff]/10 shadow-[inset_0_0_8px_rgba(0,255,255,0.5)]" :
                  (isPast ? "text-[#ff00ff] font-medium" : "text-white/30")
                )}>
                  0{i + 1}
                </div>
              </div>
              {isActive && (
                <div className="absolute right-16 top-1/2 -translate-y-1/2 whitespace-nowrap opacity-100 transition-all duration-500 flex items-center gap-3">
                  <div className="h-px w-8 bg-gradient-to-r from-transparent to-[#00ffff]/80" />
                  <div className="backdrop-blur-sm bg-[#00ffff]/5 p-1.5 border border-[#00ffff]/20 rounded-sm">
                    <div className="text-[0.55rem] font-mono tracking-[0.2em] text-[#00ffff] text-right drop-shadow-[0_0_5px_rgba(0,255,255,0.5)] uppercase">
                      {['SYSTEM', 'RESEARCH', 'STACK', 'WORKS', 'GLOBAL', 'INITIATE'][i]}_PHASE
                    </div>
                    <div className="text-[0.4rem] font-mono tracking-widest text-[#ff00ff] text-right uppercase mt-1 animate-pulse">
                      {Math.floor(progress * 100)}% // DEPLOYING
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom badge */}
      <div className={cn(
        "absolute bottom-[-90px] right-2 text-right opacity-90 mt-8 backdrop-blur-xl bg-black/40 p-2.5 border-r-2 border-[#ff00ff] rounded shadow-[0_0_15px_rgba(255,0,255,0.2)] transition-all duration-500",
        activeIdx === 0 ? "translate-x-20 opacity-0" : "translate-x-0 opacity-100"
      )}>
        <div className="text-[0.45rem] font-mono text-white/50 tracking-[0.3em] uppercase">ABSOLUTE_VECTOR</div>
        <div className="text-[0.5rem] font-mono text-[#ff00ff] tracking-[0.2em] mt-1">{`X_${Math.floor(pageRotation*999).toString().padStart(3,'0')} // Z_199`}</div>
      </div>
    </div>
  );

  return (
    <>
      <div className="md:hidden"><MobileHUD /></div>
      <div className="hidden md:block"><DesktopHUD /></div>
    </>
  );
}
