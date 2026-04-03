"use client"

import { useState, useEffect } from 'react';

export default function Viewfinder() {
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCoords({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 z-[50] pointer-events-none overflow-hidden">
      {/* 🔳 DYNAMIC ADAPTIVE CORNER BRACKETS 🔳 */}
      <div className="absolute top-[10vh] md:top-20 left-[5vw] md:left-20 w-8 md:w-12 h-8 md:h-12 border-l border-t border-white/20" />
      <div className="absolute top-[10vh] md:top-20 right-[5vw] md:right-20 w-8 md:w-12 h-8 md:h-12 border-r border-t border-white/20" />
      <div className="absolute bottom-[10vh] md:bottom-20 left-[5vw] md:left-20 w-8 md:w-12 h-8 md:h-12 border-l border-b border-white/20" />
      <div className="absolute bottom-[10vh] md:bottom-20 right-[5vw] md:right-20 w-8 md:w-12 h-8 md:h-12 border-r border-b border-white/20" />

      {/* 🔳 CENTRAL CROSSHAIR 🔳 */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 opacity-40">
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-[#99ff33]/40" />
        <div className="absolute left-1/2 top-0 h-full w-[1px] bg-[#99ff33]/40" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-[#99ff33] rounded-full animate-pulse" />
      </div>

      {/* 🔳 TRACKING COORDINATES (DESKTOP ONLY) 🔳 */}
      <div className="hidden md:flex absolute bottom-[220px] left-[60px] flex-col gap-1">
        <div className="text-[0.55rem] font-bold tracking-[0.3em] text-[#99ff33] uppercase">LOCATOR_ACTIVE</div>
        <div className="text-[0.5rem] font-medium tracking-[0.1em] text-white/40">
            X_{coords.x.toString().padStart(4, '0')}<br/>
            Y_{coords.y.toString().padStart(4, '0')}
        </div>
      </div>

      {/* 🔳 ROTATING SCANNER (RIGHT - MOBILE HIDE ON SMALL) 🔳 */}
      <div className="hidden sm:flex absolute bottom-40 right-20 items-center gap-4">
         <div className="text-[0.5rem] font-bold tracking-[0.4em] text-white/30 uppercase vertical-text">SCAN_ANALYSIS</div>
         <div className="w-16 h-16 border border-dotted border-white/10 rounded-full animate-spin-slow flex items-center justify-center">
            <div className="w-1 h-full bg-[#99ff33]/20 animate-pulse" />
         </div>
      </div>

      <style jsx>{`
        .vertical-text {
            writing-mode: vertical-rl;
            text-orientation: mixed;
        }
      `}</style>
    </div>
  );
}
