"use client"

import { useState, useEffect } from "react"
import * as THREE from "three"

export default function PercentageLoader() {
  const [progress, setProgress] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const handleProgress = (e: any) => {
      const p = Math.round(e.detail);
      setProgress(p);
      if (p >= 100) {
        setTimeout(() => setLoading(false), 800);
      }
    };

    window.addEventListener('3d-progress', handleProgress);

    return () => {
      window.removeEventListener('3d-progress', handleProgress);
    };
  }, []);

  if (!loading) return null

  return (
    <div className="fixed inset-0 z-[10000] bg-[#001a1a] flex flex-col items-center justify-center p-10">
      {/* 🌀 HUD LOADING ARCHITECTURE 🌀 */}
      <div className="relative w-64 h-[1px] bg-white/10 mb-8">
        <div 
          className="absolute top-0 left-0 h-full bg-[#99ff33] transition-all duration-300 ease-out shadow-[0_0_15px_rgba(153,255,51,0.6)]"
          style={{ width: `${progress}%` }}
        />
        <div className="absolute top-0 left-0 h-full w-full border border-dotted border-white/5 -translate-y-4" />
      </div>

      <div className="flex flex-col items-center gap-2">
        <div className="text-[3rem] font-black tracking-tighter text-white tabular-nums leading-none">
          {progress.toString().padStart(3, "0")}
        </div>
        <div className="text-[0.6rem] font-bold tracking-[0.5em] text-[#99ff33] uppercase animate-pulse">
            SYSTEM_INITIALIZING.V4
        </div>
      </div>

      {/* 🔳 TECHNICAL ANNOTATIONS 🔳 */}
      <div className="absolute bottom-20 left-20 metadata opacity-20">
        PROTOCOL: ENGINE_BOOT<br/>
        MODULE: WEBGL_CORE_RENDERER
      </div>
      <div className="absolute bottom-20 right-20 metadata opacity-20 text-right">
        MEMORY: ALLOCATED<br/>
        STATUS: {progress < 100 ? "PROCESSED" : "SYSCALL_COMPLETE"}
      </div>
    </div>
  )
}
