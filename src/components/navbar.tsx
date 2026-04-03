"use client"

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [activeTab, setActiveTab] = useState('INTRO');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      const height = window.innerHeight;
      const idx = Math.floor((scrollPos + height / 2) / height);
      const tabs = ['INTRO', 'EXPERIENCE', 'STACK', 'PROJECTS', 'REACH', 'CONTACT'];
      if (tabs[idx]) setActiveTab(tabs[idx]);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = ['INTRO', 'EXPERIENCE', 'STACK', 'PROJECTS', 'REACH', 'CONTACT'];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 flex justify-between items-center p-6 md:p-10 md:px-[60px] z-[500] pointer-events-auto">
        <div className="flex flex-col group cursor-pointer">
          <div className="text-[1.5rem] md:text-[1.8rem] font-black tracking-[-0.05em] text-white leading-none">AB</div>
          <div className="text-[0.5rem] md:text-[0.6rem] font-bold tracking-[0.4em] uppercase text-[#99ff33] mt-1">RESEARCH.V1</div>
        </div>
        
        {/* 💻 DESKTOP NAV 💻 */}
        <div className="hidden md:flex gap-10 text-[0.65rem] font-bold tracking-[0.2em] uppercase">
          {navLinks.map((link) => (
            <span 
              key={link}
              data-text={link}
              className={cn(
                "flipper relative inline-block cursor-pointer transition-all duration-500",
                activeTab === link ? "text-[#99ff33]" : "text-white opacity-40 hover:opacity-100"
              )}
            >
               <span className="flipper-main block">{link}</span>
               <span className="flipper-back absolute top-0 left-0 block text-[#99ff33] translate-y-full -rotate-X-90 origin-bottom">{link}</span>
            </span>
          ))}
        </div>

        {/* 📱 MOBILE PILL-NAV 📱 */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden flex items-center gap-4 px-6 py-3 border border-dotted border-white/20 rounded-full bg-black/40 backdrop-blur-md"
        >
          <span className="text-[0.6rem] font-bold tracking-[0.3em] text-[#99ff33] uppercase">MENU [0{navLinks.indexOf(activeTab) + 1}]</span>
          {mobileMenuOpen ? <X size={14} className="text-white" /> : <Menu size={14} className="text-white" />}
        </button>
      </nav>

      {/* 📱 MOBILE FULLSCREEN MENU 📱 */}
      <div className={cn(
        "fixed inset-0 z-[490] bg-[#001a1a] flex flex-col items-start justify-center p-12 transition-all duration-700 ease-in-out md:hidden",
        mobileMenuOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
      )}>
        <div className="flex flex-col gap-8">
          {navLinks.map((link, i) => (
            <div 
              key={link} 
              onClick={() => setMobileMenuOpen(false)}
              className={cn(
                "text-[2.5rem] font-black tracking-tighter uppercase transition-all duration-500",
                activeTab === link ? "text-[#99ff33] pl-4 border-l-4 border-[#99ff33]" : "text-white/20"
              )}
            >
              <span className="text-[0.8rem] font-bold tracking-widest mr-4 opacity-40">0{i+1}</span>
              {link}
            </div>
          ))}
        </div>
        <div className="absolute bottom-12 left-12 metadata opacity-30">
            SYSTEM_ACCESS_GRANTED<br/>
            DEPLOYMENT: V4.RESN
        </div>
      </div>

      <style jsx>{`
        .flipper {
          perspective: 1000px;
          height: 1.25rem;
          overflow: hidden;
        }
        .flipper:hover .flipper-main {
          transform: translateY(-100%) rotateX(90deg);
        }
        .flipper:hover .flipper-back {
          transform: translateY(-100%) rotateX(0deg);
        }
      `}</style>
    </>
  );
}
