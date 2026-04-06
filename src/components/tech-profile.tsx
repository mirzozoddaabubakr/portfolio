"use client"

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import Typewriter from './typewriter';

export default function TechProfile() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scanner line animation
    if (scannerRef.current) {
      gsap.to(scannerRef.current, {
        y: '100%',
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }

    // Hexagon subtle pulse
    if (containerRef.current) {
      gsap.to(containerRef.current.querySelectorAll('.hex'), {
        opacity: 0.1,
        stagger: {
          each: 0.1,
          from: "random",
          repeat: -1,
          yoyo: true
        },
        duration: 1
      });
    }
  }, []);

  return (
    <div ref={containerRef} className="relative w-full aspect-[3/4] md:w-[300px] md:h-[400px] group pointer-events-auto">
      {/* JARVIS Corner Elements - Sleek & Modern */}
      <div className="absolute top-4 left-4 w-6 h-6 border-t-[1.5px] border-l-[1.5px] border-[#00ffff] opacity-80 rounded-tl-xl" />
      <div className="absolute top-4 right-4 w-6 h-6 border-t-[1.5px] border-r-[1.5px] border-[#00ffff] opacity-80 rounded-tr-xl" />
      <div className="absolute bottom-4 left-4 w-6 h-6 border-b-[1.5px] border-l-[1.5px] border-[#ff00ff] opacity-80 rounded-bl-xl" />
      <div className="absolute bottom-4 right-4 w-6 h-6 border-b-[1.5px] border-r-[1.5px] border-[#ff00ff] opacity-80 rounded-br-xl" />

      {/* Main Glassmorphism Container - Professional Rounded */}
      <div className="absolute inset-0 bg-white/5 backdrop-blur-2xl rounded-[2.5rem] border border-white/10 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_0_0_1px_rgba(0,255,255,0.1)]">
        
        {/* Background Grid/Hex Pattern (Simplified with SVG logic) */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#00ffff] via-transparent to-transparent pointer-events-none" />
        <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <pattern id="hexagons" width="20" height="34.64" patternUnits="userSpaceOnUse" patternTransform="scale(0.5)">
                    <path className="hex" fill="none" stroke="#00ffff" strokeWidth="1" d="M10,0 L20,5.77 L20,17.32 L10,23.09 L0,17.32 L0,5.77 Z"/>
                    <path className="hex" fill="none" stroke="#00ffff" strokeWidth="1" d="M10,34.64 L20,28.87 L20,17.32 L10,11.55 L0,17.32 L0,28.87 Z"/>
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hexagons)"/>
        </svg>

        {/* The Holographic Photo Container - Ultra Rounded */}
        <div className="absolute inset-[18px] overflow-hidden rounded-[1.8rem] border border-white/5 shadow-[inset_0_0_30px_rgba(0,0,0,0.8)]">
          
          {/* Base image stripped of original colors, high contrast */}
          <Image 
             src="/me.webp" 
             alt="Abubakr Mirzozoda" 
             fill
             priority
             sizes="(max-width: 768px) 120px, 300px"
             className="object-cover opacity-95 filter grayscale contrast-110 brightness-105 mix-blend-luminosity"
          />
          
          {/* Holographic Duotone Color Tint Overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#00ffff]/60 via-transparent to-[#ff00ff]/60 mix-blend-color pointer-events-none" />
          
          {/* Scanline Texture Overlay */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjIiIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iMC4yIi8+PC9zdmc+')] opacity-50 pointer-events-none mix-blend-overlay" />
          
          {/* Bottom Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20 pointer-events-none" />
        </div>

        {/* Rotating Circular HUD Elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 pointer-events-none">
          <svg className="absolute inset-0 w-full h-full animate-[spin_10s_linear_infinite]" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="none" stroke="#00ffff" strokeWidth="0.5" strokeDasharray="4 8" opacity="0.4"/>
            <path d="M 50 5 A 45 45 0 0 1 95 50" fill="none" stroke="#00ffff" strokeWidth="1.5" opacity="0.8"/>
          </svg>
          <svg className="absolute inset-0 w-full h-full animate-[spin_7s_linear_infinite_reverse]" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="35" fill="none" stroke="#ff00ff" strokeWidth="1" strokeDasharray="15 5 2 5" opacity="0.6"/>
          </svg>
        </div>

        {/* Sleek Scanner Beam */}
        <div ref={scannerRef} className="absolute left-0 right-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#00ffff] to-transparent shadow-[0_0_10px_#00ffff] opacity-80 z-10" />

        {/* Status Text Overlays - Modern Glass Placement */}
        <div className="absolute bottom-6 left-6 max-w-[80%] font-mono text-[0.55rem] text-white leading-relaxed tracking-[0.2em] opacity-90 backdrop-blur-md bg-black/40 p-2.5 rounded border border-[#00ffff]/20 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
          <div className="text-[#ff00ff] font-bold mb-1">ID_VERIFIED // ACTIVE</div>
          <div className="h-[1.2rem] flex items-center">
             <Typewriter texts={['sys.boot("ABUBAKR");', 'role: FULL-STACK DEV', 'loc: TAJIKISTAN // TJ']} />
          </div>
          <div className="text-white/50 text-[0.45rem]">FREELANCE · 2 YRS EXP · MIT-OPEN</div>
        </div>
        
        {/* Decorative Data Bars */}
        <div className="absolute right-8 bottom-8 flex gap-1.5 items-end h-8 opacity-80">
            <div className="w-1.5 rounded-t-full bg-[#00ffff] h-full animate-[pulse_1s_ease-in-out_infinite] shadow-[0_0_5px_#00ffff]" />
            <div className="w-1.5 rounded-t-full bg-white/60 h-2/3" />
            <div className="w-1.5 rounded-t-full bg-[#ff00ff] h-1/2 animate-[pulse_2s_ease-in-out_infinite] shadow-[0_0_5px_#ff00ff]" />
            <div className="w-1.5 rounded-t-full bg-white/40 h-4/5" />
        </div>

      </div>
    </div>
  );
}
