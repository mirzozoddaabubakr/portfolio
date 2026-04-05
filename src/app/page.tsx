"use client"

import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import dynamic from 'next/dynamic';

const Scene3D = dynamic(() => import('@/components/scene-3d'), { ssr: false });
const HUD = dynamic(() => import('@/components/hud'), { ssr: false });
const Viewfinder = dynamic(() => import('@/components/viewfinder'), { ssr: false });
const TechProfile = dynamic(() => import('@/components/tech-profile'), { ssr: false });
const TerminalContact = dynamic(() => import('@/components/terminal-contact'), { ssr: false });

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const cursor = document.getElementById('cursor');
      if (cursor) {
        gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.1 });
      }
    };
    window.addEventListener('mousemove', handleMouseMove);

    let ctx = gsap.context(() => {
      requestAnimationFrame(() => {
        const sections = gsap.utils.toArray<HTMLElement>('.oryzo-section');
        
        // Initial State: Explicitly hide everything except Section 0
        gsap.set(sections, { autoAlpha: 0 });
        gsap.set(sections[0], { autoAlpha: 1 });

        const masterTl = gsap.timeline({
          scrollTrigger: {
            trigger: "#scroll-space",
            start: "top top",
            end: "bottom bottom",
            scrub: 1.2,
          }
        });

        sections.forEach((section, i) => {
          if (i === 0) return;
          
          const current = section;
          const prev = sections[i-1];
          const startTime = i;

          const currentTargets = current.querySelectorAll('.right-target');

          masterTl.to(prev, { 
            autoAlpha: 0, 
            duration: 0.4, 
            ease: "power2.inOut" 
          }, startTime - 0.2);
                  
          masterTl.to(current, { 
            autoAlpha: 1, 
            duration: 0.5, 
            ease: "power2.inOut" 
          }, startTime);
                  
          masterTl.fromTo(currentTargets, 
            { x: 80, autoAlpha: 0 }, 
            { x: 0, autoAlpha: 1, duration: 0.6, ease: "power3.out" }, 
            startTime + 0.1
          );
        });
      });
    }, containerRef);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      ctx.revert();
    };
  }, []);

  return (
    <main ref={containerRef} className="relative min-h-screen">
      <div className="vignette" />
      <Viewfinder />
      
      <div id="cursor" className="fixed top-0 left-0 w-1.5 h-1.5 bg-[#00ffff] rounded-full pointer-events-none z-[10000] -translate-x-1/2 -translate-y-1/2" />
      
      <HUD />
      <Scene3D />
      
      <div id="scroll-space" className="h-[700vh] w-full" />

      <div id="overlay" className="fixed inset-0 pointer-events-none z-[100]">

        {/* 0. INTRO (Blank) */}
        <section className="oryzo-section pointer-events-none" id="s0" />

        {/* 1. GENESIS */}
        <section className="oryzo-section" id="s1">
          <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="pointer-events-none mb-8 md:mb-0">
              <h1 className="h-massive">SYSTEM<br/>KINETIK</h1>
              <div className="metadata">/ 01.INITIATE . ABUBAKR_MIRZOZODA</div>
            </div>
            <div className="right-target text-left md:text-right">
              <p className="metadata mb-2 md:mb-4 text-[#00ffff]">/ CONCEPT_PHASE</p>
              <p className="p-desc md:ml-auto">Engineering monolithic digital architectures through high-fidelity scrollytelling and volumetric mural typography.</p>
            </div>
          </div>
        </section>

        {/* 2. RESEARCH */}
        <section className="oryzo-section" id="s2">
          <div className="w-full flex flex-row justify-between items-start md:items-center gap-4 md:gap-12">
            <div className="order-last md:order-first flex-shrink-0 pointer-events-auto">
               <div className="w-[120px] h-[160px] md:w-[300px] md:h-[400px]">
                 <TechProfile />
               </div>
            </div>
            <div className="flex-1 text-left md:text-right right-target">
              <p className="metadata mb-1.5 md:hidden text-[#ff00ff]">/ 02 · RESEARCH</p>
              <h1 className="h-massive">RESEARCH<br className="hidden md:block" /> REVOLUTION</h1>
              <div className="metadata hidden md:block">/ 02.RESEARCH . HISTORY</div>
              <p className="metadata mt-2 mb-4 text-[#ff00ff] hidden md:block">/ CORE_DEVELOPMENT</p>
              <p className="p-desc md:ml-auto mb-4">High-performance storefronts and custom web modules (2023 — PRES).</p>
              <div className="inline-block md:block mt-2 md:mt-8 p-1.5 md:p-3 border border-dotted border-[#ff00ff]/40 text-[#ff00ff] text-[0.45rem] md:text-[0.6rem] font-bold tracking-widest uppercase">
                STATUS: ACTIVE_COLLABORATION
              </div>
            </div>
          </div>
        </section>

        {/* 3. STACK */}
        <section className="oryzo-section" id="s3">
          <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="mb-8 md:mb-0">
              <h1 className="h-massive">THE<br/>CORE STACK</h1>
              <div className="metadata">/ 03.STACK . MODULES</div>
            </div>
            <div className="right-target w-full md:w-auto">
              <div className="grid grid-cols-3 md:grid-cols-2 gap-2 md:gap-4 mt-4 md:mt-8 md:w-[320px] md:ml-auto pointer-events-auto">
                {['REACT','GSAP','THREE.JS','NEXT.JS','NODE','MONGODB'].map(s => (
                  <div key={s} className="p-2 md:p-4 border border-white/10 text-[0.5rem] md:text-[0.65rem] font-bold tracking-wider md:tracking-[0.2em] uppercase text-white/50 md:text-white/60 hover:text-[#00ffff] hover:border-[#00ffff]/40 transition-all text-center md:text-left">{s}</div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 4. WORKS */}
        <section className="oryzo-section" id="s4">
          <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="mb-6 md:mb-0">
              <h1 className="h-massive">SELECTED<br/>WORKS</h1>
              <div className="metadata">/ 04.WORKS . ARCHITECTURE</div>
            </div>
            <div className="right-target text-left md:text-right">
              <p className="metadata mb-2 md:mb-4 text-[#ff00ff]">/ PROJECT_GALLERY</p>
              <p className="p-desc md:ml-auto">From world-class portfolio engines to secure digital libraries and custom e-commerce.</p>
            </div>
          </div>
        </section>

        {/* 5. GLOBAL */}
        <section className="oryzo-section" id="s5">
          <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="mb-8 md:mb-0">
              <h1 className="h-massive">GLOBALLY<br/>SCALED</h1>
              <div className="metadata">/ 05.GLOBAL . NETWORK</div>
            </div>
            <div className="right-target w-full md:w-auto text-left md:text-right">
              <p className="metadata mb-4 text-[#00ffff] hidden md:block">/ LANGUAGE_MATRIX</p>
              <div className="grid grid-cols-3 gap-x-4 md:gap-x-12 gap-y-3 md:gap-y-4 md:ml-auto">
                {[['TAJ','NAT.'],['PER','C2'],['ENG','C1'],['RUS','C1'],['SPA','A1'],['POL','A1']].map(([lang, level]) => (
                  <div key={lang} className="flex flex-col">
                    <span className="font-mono text-[0.65rem] md:text-[0.7rem] font-bold text-white tracking-widest">{lang}</span>
                    <span className="font-mono text-[0.45rem] md:text-[0.55rem] text-[#00ffff]">{level}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 6. INITIATE */}
        <section className="oryzo-section" id="s6">
          <div className="w-full h-full flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="mb-8 md:mb-0">
              <h1 className="h-massive">INITIATE<br/>PROJECT</h1>
              <div className="metadata">/ 06.TERMINAL . END_STEP</div>
            </div>
            <div className="right-target text-left md:text-right w-full md:w-auto">
              <p className="metadata mb-2 md:mb-4 text-[#ff00ff] hidden md:block">/ SECURE_CONNECTION_READY</p>
              <p className="p-desc mb-6 md:mb-8 md:ml-auto hidden md:block">Available for high-fidelity collaborations and robust digital architectures. Transmit your coordinates below.</p>
              <TerminalContact />
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
