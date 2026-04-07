"use client"

import { useEffect, useState } from 'react';
import gsap from 'gsap';
import dynamic from 'next/dynamic';

const Scene3D = dynamic(() => import('@/components/scene-3d'), { ssr: false });
const HUD = dynamic(() => import('@/components/hud'), { ssr: false });
const Viewfinder = dynamic(() => import('@/components/viewfinder'), { ssr: false });
const TechProfile = dynamic(() => import('@/components/tech-profile'), { ssr: false });
const TerminalContact = dynamic(() => import('@/components/terminal-contact'), { ssr: false });

const TOTAL_PHASES = 7; // 0 = intro, 1-6 = content

export default function Home() {
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    // Cursor follow
    const handleMouseMove = (e: MouseEvent) => {
      const cursor = document.getElementById('cursor');
      if (cursor) gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.1 });
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Simple scroll-based section reveal — no GSAP ScrollTrigger needed
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = Math.min(scrollPos / totalHeight, 1);
      const idx = Math.min(Math.floor(pct * TOTAL_PHASES), TOTAL_PHASES - 1);
      setActiveSection(idx);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Run once on mount

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Section is visible = opacity 1, otherwise 0. Transitions handled by CSS.
  const sectionStyle = (idx: number): React.CSSProperties => ({
    opacity: activeSection === idx ? 1 : 0,
    visibility: activeSection === idx ? 'visible' : 'hidden',
    transition: 'opacity 0.5s ease, visibility 0.5s ease',
    pointerEvents: activeSection === idx ? 'auto' : 'none',
  });

  return (
    <main className="relative min-h-screen">
      <div className="vignette" />
      <Viewfinder />

      <div id="cursor" className="fixed top-0 left-0 w-1.5 h-1.5 bg-[#00ffff] rounded-full pointer-events-none z-[10000] -translate-x-1/2 -translate-y-1/2" />

      <HUD />
      <Scene3D />

      <div id="scroll-space" className="h-[700vh] w-full" />

      <div id="overlay" className="fixed inset-0 pointer-events-none z-[100]">

        {/* 0. INTRO */}
        <section className="oryzo-section" id="s0" style={sectionStyle(0)} />

        {/* 1. FULL-STACK DEVELOPER */}
        <section className="oryzo-section" id="s1" style={sectionStyle(1)}>
          <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="pointer-events-none mb-8 md:mb-0">
              <h1 className="h-massive">FULL-STACK<br/>DEVELOPER</h1>
              <div className="metadata">/ 01 . INTRODUCTION . ABUBAKR MIRZOZODA</div>
            </div>
            <div className="text-left md:text-right" style={{ transform: activeSection === 1 ? 'translateX(0)' : 'translateX(60px)', transition: 'transform 0.6s ease 0.15s, opacity 0.5s ease', opacity: activeSection === 1 ? 1 : 0 }}>
              <p className="metadata mb-2 md:mb-4 text-[#00ffff]">/ FREELANCE . TAJIKISTAN</p>
              <p className="p-desc md:ml-auto">~2 years building responsive, modern websites and web applications — from sleek frontends to production-grade backends. Focused on clean design, performance, and bulletproof functionality.</p>
            </div>
          </div>
        </section>

        {/* 2. FREELANCE ENGINEER */}
        <section className="oryzo-section" id="s2" style={sectionStyle(2)}>
          <div className="w-full flex flex-row justify-between items-start md:items-center gap-4 md:gap-12">
            <div className="order-last md:order-first flex-shrink-0 pointer-events-auto">
               <div className="w-[120px] h-[160px] md:w-[300px] md:h-[400px]">
                 <TechProfile />
               </div>
            </div>
            <div className="flex-1 text-left md:text-right" style={{ transform: activeSection === 2 ? 'translateX(0)' : 'translateX(60px)', transition: 'transform 0.6s ease 0.15s, opacity 0.5s ease', opacity: activeSection === 2 ? 1 : 0 }}>
              <p className="metadata mb-1.5 md:hidden text-[#ff00ff]">/ 02 · EXPERIENCE</p>
              <h1 className="h-massive">FREELANCE<br className="hidden md:block" /> ENGINEER</h1>
              <div className="metadata hidden md:block">/ 02 . EXPERIENCE . 2023—PRESENT</div>
              <p className="metadata mt-2 mb-4 text-[#ff00ff] hidden md:block">/ FULL STACK DEVELOPMENT</p>
              <p className="p-desc md:ml-auto mb-4">Portfolio sites, Shopify stores, custom frontend UIs, backend API integrations, and performance-optimised web solutions for a growing international client base.</p>
              <div className="inline-block md:block mt-2 md:mt-8 p-1.5 md:p-3 border border-dotted border-[#ff00ff]/40 text-[#ff00ff] text-[0.45rem] md:text-[0.6rem] font-bold tracking-widest uppercase">
                STATUS: AVAILABLE FOR NEW PROJECTS
              </div>
            </div>
          </div>
        </section>

        {/* 3. STACK */}
        <section className="oryzo-section" id="s3" style={sectionStyle(3)}>
          <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="mb-8 md:mb-0">
              <h1 className="h-massive">THE<br/>CORE STACK</h1>
              <div className="metadata">/ 03 . STACK . CORE TECHNOLOGIES</div>
            </div>
            <div className="w-full md:w-auto" style={{ transform: activeSection === 3 ? 'translateX(0)' : 'translateX(60px)', transition: 'transform 0.6s ease 0.15s, opacity 0.5s ease', opacity: activeSection === 3 ? 1 : 0 }}>
              <div className="grid grid-cols-3 gap-2 md:gap-4 mt-4 md:mt-8 md:w-[360px] md:ml-auto pointer-events-auto">
                {['HTML5','CSS3','JAVASCRIPT','REACT.JS','NEXT.JS','NODE.JS','EXPRESS','MONGODB','SHOPIFY'].map(s => (
                  <div key={s} className="p-2 md:p-4 border border-white/10 text-[0.5rem] md:text-[0.65rem] font-bold tracking-wider md:tracking-[0.2em] uppercase text-white/50 md:text-white/60 hover:text-[#00ffff] hover:border-[#00ffff]/40 transition-all text-center md:text-left">{s}</div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 4. WORKS */}
        <section className="oryzo-section" id="s4" style={sectionStyle(4)}>
          <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="mb-6 md:mb-0">
              <h1 className="h-massive">SELECTED<br/>WORKS</h1>
              <div className="metadata">/ 04 . WORKS . PROJECTS</div>
            </div>
            <div className="text-left md:text-right" style={{ transform: activeSection === 4 ? 'translateX(0)' : 'translateX(60px)', transition: 'transform 0.6s ease 0.15s, opacity 0.5s ease', opacity: activeSection === 4 ? 1 : 0 }}>
              <p className="metadata mb-2 md:mb-4 text-[#ff00ff]">/ PROJECT_GALLERY</p>
              <p className="p-desc md:ml-auto">Responsive portfolio engines, customised Shopify storefronts, digital libraries with secure readers, and bespoke full-stack web apps for clients worldwide.</p>
            </div>
          </div>
        </section>

        {/* 5. GLOBAL */}
        <section className="oryzo-section" id="s5" style={sectionStyle(5)}>
          <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="mb-8 md:mb-0">
              <h1 className="h-massive">GLOBAL<br/>NETWORK</h1>
              <div className="metadata">/ 05 . GLOBAL . LANGUAGES</div>
            </div>
            <div className="w-full md:w-auto text-left md:text-right" style={{ transform: activeSection === 5 ? 'translateX(0)' : 'translateX(60px)', transition: 'transform 0.6s ease 0.15s, opacity 0.5s ease', opacity: activeSection === 5 ? 1 : 0 }}>
              <p className="metadata mb-4 text-[#00ffff] hidden md:block">/ PROFICIENCIES</p>
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
        <section className="oryzo-section" id="s6" style={sectionStyle(6)}>
          <div className="w-full h-full flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="mb-8 md:mb-0">
              <h1 className="h-massive">GET IN<br/>TOUCH</h1>
              <div className="metadata">/ 06 . CONTACT . GET IN TOUCH</div>
            </div>
            <div className="text-left md:text-right w-full md:w-auto" style={{ transform: activeSection === 6 ? 'translateX(0)' : 'translateX(60px)', transition: 'transform 0.6s ease 0.15s, opacity 0.5s ease', opacity: activeSection === 6 ? 1 : 0 }}>
              <p className="metadata mb-2 md:mb-4 text-[#ff00ff] hidden md:block">/ SECURE_CONNECTION_READY</p>
              <p className="p-desc mb-6 md:mb-8 md:ml-auto hidden md:block">Available for freelance projects, long-term collaborations, and full-time remote roles. Let&apos;s build something exceptional.</p>
              <TerminalContact />
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
